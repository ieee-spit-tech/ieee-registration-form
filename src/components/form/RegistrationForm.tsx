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
    phone: "",
    branch: "",
    preference1: "",
    preference2: "",
    preference3: "",
    motivation: "",
    skills: "",
    openToOtherCommittee: "",
    eventIdea: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email.";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number.";
    if (!formData.branch) newErrors.branch = "Branch is required.";
    if (!formData.preference1) newErrors.preference1 = "Preference 1 is required.";
    if (!formData.preference2) newErrors.preference2 = "Preference 2 is required.";
    if (!formData.preference3) newErrors.preference3 = "Preference 3 is required.";
    if (!formData.motivation.trim()) newErrors.motivation = "This field is required.";
    if (!formData.skills.trim()) newErrors.skills = "This field is required.";
    if (!formData.openToOtherCommittee) newErrors.openToOtherCommittee = "This field is required.";
    if (!formData.eventIdea.trim()) newErrors.eventIdea = "Event idea is required.";

    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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
    setSubmitError("");

    try {
      // Create FormData object
      const formDataToSend = new FormData();

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Send to API
      const response = await fetch('/api/register', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      // Success
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        branch: "",
        preference1: "",
        preference2: "",
        preference3: "",
        motivation: "",
        skills: "",
        openToOtherCommittee: "",
        eventIdea: "",
      });

    } catch (error: any) {
      console.error('Registration error:', error);
      setSubmitError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
                <div className="max-h-[70vh] overflow-y-auto pr-2">
                  <form onSubmit={handleSubmit} className="space-y-4 relative pb-20">
                    <FormField
                      label={<span>Full Name <span className="text-red-400">*</span></span>}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      placeholder="Enter your name"
                      required
                    />
                    <FormField
                      label={<span>Email <span className="text-red-400">*</span></span>}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      placeholder="example@mail.com"
                      required
                    />
                    <FormField
                      label={<span>Phone number <span className="text-red-400">*</span></span>}
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      placeholder="10-digit phone number"
                      required
                    />
                    <FormField
                      label={<span>Branch <span className="text-red-400"></span></span>}
                      type="select"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      error={errors.branch}
                      options={["CE", "CSE", "EXTC"]}
                      required
                    />
                    <FormField
                      label={<span>Preference 1 <span className="text-red-400"></span></span>}
                      type="select"
                      name="preference1"
                      value={formData.preference1}
                      onChange={handleChange}
                      error={errors.preference1}
                      options={["Marketing", "Creative", "Public Relations", "Operations", "Technical"]}
                      required
                    />
                    <FormField
                      label={<span>Preference 2 <span className="text-red-400"></span></span>}
                      type="select"
                      name="preference2"
                      value={formData.preference2}
                      onChange={handleChange}
                      error={errors.preference2}
                      options={["Marketing", "Creative", "Public Relations", "Operations", "Technical"]}
                      required
                    />
                    <FormField
                      label={<span>Preference 3 <span className="text-red-400"></span></span>}
                      type="select"
                      name="preference3"
                      value={formData.preference3}
                      onChange={handleChange}
                      error={errors.preference3}
                      options={["Marketing", "Creative", "Public Relations", "Operations", "Technical"]}
                      required
                    />

                    {/* Open to Other Committee Field (moved to last) */}
                    {/* SubmitButton will now come after this field */}

                    {/* Motivation Field */}
                    <div className="flex flex-col">
                      <label htmlFor="motivation" className="text-sm font-medium text-slate-200 mb-1">
                        Why do you want to join IEEE? <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="motivation"
                        name="motivation"
                        value={formData.motivation}
                        onChange={handleChange}
                        className="px-3 py-2 rounded-md bg-slate-800 text-slate-100 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition min-h-[80px] resize-y"
                        placeholder="Share your motivation..."
                        required
                      />
                      {errors.motivation && (
                        <span className="text-red-400 text-xs mt-1">{errors.motivation}</span>
                      )}
                    </div>

                    {/* Skills/Experience Field */}
                    <div className="flex flex-col">
                      <label htmlFor="skills" className="text-sm font-medium text-slate-200 mb-1">
                        Mention the skills that you would bring in to contribute to the position that you applied for?<span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="skills"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        className="px-3 py-2 rounded-md bg-slate-800 text-slate-100 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition min-h-[80px] resize-y"
                        placeholder="Describe your skills and experience..."
                        required
                      />
                      {errors.skills && (
                        <span className="text-red-400 text-xs mt-1">{errors.skills}</span>
                      )}
                    </div>

                    {/* Event Idea Field */}
                    <div className="flex flex-col">
                      <label htmlFor="eventIdea" className="text-sm font-medium text-slate-200 mb-1">
                        If you want to organize any event, what would it be? <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="eventIdea"
                        name="eventIdea"
                        value={formData.eventIdea}
                        onChange={handleChange}
                        className="px-3 py-2 rounded-md bg-slate-800 text-slate-100 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition min-h-[80px] resize-y"
                        placeholder="Describe the event you would like to organize..."
                        required
                      />
                      {errors.eventIdea && (
                        <span className="text-red-400 text-xs mt-1">{errors.eventIdea}</span>
                      )}
                    </div>

                    <div className="flex flex-col mt-4">
                      <label className="text-sm font-medium text-slate-200 mb-1">
                        Are you open to joining any other committee? <span className="text-red-400">*</span>
                      </label>
                      <div className="flex gap-6 items-center mt-1">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="openToOtherCommittee"
                            value="Yes"
                            checked={formData.openToOtherCommittee === "Yes"}
                            onChange={handleChange}
                            className="accent-cyan-500"
                            required
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="openToOtherCommittee"
                            value="No"
                            checked={formData.openToOtherCommittee === "No"}
                            onChange={handleChange}
                            className="accent-cyan-500"
                            required
                          />
                          No
                        </label>
                      </div>
                      {errors.openToOtherCommittee && (
                        <span className="text-red-400 text-xs mt-1">{errors.openToOtherCommittee}</span>
                      )}
                    </div>
                    <div className="flex justify-center pt-4">
                      <SubmitButton isLoading={isSubmitting} label="Register" />
                    </div>
                    {submitError && (
                      <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded-md">
                        <p className="text-red-300 text-sm text-center">{submitError}</p>
                      </div>
                    )}
                  </form>
                </div>
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
                    setSubmitError("");
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
