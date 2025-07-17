"use client"

import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import OtherExperiences from "./components/Mprojects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import React, { useEffect, useState } from "react";

export default function Home() {

  const [topScrolled, setTopScrolled] = useState(false)

  // Check if user scolled 
useEffect(()=>{
  const navbarMoved = () => {
    if(window.scrollY === 0){
      setTopScrolled(false);
    }
    if(window.scrollY !==0){
      setTopScrolled(true);
    }
  }

  window.addEventListener("scroll", navbarMoved);
  return () => {
     window.removeEventListener("scroll", navbarMoved)
  }
},[])


  return (
    <div className="">
      <Navbar topScrolled={topScrolled}/>

      <div className="mx-auto md:h-full ">
        <Landing />
        <Skills />
        <Projects />
        <OtherExperiences />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
