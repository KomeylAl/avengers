import React from "react";
import Navbar from "./Navbar";
import { MdOutlinePersonOutline } from "react-icons/md";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full px-32 py-4 border-b border-nicewhite/60 bg-maria/80 backdrop-blur-3xl flex items-center justify-between fixed top-0 z-1000">
      <div className="w-full flex items-center gap-6">
        <h1 className="text-golden text-xl font-bold">MCU Scenarios</h1>
        <Navbar />
      </div>
      <Link href="/profile">
        <MdOutlinePersonOutline size={30} className="text-white" />
      </Link>
    </div>
  );
};

export default Header;
