export const initialPatients = [
    {
        id: 1,
        name: 'Hussein Essam Zaalouk',
        age: 29,
        dob: '1996-05-15',
        reports: [
            {
                id: 101,
                date: '2025-04-24',
                type: 'Colonoscopy Report',
                instrument: 'Olympus CV-260 SL',
                premedication: 'Propofol',
                findings: [
                    'Normal Colonic Mucosa with no masses, no ulcers and no polyps.',
                    'Normal vascular pattern',
                ],
                ileum: ['Blunted Villi Biopsied for Histopathological Examination.'],
                conclusion: 'Terminal Ilial Erythema with Blunted Villi Biopsied for Histopathological Examination.',
                doctor: 'Dr/ Shoman Rablee. Shoman',
                doctorSpecialty: 'استشاري مناظير الجهاز الهضمي والكبد',
                images: [null, null, null, null, null],
            },
        ],
        prescriptions: [
            {
                id: 201,
                date: '2025-04-24',
                medications: [
                    { medication: 'Mesalazine', dosage: '500mg', frequency: '3 times a day', duration: '2 months' },
                    { medication: 'Probiotic Supplement', dosage: '1 capsule', frequency: 'Once a day', duration: '1 month' },
                ]
            },
        ],
    },
    {
        id: 2,
        name: 'Jane Smith',
        age: 45,
        dob: '1980-02-20',
        reports: [],
        prescriptions: [
            {
                id: 202,
                date: '2025-09-01',
                medications: [
                    { medication: 'Amoxicillin', dosage: '500mg', frequency: 'Twice a day', duration: '7 days' }
                ]
            }
        ],
    },
];