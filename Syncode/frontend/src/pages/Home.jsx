import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Security } from "@/components/Security";
import { Comaparasion } from "@/components/Comparasion";

const Home = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark">
      {/* Navbar*/}
      <Navbar />

      <main>
        <HeroSection />
        <div id="comparison">
          <Comaparasion />
        </div>
        <div id="features">
          <Features />
        </div>
        <div id="howitworks">
          <HowItWorks />
        </div>
        <div id="security">
          <Security />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
