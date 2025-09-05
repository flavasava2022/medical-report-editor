import PatientDetails from "./features/patients/PatientDetails";
import PatientList from "./features/patients/PatientList";
import ReportEditor from "./features/reports/ReportEditor";
import { usePatientStore } from "./hooks/usePatientStore";

const App = () => {
  const { patients, selectedPatient, editingReport, view, actions } =
    usePatientStore();

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">
            Doctor's Dashboard
          </h1>
        </div>
      </header>

      <main>
        {view === "list" && (
          <PatientList
            patients={patients}
            onSelectPatient={actions.selectPatient}
            handleAddPatient={actions.addPatient}
          />
        )}

        {view === "details" && selectedPatient && (
          <PatientDetails
            patient={selectedPatient}
            onBack={actions.backToList}
            onUpdatePatient={actions.updatePatient}
            onAddReport={actions.goToAddReport}
            onEditReport={actions.goToEditReport}
          />
        )}

        {view === "editReport" && selectedPatient && (
          <ReportEditor
            report={editingReport}
            patient={selectedPatient}
            onSave={actions.saveReport}
            onCancel={() => actions.setView("details")}
          />
        )}
      </main>
    </div>
  );
};

export default App;
