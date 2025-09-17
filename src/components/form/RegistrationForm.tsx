"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormField from "./FormField";
import SubmitButton from "./SubmitButton";

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationForm = ({ isOpen, onClose }: RegistrationFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    branch: "",
    year: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email.";
    if (!formData.branch) newErrors.branch = "Branch is required.";
    if (!formData.year) newErrors.year = "Year is required.";
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", branch: "", year: "" });
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900 text-white rounded-xl shadow-2xl p-6 w-full max-w-md relative"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            {!submitted ? (
              <>
                <h2 className="text-xl font-bold mb-6 text-center">
                  Committee Registration
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <FormField
                    label="Full Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="Enter your name"
                  />

                  <FormField
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="example@mail.com"
                  />

                  <FormField
                    label="Branch"
                    type="select"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    error={errors.branch}
                    options={["CE", "CSE", "EXTC"]}
                  />

                  <FormField
                    label="Year"
                    type="select"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    error={errors.year}
                    options={["FE", "SE", "TE"]}
                  />

                  <SubmitButton isLoading={isSubmitting} label="Register" />
                </form>
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-cyan-400 mb-2">
                  🎉 Thank You!
                </h2>
                <p className="text-slate-300 mb-4">
                  Your registration was successful. We’ll be in touch soon!
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-2 rounded-md"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationForm;
