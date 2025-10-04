"use client";
import { motion } from "framer-motion";

/**
 * FormsClosed Component
 * 
 * This component displays a "Forms Closed" message that matches the existing
 * IEEE SPIT website theme. It uses the same color scheme (cyan/blue gradients),
 * animations, and styling as the rest of the site.
 * 
 * Features:
 * - Animated entrance with framer-motion
 * - Consistent branding with IEEE logo
 * - Responsive design
 * - Matches existing gradient theme
 */
const FormsClosed = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 relative z-5">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* Status Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-tr from-slate-500 to-slate-700 flex items-center justify-center shadow-[0_0_30px_rgba(100,116,139,0.3)]"
        >
          {/* Closed/Lock Icon */}
          <svg
            className="w-10 h-10 text-slate-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-transparent text-3xl sm:text-5xl font-bold bg-clip-text bg-gradient-to-r from-slate-400 via-white to-slate-500 tracking-wide mb-4"
        >
          Registration Closed
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-slate-300 text-lg sm:text-xl max-w-lg mx-auto mb-8 leading-relaxed"
        >
          Thank you for your interest in joining IEEE SPIT!
        </motion.p>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="bg-slate-800/50 border border-slate-600 rounded-lg p-6 mb-8"
        >
          <p className="text-slate-200 text-base leading-relaxed mb-4">
            The registration period for IEEE SPIT committee positions has ended. 
            We received an overwhelming response from talented individuals like yourself.
          </p>
          <p className="text-slate-300 text-sm">
            Keep an eye on our official website and social media for future opportunities!
          </p>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* Visit Website Button */}
          <motion.a
            href="https://ieee.spit.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 212, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-tr from-cyan-400 to-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            Visit Our Website
          </motion.a>

          {/* Follow Updates Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-slate-500 text-slate-200 font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:border-slate-400 hover:text-white"
            onClick={() => {
              // You can add social media links or newsletter signup here
              window.open("https://ieee.spit.ac.in/", "_blank");
            }}
          >
            Stay Updated
          </motion.button>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="text-slate-400 text-sm mt-8"
        >
          Questions? Contact us through our official website.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default FormsClosed;
