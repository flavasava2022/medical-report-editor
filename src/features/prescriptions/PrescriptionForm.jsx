import React, { useState } from "react";
import Button from "../../components/Button";
import { Plus, Trash2 } from "lucide-react";

export default function PrescriptionForm({ prescription, onSave }) {
  const [formData, setFormData] = useState(
    prescription || {
      date: new Date().toISOString().split("T")[0],
      medications: [
        { medication: "", dosage: "", frequency: "", duration: "" },
      ],
    }
  );

  const handleDateChange = (e) =>
    setFormData((prev) => ({ ...prev, date: e.target.value }));

  const handleMedicationChange = (e, index) => {
    const { name, value } = e.target;
    const updatedMeds = [...formData.medications];
    updatedMeds[index][name] = value;
    setFormData((prev) => ({ ...prev, medications: updatedMeds }));
  };

  const addMedication = () => {
    setFormData((prev) => ({
      ...prev,
      medications: [
        ...prev.medications,
        { medication: "", dosage: "", frequency: "", duration: "" },
      ],
    }));
  };

  const removeMedication = (index) => {
    if (formData.medications.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleDateChange}
          className="mt-1 w-full p-2 border rounded-lg"
        />
      </div>

      {formData.medications.map((med, index) => (
        <div key={index} className="space-y-3 p-4 border rounded-lg relative">
          <button
            type="button"
            onClick={() => removeMedication(index)}
            className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-100 rounded-full"
          >
            <Trash2 size={16} />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Medication
              </label>
              <input
                type="text"
                name="medication"
                value={med.medication}
                onChange={(e) => handleMedicationChange(e, index)}
                className="mt-1 w-full p-2 border rounded-lg"
                placeholder="e.g., Amoxicillin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dosage
              </label>
              <input
                type="text"
                name="dosage"
                value={med.dosage}
                onChange={(e) => handleMedicationChange(e, index)}
                className="mt-1 w-full p-2 border rounded-lg"
                placeholder="e.g., 500mg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Frequency
              </label>
              <input
                type="text"
                name="frequency"
                value={med.frequency}
                onChange={(e) => handleMedicationChange(e, index)}
                className="mt-1 w-full p-2 border rounded-lg"
                placeholder="e.g., Twice a day"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={med.duration}
                onChange={(e) => handleMedicationChange(e, index)}
                className="mt-1 w-full p-2 border rounded-lg"
                placeholder="e.g., 7 days"
              />
            </div>
          </div>
        </div>
      ))}

      <Button onClick={addMedication} variant="secondary" className="w-full">
        <Plus size={16} /> Add Another Medication
      </Button>

      <div className="flex justify-end pt-4">
        <Button type="submit">Save Prescription</Button>
      </div>
    </form>
  );
}
