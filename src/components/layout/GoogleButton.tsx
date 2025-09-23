"use client";

import { Login } from "@/actions/authActions";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClickButton = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsLoading(true);
    await Login("google");
    setIsLoading(false);
  };
  return (
    <button
      className="w-full p-3 text-white flex items-center gap-3 justify-center rounded font-bold cursor-pointer border border-nicewhite disabled:cursor-not-allowed"
      onClick={handleClickButton}
      disabled={isLoading}
    >
      <FcGoogle size={20} /> Continue with Google
    </button>
  );
};

export default GoogleButton;
