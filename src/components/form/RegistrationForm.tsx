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
    uid: "",
    branch: "",
    year: "",
    preference1: "",
    preference2: "",
    preference3: "",
    motivation: "",
    skills: "",
    openToOtherCommittee: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email.";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number.";
    if (!formData.uid.trim() || formData.uid.length !== 10)
      newErrors.uid = "UID (Roll number) must be 10 characters.";
    if (!formData.branch) newErrors.branch = "Branch is required.";
    if (!formData.year) newErrors.year = "Year is required.";
    if (!formData.preference1) newErrors.preference1 = "Preference 1 is required.";
    if (!formData.preference2) newErrors.preference2 = "Preference 2 is required.";
    if (!formData.preference3) newErrors.preference3 = "Preference 3 is required.";
    if (!formData.motivation.trim()) newErrors.motivation = "This field is required.";
    if (!formData.skills.trim()) newErrors.skills = "This field is required.";
    if (!formData.openToOtherCommittee) newErrors.openToOtherCommittee = "This field is required.";
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

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        uid: "",
        branch: "",
        year: "",
        preference1: "",
        preference2: "",
        preference3: "",
        motivation: "",
        skills: "",
        openToOtherCommittee: "",
      });
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
                      label={<span>UID (Roll number) <span className="text-red-400">*</span></span>}
                      type="text"
                      name="uid"
                      value={formData.uid}
                      onChange={handleChange}
                      error={errors.uid}
                      placeholder="10-character roll number"
                      required
                    />
                    <FormField
                      label={<span>Branch <span className="text-red-400">*</span></span>}
                      type="select"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      error={errors.branch}
                      options={["CE", "CSE", "EXTC"]}
                      required
                    />
                    <FormField
                      label={<span>Preference 1 <span className="text-red-400">*</span></span>}
                      type="select"
                      name="preference1"
                      value={formData.preference1}
                      onChange={handleChange}
                      error={errors.preference1}
                      options={["Marketing Head", "Event Head", "Creative head", "Head Of Subcomm", "Deputy Tech Head", "Head of Public Relations", "Head of Operations", "Social Media Manager"]}
                      required
                    />
                    <FormField
                      label={<span>Preference 2 <span className="text-red-400">*</span></span>}
                      type="select"
                      name="preference2"
                      value={formData.preference2}
                      onChange={handleChange}
                      error={errors.preference2}
                      options={["Marketing Head", "Event Head", "Creative head", "Head Of Subcomm", "Deputy Tech Head", "Head of Public Relations", "Head of Operations", "Social Media Manager"]}
                      required
                    />
                    <FormField
                      label={<span>Preference 3 <span className="text-red-400">*</span></span>}
                      type="select"
                      name="preference3"
                      value={formData.preference3}
                      onChange={handleChange}
                      error={errors.preference3}
                      options={["Marketing Head", "Event Head", "Creative head", "Head Of Subcomm", "Deputy Tech Head", "Head of Public Relations", "Head of Operations", "Social Media Manager"]}
                      required
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
                        Mention the skills that you would bring in to contribute to the position that you applied for? (Also add experience of previous committees) <span className="text-red-400">*</span>
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
                    {/* Resume Upload Field */}
                    <div className="flex flex-col">
                      <label htmlFor="resume" className="text-sm font-medium text-slate-200 mb-1">
                        Resume (only for Deputy Tech Head)
                      </label>
                      <input
                        id="resume"
                        name="resume"
                        type="file"
                        accept=".pdf,.doc,.docx,.odt,.rtf,.txt"
                        className="file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700 bg-slate-800 text-slate-100 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                        onChange={(e) => {
                          const file = e.target.files && e.target.files[0];
                          if (file && file.size > 10 * 1024 * 1024) {
                            alert("File size exceeds 10 MB limit.");
                            e.target.value = "";
                          } else {
                            // Optionally handle file upload logic here
                          }
                        }}
                      />
                      <span className="text-xs text-slate-400 mt-1">Upload 1 supported file. Max 10 MB.</span>
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
