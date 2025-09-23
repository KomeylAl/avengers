import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
import ProfileMenuNav from "./ProfileMenuNav";

const ProfileMenu = () => {
  return (
    <div className="hidden w-80 md:flex flex-col items-start gap-5">
      <Link href="/" className="text-white text-sm flex items-center gap-2 rounded-md hover:bg-nicewhite hover:text-golden p-2 transition-colors duration-300 ease-in-out">
        <IoArrowBack /> Back to Home
      </Link>
      <ProfileMenuNav />
    </div>
  );
};

export default ProfileMenu;
