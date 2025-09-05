import React, { useRef, useState } from 'react'
import Button from '../../components/Button';
import { ArrowLeft, Pencil, Plus, Printer, Trash2 } from 'lucide-react';
import PrintableReport from '../reports/PrintableReport';
import Modal from '../../components/Modal';
import ConfirmationModal from '../../components/ConfirmationModal';
import PrescriptionForm from '../prescriptions/PrescriptionForm';
import Card from '../../components/Card';

export default function PatientDetails({ patient, onBack, onUpdatePatient, onEditReport, onAddReport }) {
  const [isPrescriptionModalOpen, setPrescriptionModalOpen] = useState(false);
    const [editingPrescription, setEditingPrescription] = useState(null);
    const [reportToPrint, setReportToPrint] = useState(null);
    const [confirmation, setConfirmation] = useState({ isOpen: false, title: '', message: '', onConfirm: null });
    
    const printRef = useRef();

    const handlePrint = () => {
        const content = printRef.current.innerHTML;
        const printWindow = window.open('', '', 'height=800,width=800');
        printWindow.document.write('<html><head><title>Print Report</title>');
        printWindow.document.write('<script src="https://cdn.tailwindcss.com"><\/script>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(content);
        printWindow.document.write(`<script>window.onload = () => { setTimeout(() => { window.print(); window.close(); }, 100); };</script>`);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
    };
    
    const handleSavePrescription = (prescriptionData) => {
        const updatedPrescriptions = editingPrescription
            ? patient.prescriptions.map(p => p.id === editingPrescription.id ? { ...p, ...prescriptionData } : p)
            : [...patient.prescriptions, { ...prescriptionData, id: Date.now() }];
        
        onUpdatePatient({ ...patient, prescriptions: updatedPrescriptions });
        setPrescriptionModalOpen(false);
        setEditingPrescription(null);
    };
    
    const confirmDeletion = (title, message, onConfirm) => {
        setConfirmation({ isOpen: true, title, message, onConfirm });
    };

    const closeConfirmation = () => {
        setConfirmation({ isOpen: false, title: '', message: '', onConfirm: null });
    };

    const handleDeleteReport = (reportId) => {
        confirmDeletion('Delete Report', 'Are you sure you want to permanently delete this report?', () => {
            const updatedReports = patient.reports.filter(r => r.id !== reportId);
            onUpdatePatient({ ...patient, reports: updatedReports });
            closeConfirmation();
        });
    };
    
    const handleDeletePrescription = (prescriptionId) => {
        confirmDeletion('Delete Prescription', 'Are you sure you want to permanently delete this prescription?', () => {
            const updatedPrescriptions = patient.prescriptions.filter(p => p.id !== prescriptionId);
            onUpdatePatient({ ...patient, prescriptions: updatedPrescriptions });
            closeConfirmation();
        });
    };

    return (
        <div className="p-4 md:p-8">
            <Button onClick={onBack} variant="secondary" className="mb-6"><ArrowLeft size={16}/> Back to Patients</Button>

            <Card className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">{patient.name}</h1>
                <p className="text-gray-500">Age: {patient.age} | DOB: {patient.dob}</p>
            </Card>

            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-700">Medical Reports</h2>
                    <Button onClick={onAddReport}><Plus size={16} /> Add Report</Button>
                </div>
                <div className="space-y-4">
                    {patient.reports.length > 0 ? patient.reports.map(report => (
                        <Card key={report.id}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg text-blue-700">{report.type}</h3>
                                    <p className="text-sm text-gray-500">Date: {report.date}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button onClick={() => setReportToPrint(report)} variant="secondary" className="px-2 py-1 text-sm"><Printer size={14} /></Button>
                                    <Button onClick={() => onEditReport(report)} variant="secondary" className="px-2 py-1 text-sm"><Pencil size={14} /></Button>
                                    <Button onClick={() => handleDeleteReport(report.id)} variant="danger" className="px-2 py-1 text-sm"><Trash2 size={14} /></Button>
                                </div>
                            </div>
                            <div className="mt-4 border-t pt-4 space-y-3 text-gray-600">
                                <p><strong className="font-semibold">Instrument:</strong> {report.instrument}</p>
                                <p><strong className="font-semibold">Premedication:</strong> {report.premedication}</p>
                                <div><strong className="font-semibold">Findings:</strong><ul className="list-disc list-inside ml-4">{report.findings.map((f, i) => <li key={i}>{f}</li>)}</ul></div>
                                {report.ileum.length > 0 && <div><strong className="font-semibold">Ileum:</strong><ul className="list-disc list-inside ml-4">{report.ileum.map((i, idx) => <li key={idx}>{i}</li>)}</ul></div>}
                                <p><strong className="font-semibold">Conclusion:</strong> {report.conclusion}</p>
                                <p className="text-right text-sm italic mt-4">Signed, {report.doctor}</p>
                            </div>
                        </Card>
                    )) : <p className="text-gray-500">No reports found.</p>}
                </div>
            </section>
            
            <section className="mt-12">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-700">Prescriptions</h2>
                    <Button onClick={() => { setEditingPrescription(null); setPrescriptionModalOpen(true); }}><Plus size={16} /> Add Prescription</Button>
                </div>
                <div className="space-y-4">
                    {patient.prescriptions.length > 0 ? patient.prescriptions.map(p => (
                        <Card key={p.id}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg text-blue-700">Prescription</h3>
                                    <p className="text-sm text-gray-500">Date: {p.date}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button onClick={() => { setEditingPrescription(p); setPrescriptionModalOpen(true); }} variant="secondary" className="px-2 py-1 text-sm"><Pencil size={14} /></Button>
                                    <Button onClick={() => handleDeletePrescription(p.id)} variant="danger" className="px-2 py-1 text-sm"><Trash2 size={14} /></Button>
                                </div>
                            </div>
                            <div className="mt-4 border-t pt-4">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="font-semibold p-2">Medication</th>
                                            <th className="font-semibold p-2">Dosage</th>
                                            <th className="font-semibold p-2">Frequency</th>
                                            <th className="font-semibold p-2">Duration</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {p.medications.map((med, index) => (
                                            <tr key={index} className="border-b last:border-none">
                                                <td className="p-2">{med.medication}</td>
                                                <td className="p-2">{med.dosage}</td>
                                                <td className="p-2">{med.frequency}</td>
                                                <td className="p-2">{med.duration}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    )) : <p className="text-gray-500">No prescriptions found.</p>}
                </div>
            </section>

            <Modal isOpen={isPrescriptionModalOpen} onClose={() => setPrescriptionModalOpen(false)} title={editingPrescription ? 'Edit Prescription' : 'Add New Prescription'}>
                <PrescriptionForm prescription={editingPrescription} onSave={handleSavePrescription} />
            </Modal>
            <ConfirmationModal isOpen={confirmation.isOpen} onClose={closeConfirmation} onConfirm={confirmation.onConfirm} title={confirmation.title} message={confirmation.message} />
            {reportToPrint && (
                <Modal isOpen={true} onClose={() => setReportToPrint(null)} title="Print Preview">
                    <div ref={printRef} className="p-4 bg-gray-200 rounded-md">
                        <PrintableReport report={reportToPrint} patient={patient} />
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Button onClick={handlePrint}><Printer size={16}/> Print Report</Button>
                    </div>
                </Modal>
            )}
        </div>
    );

}
