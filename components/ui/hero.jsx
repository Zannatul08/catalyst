"use client";

import Link from "next/link";
import { Button } from "./button";
import Image from "next/image";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  
  const imageRef = useRef(null);
  useEffect(()=>{
    const imageElement = imageRef.current;
    const handleScroll = () =>{
       const scrollPosition = window.scrollY;
    const scrollThreshold =100;

    if(scrollPosition > scrollThreshold){
      imageElement.classList.add("scrolled");
    }
    else{
      imageElement.classList.remove("scrolled")
    }

    };

    window.addEventListener("scroll",handleScroll);
 
    return () => window.removeEventListener("scroll", handleScroll);
   
  } , []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="gradient-title text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl">
             AI Career Coach for
            <br />
           Your Professional Success
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Advance your career with personalized guidance,interview prep, and
            AI-powered tools for job success.
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" className="px-8" variant="outline">
              Get Started
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            <Image
              src={"/bannerN.png"}
              width={1080}
              height={720}
              alt="Banner catalyst"
              className="rounded-lg border shadow-2xl  mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
