"use client";
import { motion } from "framer-motion";

const Hero = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 relative z-5">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-center mb-12"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-28 h-28 mx-auto mb-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-700 flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.3)]"
        >
          <img
            src="https://ieee.spit.ac.in/assets/ieee-BladhgC_.png"
            alt="IEEE SPIT"
            className="h-26 w-auto brightness-110"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-transparent text-4xl sm:text-6xl font-bold bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-blue-600 tracking-widest mb-4"
        >
          IEEE S.P.I.T
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Empowering Innovation. Transforming Technologies. Inspiring Futures.
        </motion.p>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 212, 255, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpen}
          className="bg-gradient-to-tr from-cyan-400 to-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition"
        >
          Join Our Committee
        </motion.button>
      </motion.div>
    </main>
  );
};

export default Hero;
