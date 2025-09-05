import React from "react";

const PrintableReport = React.forwardRef(({ report, patient }, ref) => {
  return (
    <div ref={ref} className="p-8 font-serif text-gray-800 bg-white">
      {/* The rest of your component's JSX remains exactly the same */}
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold text-red-800">{report.doctor}</h1>
        <p className="text-lg">{report.doctorSpecialty}</p>
      </header>

      <div className="border-t-2 border-b-2 border-black py-2 mb-6">
        <h2 className="text-center text-xl font-bold uppercase tracking-wider">
          {report.type}
        </h2>
      </div>

      <table className="w-full mb-6 text-lg">
        <tbody>
          <tr>
            <td className="font-bold pr-2">Name:</td>
            <td>{patient.name}</td>
            <td className="font-bold pr-2 text-right">Date:</td>
            <td className="text-right">{report.date}</td>
          </tr>
          <tr>
            <td className="font-bold pr-2">Age:</td>
            <td>{patient.age} yrs</td>
          </tr>
          <tr>
            <td className="font-bold pr-2">Instrument:</td>
            <td>{report.instrument}</td>
            <td className="font-bold pr-2 text-right">Premedication:</td>
            <td className="text-right">{report.premedication}</td>
          </tr>
        </tbody>
      </table>

      <div className="flex gap-6">
        <div className="w-2/3">
          <p className="mb-4 text-lg">
            <strong>
              Colonoscopy was done with Satisfactory preparation till the caecum
              and revealed:
            </strong>
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg pl-4 mb-6">
            {report.findings.map((finding, index) => (
              <li key={`f-${index}`}>{finding}</li>
            ))}
          </ul>

          <p className="mb-4 text-lg">
            <strong>The ileum was entered and revealed:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg pl-4 mb-6">
            {report.ileum.map((item, index) => (
              <li key={`i-${index}`}>{item}</li>
            ))}
          </ul>

          <div className="border-2 border-black p-4">
            <p className="mb-2 text-lg">
              <strong>Conclusion:</strong>
            </p>
            <p className="text-lg">{report.conclusion}</p>
          </div>
        </div>
        <div className="w-1/3 space-y-2">
          {report.images.map((image, i) =>
            image ? (
              <img
                key={i}
                src={image}
                alt={`Endoscopy image ${i + 1}`}
                className="w-full border"
              />
            ) : (
              <div
                key={i}
                className="w-full h-40 border bg-gray-100 flex items-center justify-center text-gray-400"
              >
                No Image
              </div>
            )
          )}
        </div>
      </div>
      <div className="mt-16 flex justify-between items-end">
        <div>
          <p className="font-bold">Signature</p>
          <p className="mt-8">___________________</p>
          <p>{report.doctor}</p>
        </div>
        <div className="text-right text-sm">
          <p>العنوان: دسوق - شارع عبد العزيز- امام نقابة التطبيقيين</p>
          <p>محمول: 01021627445 تليفون: 0472566629</p>
        </div>
      </div>
    </div>
  );
});

export default PrintableReport;