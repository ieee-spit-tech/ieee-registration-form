"use client";
import ParticleField from "@/components/layout/ParticleField";
import Header from "@/components/layout/Header";
import Hero from "@/components/Hero";
import RegistrationForm from "@/components/form/RegistrationForm";
import { useState } from "react";

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0a0f2e] via-[#1a1f3a] to-[#2a3f5f] relative overflow-hidden font-sans">
      <ParticleField />
      <Header />
      <Hero onOpen={() => setIsFormOpen(true)} />
      <RegistrationForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
}
