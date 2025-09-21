"use client";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex justify-between items-center px-6 py-4 relative z-10"
    >
      {/* Logo + Title */}
      <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
        <img
          src="/ieee_logo.png"
          alt="IEEE SPIT Logo"
          className="h-10 w-auto"
          width={40}
          height={40}
          loading="eager"
          style={{ display: 'block' }}
        />
        <span className="text-lg font-semibold text-white tracking-wide">
          IEEE SPIT
        </span>
      </motion.div>

      {/* Official Website Link */}
      <motion.a
        href="https://ieee.spit.ac.in/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, color: "#00d4ff" }}
        className="text-white text-sm font-medium no-underline"
      >
        Official Website
      </motion.a>
    </motion.header>
  );
};

export default Header;
