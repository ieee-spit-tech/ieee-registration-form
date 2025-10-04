"use client";
import ParticleField from "@/components/layout/ParticleField";
import Header from "@/components/layout/Header";
import Hero from "@/components/Hero";
// COMMENTED OUT: Registration form imports and functionality
// import RegistrationForm from "@/components/form/RegistrationForm";
// import { useState } from "react";

// NEW: Import FormsClosed component
import FormsClosed from "@/components/FormsClosed";

export default function Home() {
  // COMMENTED OUT: Registration form state management
  // const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0a0f2e] via-[#1a1f3a] to-[#2a3f5f] relative overflow-hidden font-sans">
      <ParticleField />
      <Header />
      {/* COMMENTED OUT: Hero with registration form functionality */}
      {/* <Hero onOpen={() => setIsFormOpen(true)} /> */}
      {/* COMMENTED OUT: Registration form component */}
      {/* <RegistrationForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} /> */}
      
      {/* NEW: Updated Hero without registration functionality */}
      {/* <Hero /> */}
      
      {/* NEW: FormsClosed component to show forms are closed */}
      <FormsClosed />
    </div>
  );
}
