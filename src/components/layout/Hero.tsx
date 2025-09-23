import Image from "next/image";
import React from "react";
import heroImage from "../../../public/images/hreo-back.png";

const Hero = () => {
  return (
    <div className="w-full min-h-screen relative">
      <Image
        src={heroImage}
        alt="hero back"
        width={1000}
        height={1000}
        className="w-full h-full absolute object-cover"
      />
      <div className="w-full h-full bg-niceblack/60 absolute flex flex-col items-center justify-center gap-4">
        <h1 className="text-[60px] text-center font-bold text-nicewhite">The Ultimate MCU<br /> Community Hub</h1>
        <p className="text-3xl text-nicewhite">Where fans have written 1,253,907 alternative scenarios</p>
        <p className="text-xl text-nicewhite">Doctor Strange saw 14,605,000 possible futures. Now it's your turn to write the 14,605,001st scenario!</p>
      </div>
    </div>
  );
};

export default Hero;
