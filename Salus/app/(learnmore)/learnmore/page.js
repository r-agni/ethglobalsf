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


export default function LearnMore() {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-2xl font-bold">Whitepaper </h1>
    </div>
  );
}
