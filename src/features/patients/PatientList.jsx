import { Plus } from "lucide-react";
import React, { useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import AddPatientModal from "./AddPatientModal";

export default function PatientList({ patients, onSelectPatient,handleAddPatient }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [addPatientModalOpen, setAddPatientModalOpen] = useState(false);
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Patient List</h2>

        <div className="w-full max-w-xs flex gap-2 ">
          <Button
            onClick={() => {
              setAddPatientModalOpen(true);
            }}
          >
            <Plus size={16} /> Add Patient
          </Button>
          <input
            type="text"
            placeholder="Search patients..."
            className="w-full p-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Modal isOpen={addPatientModalOpen} onClose={() => setAddPatientModalOpen(false)} title="Add New Patient">
                        <AddPatientModal isOpen={addPatientModalOpen} onClose={() => setAddPatientModalOpen(false)} onSave={handleAddPatient} />
                    </Modal>
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            onClick={() => onSelectPatient(patient)}
            className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg hover:border-blue-500 border-2 border-transparent transition-all duration-200 transform hover:-translate-y-1"
          >
            <h3 className="text-xl font-bold text-gray-800">{patient.name}</h3>
            <p className="text-gray-500">Age: {patient.age}</p>
          </div>
        ))}
      </div>
      {filteredPatients.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No patients found matching your search.
        </p>
      )}
    </main>
  );
}
