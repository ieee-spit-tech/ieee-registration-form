"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ParticleField = () => {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; delay: number }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], y: [0, -100] }}
          transition={{ duration: 3, repeat: Infinity, delay: p.delay }}
          className="absolute w-[2px] h-[2px] bg-cyan-400 rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        />
      ))}
    </div>
  );
};

export default ParticleField;
