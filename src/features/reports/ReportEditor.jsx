import React, { useState } from "react";
import Button from "../../components/Button";
import ImageUploader from "./ImageUploader";
import { Plus, Save, Trash2, X } from "lucide-react";

export default function ReportEditor({ report, patient, onSave, onCancel }) {
  const [formData, setFormData] = useState(
    report || {
      date: new Date().toISOString().split("T")[0],
      type: "Colonoscopy Report",
      instrument: "",
      premedication: "",
      findings: [""],
      ileum: [""],
      conclusion: "",
      doctor: "Dr/ Shoman Rablee Shoman",
      doctorSpecialty: "استشاري مناظير الجهاز الهضمي والكبد",
      images: Array(5).fill(null),
    }
  );

  const handleChange = (e, section = null, index = null) => {
    const { name, value } = e.target;
    if (section) {
      const updatedSection = [...formData[section]];
      updatedSection[index] = value;
      setFormData((prev) => ({ ...prev, [section]: updatedSection }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddField = (section) =>
    setFormData((prev) => ({ ...prev, [section]: [...prev[section], ""] }));
  const handleRemoveField = (section, index) => {
    if (formData[section].length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      [section]: formData[section].filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (e, index) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImages = [...formData.images];
        newImages[index] = event.target.result;
        setFormData((prev) => ({ ...prev, images: newImages }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...formData.images];
    newImages[index] = null;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const renderDynamicFields = (section) => (
    <div className="space-y-2">
      {formData[section].map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="text-lg mr-2">•</span>
          <input
            type="text"
            value={item}
            onChange={(e) => handleChange(e, section, index)}
            className="w-full bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none"
            placeholder="..."
          />
          <button
            type="button"
            onClick={() => handleRemoveField(section, index)}
            className="p-1 text-red-500 hover:bg-red-100 rounded-full"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <Button
        onClick={() => handleAddField(section)}
        variant="secondary"
        className="text-xs py-1 px-2 mt-2"
      >
        <Plus size={14} /> Add Point
      </Button>
    </div>
  );

  const inputClass =
    "w-full bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none text-lg";

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white shadow-2xl p-8 font-serif"
      >
        <header className="text-center mb-6">
          <p className="text-2xl font-bold text-red-800 text-center w-full bg-transparent outline-none">
            {formData?.doctor}
          </p>
          <p >
            {formData?.doctorSpecialty}
          </p>
        </header>

        <div className="border-t-2 border-b-2 border-black py-2 mb-6">
          <input
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="text-center text-xl font-bold uppercase tracking-wider w-full bg-transparent outline-none"
            placeholder="Report Type"
          />
        </div>

        {/* Patient Info Table */}
        <table className="w-full mb-6 text-lg">
          <tbody>
            <tr>
              <td className="font-bold pr-2">Name:</td>
              <td className="w-1/2">{patient.name}</td>
              <td className="font-bold pr-2 text-right">Date:</td>
              <td className="w-1/4 text-right">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`${inputClass} text-right`}
                />
              </td>
            </tr>
            <tr>
              <td className="font-bold pr-2">Age:</td>
              <td>{patient.age} yrs</td>
            </tr>
            <tr>
              <td className="font-bold pr-2">Instrument:</td>
              <td>
                <input
                  name="instrument"
                  value={formData.instrument}
                  onChange={handleChange}
                  className={inputClass}
                />
              </td>
              <td className="font-bold pr-2 text-right">Premedication:</td>
              <td>
                <input
                  name="premedication"
                  value={formData.premedication}
                  onChange={handleChange}
                  className={`${inputClass} text-right`}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            <p className="mb-4 text-lg">
              <strong>
                Colonoscopy was done with Satisfactory preparation till the
                caecum and revealed:
              </strong>
            </p>
            <div className="pl-4 mb-6">{renderDynamicFields("findings")}</div>

            <p className="mb-4 text-lg">
              <strong>The ileum was entered and revealed:</strong>
            </p>
            <div className="pl-4 mb-6">{renderDynamicFields("ileum")}</div>

            <div className="border-2 border-black p-4">
              <p className="mb-2 text-lg">
                <strong>Conclusion:</strong>
              </p>
              <textarea
                name="conclusion"
                value={formData.conclusion}
                onChange={handleChange}
                className="text-lg w-full h-24 bg-transparent outline-none resize-none"
              />
            </div>
          </div>
          <div className="w-full md:w-1/3 space-y-2">
            {formData.images.map((image, index) => (
              <ImageUploader
                key={index}
                image={image}
                index={index}
                onImageChange={handleImageChange}
                onRemoveImage={handleRemoveImage}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-between items-end">
          <div>
            <p className="font-bold">Signature</p>
            <p className="mt-8">___________________</p>
            <p>{formData.doctor || "Doctor's Name"}</p>
          </div>
          <div className="text-right text-sm">
            <p>العنوان: دسوق - شارع عبد العزيز- امام نقابة التطبيقيين</p>
            <p>محمول: 01021627445 تليفون: 0472566629</p>
          </div>
        </div>

        <div className="fixed bottom-8 right-8 flex gap-4">
          <Button onClick={onCancel} variant="danger" className="shadow-lg">
            <X size={16} /> Cancel
          </Button>
          <Button type="submit" variant="success" className="shadow-lg">
            <Save size={16} /> Save Report
          </Button>
        </div>
      </form>
    </div>
  );
}
