import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative h-[80vh]">
      <img
        src="/assets/HeroSection/WS50D-startpage-wk40-16x9.avif"
        alt="Fall Neutrals"
        className="w-full h-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center p-8 font-orbitron">
        <h2 className="text-white text-[14vw] font-bold leading-none">
          FALL
        </h2>
        <h2 className="text-white text-[14vw] font-bold leading-none mb-6">
          NEUTRALS
        </h2>
        <Link to="/products" className="inline-flex items-center bg-white text-black px-6 py-3 text-sm font-semibold tracking-wider hover:bg-gray-100 transition-colors w-[180px]">
          SHOP NOW
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
