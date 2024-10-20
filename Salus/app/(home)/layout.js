"use client";

import Link from "next/link";
import "../globals.css";
import { UserCircleIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EventsProvider } from "../../lib/eventsContext";
import { auth } from "../../lib/firebaseConfig";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { FaInstagram } from "react-icons/fa";

export default function HomeLayout({ children }) {
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    if (storedEmail) {
      setLoggedIn(true);
      setEmail(storedEmail);
    } else {
      router.push("/login");
    }
  }, [router]);

  if (!loggedIn) {
    return null;
  }

  const handleSignOut = () => {
    sessionStorage.clear();
    auth.signOut();
    router.push("/");
  };

  return (
    <EventsProvider>
      <div className="flex flex-col min-h-full">
        <nav className="sticky top-0 bg-off-white mt-4">
          <div className="flex max-w-screen-5xl pl-10 pr-10 pt-4 pb-6 border-b-2 border-light-gray items-center justify-between">
            <div className="flex flex-row">
              <div className="flex items-center">
                <Link href="/home">
                  <div className="text-logo-purple flex-shrink-0">
                    <img
                      className="max-w-24 sm:max-w-28 md:max-w-32 lg:max-w-36 h-auto"
                      src="/name.png"
                      alt="Company Logo"
                    />
                  </div>
                </Link>
              </div>
              <div className="group transition w-20 flex flex-row ml-8 mt-0.5 sm:mt-2">
                <div className="text-logo-purple duration-3000 font-normal transition-all">
                  <Link
                    href="/home"
                    className="font-poppins md:text-lg text-sm"
                  >
                    Home
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-1 rounded-xl bg-logo-purple"></span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Menu>
                <MenuButton className="ml-8 justify-end font-semibold">
                  <UserCircleIcon className="lg:size-11 size-8 fill-logo-purple/90" />
                </MenuButton>
                <Transition
                  enter="transition ease-out duration-75"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <MenuItems
                    anchor="bottom end"
                    className="w-64 my-2 font-poppins text-sm origin-top-right rounded-lg p-1 font-normal text-logo-purple bg-white border-box border-2 border-off-white"
                  >
                    <MenuItem>
                      <div className="group w-full font-semibold items-center gap-2 py-3 px-3 overflow-hidden border-box border-b-2 border-off-white">
                        Welcome, {email}!
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <button
                        className="group flex w-full items-center gap-2 py-3 px-3 hover:bg-off-white hover:font-semibold"
                        onClick={handleSignOut}
                      >
                        Sign Out
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Transition>
              </Menu>
            </div>
          </div>
        </nav>
        <div className="flex-grow">{children}</div>
        <div className="grid grid-cols-3 text-xs sm:text-sm px-5 py-5 text-off-white bg-logo-purple/85 h-24">
          <div className="flex flex-col items-start justify-center">
            <div className="pb-1">@2024 Kinetik Tech, LLC.</div>
            <div>All Rights Reserved.</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="pb-2">Follow us at</div>
            <div className="flex">
              <a
                href="https://www.instagram.com/kinetikgigs/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="size-4 sm:size-6 text-off-white mx-2 hover:text-gray-300" />
              </a>
            </div>
          </div>
          <div className="flex flex-col items-end justify-center">
            <div className="pb-1">Contact us at</div>
            <div>info@kinetikgigs.com</div>
          </div>
        </div>
      </div>
    </EventsProvider>
  );
}
