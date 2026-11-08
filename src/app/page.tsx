"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />
      {loaded && (
        <>
          <Navbar />
          <main className="flex-1">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Services />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}