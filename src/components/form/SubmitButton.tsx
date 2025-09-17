"use client";

import { motion } from "framer-motion";

interface SubmitButtonProps {
  isLoading: boolean;
  label: string;
}

const SubmitButton = ({ isLoading, label }: SubmitButtonProps) => {
  return (
    <motion.button
      type="submit"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={isLoading}
      className="w-full bg-gradient-to-tr from-cyan-400 to-blue-700 text-white font-semibold px-6 py-3 rounded-md shadow-lg transition disabled:opacity-50"
    >
      {isLoading ? "Submitting..." : label}
    </motion.button>
  );
};

export default SubmitButton;
