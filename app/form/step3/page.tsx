'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSkatPilot } from '../../../context/SkatPilotContext';

export default function Step3Page() {
  const router = useRouter();
  const { skatData } = useSkatPilot();

  const [submitted, setSubmitted] = useState(false);

  function handleEditStep(step: number) {
    router.push(`/form/step${step}`);
  }

  function handleSubmit() {
    // Her kan du inds�tte kode til faktisk submission (API kald osv.)
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="min-h-screen flex flex-col justify-center items-center bg-green-50 px-6 py-12">
        <h1 className="text-4xl font-bold mb-4 text-green-700">Tak!</h1>
        <p className="text-green-700 mb-8">
          Dine oplysninger er sendt korrekt.
        </p>
        <button
          onClick={() => router.push('/')}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          Til forsiden
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-blue-50 px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Opsummering af dine oplysninger</h1>

      <div className="bg-white shadow rounded p-8 w-full max-w-lg space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2 flex justify-between items-center">
            Personlige oplysninger
            <button
              onClick={() => handleEditStep(1)}
              className="text-blue-600 hover:underline text-sm"
            >
              Ret
            </button>
          </h2>
          <p><strong>Navn:</strong> {skatData.name || '-'}</p>
          <p><strong>CPR-nummer:</strong> {skatData.cpr || '-'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 flex justify-between items-center">
            Skatteoplysninger
            <button
              onClick={() => handleEditStep(2)}
              className="text-blue-600 hover:underline text-sm"
            >
              Ret
            </button>
          </h2>
          <p><strong>Indkomst:</strong> {skatData.income || '-'}</p>
          <p><strong>Fradrag:</strong> {skatData.hasDeduction ? 'Ja' : 'Nej'}</p>
          <p><strong>Vis pensionsoversigt:</strong> {skatData.wantsPensionOverview ? 'Ja' : 'Nej'}</p>
        </section>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-800 text-white py-3 rounded font-bold hover:bg-blue-900 transition"
        >
          Bekr�ft og send
        </button>
      </div>
    </main>
  );
}