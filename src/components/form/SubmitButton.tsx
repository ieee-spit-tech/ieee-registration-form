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
      whileHover={{ scale: 1.07, boxShadow: "0 0 24px 4px #22d3ee, 0 0 48px 8px #2563eb" }}
      whileTap={{ scale: 0.96 }}
      disabled={isLoading}
      className="max-w-xs mx-auto w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-700 bg-[length:200%_200%] bg-pos-0 hover:bg-pos-100 animate-gradient-x text-white font-bold px-3 py-1.5 text-sm rounded-md shadow-xl transition-all duration-300 ease-in-out disabled:opacity-50 relative overflow-hidden"
      style={{
        boxShadow: isLoading
          ? "0 0 16px 2px #22d3ee, 0 0 32px 4px #2563eb"
          : undefined,
      }}
    >
      <span className="relative z-10 tracking-wide">
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
            Submitting...
          </span>
        ) : (
          label
        )}
      </span>
      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></span>
    </motion.button>
  );
};

export default SubmitButton;
