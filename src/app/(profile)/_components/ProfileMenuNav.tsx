"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { RiUserFollowLine } from "react-icons/ri";
import { IoPeopleOutline } from "react-icons/io5";
import { LuBell } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";

const menuItems = [
  { label: "Profile", href: "/profile", icon: <FaRegUser /> },
  { label: "My Scenarios", href: "/profile/scenarios", icon: <IoBookOutline /> },
  { label: "Liked Stories", href: "/profile/favorites", icon: <FaRegHeart /> },
  { label: "Following", href: "/profile/following", icon: <IoPeopleOutline /> },
  { label: "Followers", href: "/profile/followers", icon: <RiUserFollowLine /> },
  { label: "Activity", href: "/profile/activities", icon: <LuBell /> },
  { label: "Settings", href: "/profile/settings", icon: <IoSettingsOutline /> },
];

const ProfileMenuNav = () => {
  const pathname = usePathname();
  return (
    <div className="w-full flex flex-col gap-3 items-start">
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`w-full ${
            item.href === pathname
              ? "bg-golden text-niceblack font-bold"
              : "text-white hover:bg-cyan transition-colors duration-300 ease-in-out font-semibold"
          } flex items-center gap-2 px-4 py-3 rounded-md`}
        >
          {item.icon} {item.label}
        </Link>
      ))}
    </div>
  );
};
export default ProfileMenuNav;
