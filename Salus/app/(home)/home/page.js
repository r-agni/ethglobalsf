'use client';
import Link from "next/link";
import { UserCircleIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { FaInstagram, FaHeart, FaWalking, FaFire, FaClock, FaBed, FaLungs, FaTint } from "react-icons/fa";

export default function HomeLayout({ children }) {
  const [userAddress, setUserAddress] = useState("");
  const [loggedIn, setLoggedIn] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const address = sessionStorage.getItem("userAddress");
    if (address) {
      setUserAddress(address);
    } else {
      setLoggedIn(false);
      router.push("/");
    }
  }, [router]);

  const handleSignOut = () => {
    sessionStorage.clear();
    setLoggedIn(false);
    router.push("/");
  };

  const formatAddress = (address) => {
    if (address.length > 10) {
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
    return address;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-red-50 to-white">
      <nav className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/home">
                <img
                  className="h-10 w-auto"
                  src="/salus-logo.png"
                  alt="Salus Tech Logo"
                />
              </Link>
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/home"
                  className="text-white hover:bg-red-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                >
                  Home
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <Menu as="div" className="ml-3 relative">
                <MenuButton className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-600 focus:ring-white">
                  <UserCircleIcon className="h-8 w-8 text-white" />
                </MenuButton>
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem>
                      {({ active }) => (
                        <div className="block px-4 py-2 text-sm text-gray-700">
                          {userAddress ? `Address: ${formatAddress(userAddress)}` : 'Welcome!'}
                        </div>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign Out
                        </button>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-red-800 mb-4">Healthcare and Insurance Details</h2>
            <div className="space-y-2">
              <p><span className="font-semibold">Person:</span> XXX</p>
              <p><span className="font-semibold">Healthcare Provider:</span> ABC Health Services</p>
              <p><span className="font-semibold">Insurance Cash Paid Out:</span> $5,000</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-red-800 mb-4">Health Vitals from Smart Watch</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <FaHeart className="text-red-500 mr-2" />
                <span><strong>Heart Rate:</strong> 72 bpm</span>
              </div>
              <div className="flex items-center">
                <FaWalking className="text-blue-500 mr-2" />
                <span><strong>Steps:</strong> 8,540</span>
              </div>
              <div className="flex items-center">
                <FaFire className="text-orange-500 mr-2" />
                <span><strong>Calories:</strong> 320 kcal</span>
              </div>
              <div className="flex items-center">
                <FaClock className="text-green-500 mr-2" />
                <span><strong>Active:</strong> 45 mins</span>
              </div>
              <div className="flex items-center">
                <FaBed className="text-indigo-500 mr-2" />
                <span><strong>Sleep:</strong> 7h 30m</span>
              </div>
              <div className="flex items-center">
                <FaLungs className="text-purple-500 mr-2" />
                <span><strong>Blood Oxygen:</strong> 98%</span>
              </div>
              <div className="flex items-center">
                <FaTint className="text-red-500 mr-2" />
                <span><strong>Blood Pressure:</strong> 120/80</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-red-800 text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Salus Tech</h3>
              <p className="text-sm">&copy; 2024 Salus Tech, LLC. All Rights Reserved.</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
              <a
                href="https://www.instagram.com/salustech/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-300 transition duration-150 ease-in-out"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
            </div>
            <div className="flex flex-col items-end">
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <a href="mailto:info@salustech.com" className="text-sm hover:text-red-300 transition duration-150 ease-in-out">
                info@salustech.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}