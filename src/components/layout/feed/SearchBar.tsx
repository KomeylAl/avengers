"use client";

import React, { useRef } from "react";
import {
  Search,
  ArrowLeft,
  Star,
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  Filter,
  X,
  Menu,
} from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

const SearchBar = () => {
  const searchRef = useRef(null);
  return (
    <div className="flex-1" ref={searchRef}>
      <div className="flex items-center gap-3 w-full bg-niceblack px-4 focus-within:ring-2 focus-within:ring-cyan transition-all duration-300 border border-cyan rounded-lg">
        <Search
          className=" text-cyan"
          size={20}
        />
        <input
          placeholder="Search scenarios, authors, or categories..."
          //   value={searchQuery}
          //   onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full text-nicewhite h-14 border-transparent outline-0 ring-0 text-sm"
        />
        <Button
          variant="ghost"
          size="sm"
          className="text-cyan hover:text-golden"
          //   onClick={() => setShowSidebar(!showSidebar)}
        >
          <Filter size={20} />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
