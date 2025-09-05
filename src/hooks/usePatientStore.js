import { useCallback, useState } from "react";
import { initialPatients } from "../data/initialData";

export const usePatientStore = () => {
    const [patients, setPatients] = useState(initialPatients);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [editingReport, setEditingReport] = useState(null);
    const [view, setView] = useState('list');
const addPatient = useCallback((patientData) => {
        const newPatient = {
            ...patientData,
            id: Date.now(),
            reports: [],
            prescriptions: []
        };
        setPatients(prev => [...prev, newPatient]);
    }, []);
    const updatePatient = useCallback((updatedPatient) => {
        setPatients(prev => prev.map(p => p.id === updatedPatient.id ? updatedPatient : p));
        if (selectedPatient && selectedPatient.id === updatedPatient.id) {
            setSelectedPatient(updatedPatient);
        }
    }, [selectedPatient]);

    const saveReport = useCallback((reportData) => {
        if (!selectedPatient) return;
        const updatedReports = editingReport
            ? selectedPatient.reports.map(r => r.id === editingReport.id ? { ...r, ...reportData } : r)
            : [...selectedPatient.reports, { ...reportData, id: Date.now() }];
        
        updatePatient({ ...selectedPatient, reports: updatedReports });
        setView('details');
        setEditingReport(null);
    }, [selectedPatient, editingReport, updatePatient]);

    const selectPatient = (patient) => {
        setSelectedPatient(patient);
        setView('details');
    };

    const backToList = () => {
        setSelectedPatient(null);
        setEditingReport(null);
        setView('list');
    };

    const goToAddReport = () => {
        setEditingReport(null);
        setView('editReport');
    };

    const goToEditReport = (report) => {
        setEditingReport(report);
        setView('editReport');
    };

    return {
        patients,
        selectedPatient,
        editingReport,
        view,
        actions: {
            addPatient,
            updatePatient,
            saveReport,
            selectPatient,
            backToList,
            goToAddReport,
            goToEditReport,
            setView,
        }
    };
};