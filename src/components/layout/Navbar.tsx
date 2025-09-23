"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { GoHome } from "react-icons/go";
import { BsVectorPen } from "react-icons/bs";
import { PiNewspaperLight } from "react-icons/pi";
import { FiHeart } from "react-icons/fi";
import { FiInfo } from "react-icons/fi";

const navItems = [
  { label: "Home", href: "/", icon: <GoHome size={20} /> },
  { label: "Write Scenario", href: "/write", icon: <BsVectorPen size={20} /> },
  {
    label: "Browse Stories",
    href: "/scenarios",
    icon: <PiNewspaperLight size={20} />,
  },
  { label: "Support Us", href: "/support", icon: <FiHeart size={20} /> },
  { label: "About", href: "/about", icon: <FiInfo size={20} /> },
];

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="hidden xl:block">
      <ul className="w-full flex items-center gap-5">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`px-3 py-2 flex items-center justify-center gap-2 rounded-lg text-lg font-semibold ${
                pathname === item.href
                  ? "bg-golden text-niceblack/85 shadow-xl"
                  : "text-nicewhite hover:bg-cyan/70 hover:shadow-xl transition-all duration-300 ease-in-out"
              }`}
            >
              {item.icon} {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
