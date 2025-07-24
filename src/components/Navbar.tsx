import { HomeIcon, LogIn, LogInIcon, LogOut, Sprout } from "lucide-react";
import Link from "next/link";


async function Navbar() {

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center h-16 justify-between">
            {/* Logo */} 
            <div className="flex items-center">
                <Link 
                    href="/"
                    className="text-xl font-bold text-primary font-mono tracking-wider">
                        Traditia
                </Link>
            </div>


            <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center gap-2">
                    <Link href="/suku" className="flex">
                        <span className="hidden lg:inline">Login</span>
                    </Link>
                </div>

            </div>

            </div>
        </div>
    </nav>
  )
}

export default Navbar