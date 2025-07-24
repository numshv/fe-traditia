'use client';

import { useEffect, useState, useRef } from "react";
import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { FeatureCollection, Feature } from "geojson";

// Fix untuk icon default Leaflet di Next.js
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

export default function IndonesiaMap({ onProvinceStats, onFocusChange }: IndonesiaMapProps) {
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);
  const geoJsonRef = useRef<L.GeoJSON | null>(null);
  const [selectedGeoFeature, setSelectedGeoFeature] = useState<Feature | null>(null);
  const [selectedLayer, setSelectedLayer] = useState<L.Layer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (onFocusChange) {
      onFocusChange(!!selectedGeoFeature); 
    }
  }, [selectedGeoFeature, onFocusChange]);

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
    
    // Kembalikan layer yang dipilih sebelumnya ke warna hitam
    if (selectedLayer && selectedLayer !== layer) {
      (selectedLayer as L.Path).setStyle({ fillColor: "#000000", weight: 1, color: "#555" });
    }
    
    // UBAH: Warna highlight saat provinsi di klik
    (layer as L.Path).setStyle({
      fillColor: "#333333", // Warna abu-abu gelap saat dipilih
      color: "#ccc",
      weight: 2,
    });
    
    setSelectedLayer(layer);
    setSelectedGeoFeature(feature);

    if (onProvinceStats) {
      onProvinceStats({ areaName: provinceName, areaCommodity: [] });
    }
  };

  const onEachProvince = (feature: Feature, layer: L.Layer) => {
    const provinceName = (feature.properties as ProvinceProperties)?.state;

    layer.on({
      click: () => handleProvinceClick(feature, layer),
      mouseover: (e) => {
        const targetLayer = e.target as L.Path;
        if (targetLayer !== selectedLayer) {
          // UBAH: Warna highlight saat hover
          targetLayer.setStyle({ weight: 2, fillColor: '#222222' });
        }
      },
      mouseout: (e) => {
        const targetLayer = e.target as L.Path;
        if (targetLayer !== selectedLayer) {
          // UBAH: Kembalikan ke style awal (hitam)
          targetLayer.setStyle({ color: "#555", fillColor: "#000000", weight: 1 });
        }
      }
    });

    // UBAH: Warna default provinsi menjadi hitam
    (layer as L.Path).setStyle({
      color: "#555",      // Warna border abu-abu gelap
      fillColor: "#000000", // Warna isian hitam
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

  // UBAH: Menghapus `bg-black` dari div terluar agar menjadi transparan
  return (
    <div className={`w-full flex h-full text-white ${selectedGeoFeature ? "flex-row" : ""}`}>
      <div className={`${selectedGeoFeature ? "w-1/2 relative" : "w-full"} h-full transition-all duration-500`}>
        <MapContainer
          center={[-2, 118]}
          zoom={5}
          style={{ height: "100%", width: "100%", background: 'transparent' }} // UBAH: Background map transparan
          zoomControl={false}
          dragging={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          attributionControl={false}
        >
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
        <div className="w-1/2 h-full p-6 overflow-auto bg-gray-900 relative transition-all duration-500 border-0">
          <button
            onClick={() => {
              if (selectedLayer) {
                // UBAH: Reset ke warna hitam
                (selectedLayer as L.Path).setStyle({ fillColor: "#000000", weight: 1, color: "#555" });
              }
              setSelectedGeoFeature(null);
              setSelectedLayer(null);
            }}
            className="absolute top-4 right-4 text-white text-xl font-bold hover:text-red-400 transition-colors"
            title="Close"
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold mb-4">Provinsi Terpilih:</h2>
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2">Provinsi:</h3>
            <div className="bg-gray-800 p-4 rounded">
              <span className="text-lg">
                {(selectedGeoFeature.properties as ProvinceProperties)?.state || "N/A"}
              </span>
            </div>
          </div>

          {/* Bagian konten kosong */}

        </div>
      )}
    </div>
  );
}