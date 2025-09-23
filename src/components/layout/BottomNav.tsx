"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsVectorPen } from "react-icons/bs";
import { FiHeart, FiInfo } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { PiNewspaperLight } from "react-icons/pi";

const navItems = [
  { href: "/", icon: <GoHome size={20} /> },
  { href: "/write", icon: <BsVectorPen size={20} /> },
  { href: "/scenarios", icon: <PiNewspaperLight size={20} /> },
  { href: "/support", icon: <FiHeart size={20} /> },
  { href: "/about", icon: <FiInfo size={20} /> },
];

const BottomNav = () => {
    const pathname = usePathname();
  return (
    <div className="xl:hidden w-full h-20 p-3 md:px-32 fixed bottom-0">
      <div className="w-full bg-maria/50 py-4 px-12 backdrop-blur-md rounded-lg border border-cyan flex items-center justify-between">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href} className={`${pathname === item.href ? "text-golden" : "text-nicewhite"}`}>
            {item.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
