"use client";

import { Login } from "@/actions/authActions";
import React, { useState } from "react";

const LoginButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClickButton = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsLoading(true);
    await Login("credentials");
    setIsLoading(false);
  };
  return (
    <button
      className="w-full p-3 text-center bg-golden rounded font-bold cursor-pointer hover:bg-golden/85 transition-colors duration-300 ease-in-out"
      onClick={handleClickButton}
      disabled={isLoading}
    >
      Sign In
    </button>
  );
};

export default LoginButton;
