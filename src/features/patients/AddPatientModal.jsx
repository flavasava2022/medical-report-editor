import React, { useEffect, useState } from "react";
import Button from "../../components/Button";

export default function AddPatientModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({ name: "", dob: "" });
  const [age, setAge] = useState("");
  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  useEffect(() => {
    if (formData.dob) {
      setAge(calculateAge(formData.dob));
    } else {
      setAge("");
    }
  }, [formData.dob]);

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: "", dob: "" });
      setAge("");
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dob) {
      console.error("Please fill in all fields.");
      return;
    }
    const patientData = {
      ...formData,
      age: parseInt(age, 10),
    };
    onSave(patientData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Full Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., Jane Smith"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="dob"
            className="block text-sm font-medium text-gray-700"
          >
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            id="dob"
            value={formData.dob}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age
          </label>
          <input
            type="text"
            name="age"
            id="age"
            value={age}
            readOnly
            className="mt-1 w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            placeholder="Calculated automatically"
          />
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <Button type="submit">Save Patient</Button>
      </div>
    </form>
  );
}
