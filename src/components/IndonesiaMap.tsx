'use client';

import { useEffect, useState, useRef } from "react";
import { MapContainer, GeoJSON, useMap, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { FeatureCollection, Feature } from "geojson";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const INDONESIA_GEOJSON_URL =
  "https://raw.githubusercontent.com/superpikar/indonesia-geojson/refs/heads/master/indonesia.geojson";

interface ProvinceProperties {
  state: string;
  [key: string]: any;
}

interface ZoomableGeoJSONProps {
  data: FeatureCollection;
  onEachFeature: (feature: Feature, layer: L.Layer) => void;
  geoJsonRef: React.RefObject<L.GeoJSON | null>;
  selectedFeature: Feature | null;
}

function ZoomableGeoJSON({ data, onEachFeature, geoJsonRef, selectedFeature }: ZoomableGeoJSONProps) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedFeature) {
      const layer = L.geoJSON(selectedFeature);
      const bounds = layer.getBounds();
      const container = map.getContainer();
      const width = container.clientWidth;
      map.fitBounds(bounds, {
        paddingTopLeft: [0, 0],
        paddingBottomRight: [width / 2, 0],
      });
    } else {
      map.setView([-2, 118], 5);
    }
  }, [selectedFeature, map]);

  return <GeoJSON data={data} onEachFeature={onEachFeature} ref={geoJsonRef} />;
}

interface IndonesiaMapProps {
  onProvinceStats?: (data: { areaName: string; areaCommodity: string[] }) => void;
  onFocusChange?: (isFocused: boolean) => void;
}

interface Suku {
  name: string;
  imageUrl: string; 
}

interface Landmark {
  name: string;
  imageUrl: string; 
}

export default function IndonesiaMap({ onProvinceStats, onFocusChange }: IndonesiaMapProps) {
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);
  const geoJsonRef = useRef<L.GeoJSON | null>(null);
  const [selectedGeoFeature, setSelectedGeoFeature] = useState<Feature | null>(null);
  const [selectedLayer, setSelectedLayer] = useState<L.Layer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [sukuData, setSukuData] = useState<Suku[]>([]);
  const [isSukuLoading, setIsSukuLoading] = useState(false);

  const [landmark, setlandmark] = useState<Landmark[]>([]);
  const [isLandmarkLoading, setIsLandmarkLoading] = useState(false);

  const [openAccordion, setOpenAccordion] = useState<'suku' | 'landmark'>('suku');

  const dummySukuData = [
    { name: "Arfak" }, { name: "Dani" }, { name: "Asmat" },
    { name: "Bauzi" }, { name: "Sentani" }, { name: "Biak" },
  ];
  const dummyLandmarkData = [ { name: "Raja Ampat" }, { name: "Lembah Baliem" } ];

  useEffect(() => {
    if (onFocusChange) {
      onFocusChange(!!selectedGeoFeature); 
    }
  }, [selectedGeoFeature, onFocusChange]);

  const handleAccordionClick = (accordionName: 'suku' | 'landmark') => {
    if (openAccordion === accordionName) {
      setOpenAccordion(accordionName === 'suku' ? 'landmark' : 'suku');
    } else {
      setOpenAccordion(accordionName);
    }
  };

  const fetchGeoData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(INDONESIA_GEOJSON_URL);
      const data = await response.json();
      setGeoData(data);
    } catch (error) {
      console.error("Error fetching geo data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProvinceClick = async (feature: Feature, layer: L.Layer) => {
    const provinceName = (feature.properties as ProvinceProperties)?.state;
    
    if (selectedLayer && selectedLayer !== layer) {
      (selectedLayer as L.Path).setStyle({ fillColor: "#000000", weight: 1, color: "#555" });
    }
    
    (layer as L.Path).setStyle({
      fillColor: "#333333", 
      color: "#FFFFFF",
      weight: 3,
    });
    
    setSelectedLayer(layer);
    setSelectedGeoFeature(feature);

    if (provinceName) {
      setIsSukuLoading(true);
      setIsLandmarkLoading(true);
      try {
        const encodedProvinceName = encodeURIComponent(provinceName);
        
        const sukuPromise = fetch(`/api/provinces/${encodedProvinceName}/suku`);
        const landmarkPromise = fetch(`/api/provinces/${encodedProvinceName}/landmark`);

        const [sukuResponse, landmarkResponse] = await Promise.all([sukuPromise, landmarkPromise]);

        const sukuResult = await sukuResponse.json();
        if (!sukuResponse.ok) throw new Error(sukuResult.message || 'Gagal mengambil data suku');
        setSukuData(sukuResult.data);

        const landmarkResult = await landmarkResponse.json();
        if (!landmarkResponse.ok) throw new Error(landmarkResult.message || 'Gagal mengambil data landmark');
        setlandmark(landmarkResult.data);

      } catch (error) {
        console.error("Error fetching province data:", error);
        setSukuData([]);
        setlandmark([]);
      } finally {
        setIsSukuLoading(false);
        setIsLandmarkLoading(false);
      }
    }
  };

  const onEachProvince = (feature: Feature, layer: L.Layer) => {
    const provinceName = (feature.properties as ProvinceProperties)?.state;

    layer.on({
      click: () => handleProvinceClick(feature, layer),
      mouseover: (e) => {
        const targetLayer = e.target as L.Path;
        if (targetLayer !== selectedLayer) {
          targetLayer.setStyle({ weight: 2, fillColor: '#222222' });
        }
      },
      mouseout: (e) => {
        const targetLayer = e.target as L.Path;
        if (targetLayer !== selectedLayer) {
          targetLayer.setStyle({ color: "#555", fillColor: "#000000", weight: 1 });
        }
      }
    });

    (layer as L.Path).setStyle({
      color: "#555",      
      fillColor: "#000000",
      fillOpacity: 1,
      weight: 1,
    });

    if (provinceName) {
      layer.bindTooltip(provinceName, { permanent: false, direction: "center" });
    }
  };

  useEffect(() => {
    fetchGeoData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Memuat Peta Indonesia...</p>
        </div>
      </div>
    );
  }     

  return (
    <div className={`w-full flex h-full text-white ${selectedGeoFeature ? "flex-row" : ""}`}>
      <div className={`${selectedGeoFeature ? "w-2/3 relative" : "w-full"} h-full transition-all duration-500`}>
        <MapContainer
          center={[-2, 118]}
          zoom={5}
          zoomControl={false}
          dragging={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          attributionControl={false}
          style={{ height: '100%', width: '100%' }} 
        >
          <TileLayer url="" />
          {geoData && (
            <ZoomableGeoJSON
              data={geoData}
              onEachFeature={onEachProvince}
              geoJsonRef={geoJsonRef}
              selectedFeature={selectedGeoFeature}
            />
          )}
        </MapContainer>
      </div>

      {selectedGeoFeature && (
        <div className="w-160 h-full p-8 overflow-y-auto relative transition-all duration-500">
          <button
            onClick={() => {
              if (selectedLayer) {
                (selectedLayer as L.Path).setStyle({ fillColor: "#000000", weight: 1, color: "#555" });
              }
              setSelectedGeoFeature(null);
              setSelectedLayer(null);
            }}
            className="absolute top-8 right-8 z-10 text-black text-2xl font-bold hover:opacity-70 transition-opacity to-black"
            title="Close"
          >&times;</button>

          <h1 className="text-4xl font-bold mb-8 text-[#392514]">
            {(selectedGeoFeature.properties as ProvinceProperties)?.state || "Provinsi"}
          </h1>

          <div className="w-full flex flex-col gap-4">
            <div className="border border-black px-4 rounded-sm">
              <button
                onClick={() => handleAccordionClick('suku')}
                className="w-full flex justify-between items-center text-xl py-4 font-semibold text-left text-[#392514]"
              >
                Suku
                <span className={`transition-transform duration-300 ${openAccordion === 'suku' ? 'rotate-180' : ''}`}>▼</span>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openAccordion === 'suku' ? 'max-h-[999px]' : 'max-h-0'}`}>
                <div className="grid grid-cols-2 gap-4 py-4">
                  {isSukuLoading ? (
                    <p>Loading data suku...</p>
                  ) : (
                    sukuData.map((suku) => (
                      <div key={suku.name} className="relative aspect-video ...">
                        <img src={suku.imageUrl} alt={suku.name} className="..." />
                        <div className="absolute bottom-0 ...">
                          <span className="...">{suku.name}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="border border-black px-4 rounded-sm">
              <button
                onClick={() => handleAccordionClick('landmark')}
                className="w-full flex justify-between items-center text-xl py-4 font-semibold text-left text-[#392514]"
              >
                Landmark
                <span className={`transition-transform duration-300 ${openAccordion === 'landmark' ? 'rotate-180' : ''}`}>▼</span>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openAccordion === 'landmark' ? 'max-h-[999px]' : 'max-h-0'}`}>
                <div className="grid grid-cols-2 gap-4 py-4">
                  {isLandmarkLoading ? (
                    <p>Loading data landmark...</p>
                  ) : (
                    landmark.map((landmark) => (
                      <div key={landmark.name} className="relative aspect-video ...">
                        <img src={landmark.imageUrl} alt={landmark.name} className="..." />
                        <div className="absolute bottom-0 ...">
                          <span className="...">{landmark.name}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}