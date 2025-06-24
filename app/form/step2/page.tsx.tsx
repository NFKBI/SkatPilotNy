'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSkatPilot } from '../../../context/SkatPilotContext';

export default function Step2Page() {
  const router = useRouter();
  const { skatData, setSkatData } = useSkatPilot();

  const [income, setIncome] = useState(skatData.income || '');
  const [hasDeduction, setHasDeduction] = useState(skatData.hasDeduction ?? false);
  const [wantsPensionOverview, setWantsPensionOverview] = useState(skatData.wantsPensionOverview ?? false);
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!income.trim() || isNaN(Number(income))) {
      setError('Indtast venligst en gyldig årlig indkomst');
      return;
    }
    setError('');
    setSkatData({
      income: income.trim(),
      hasDeduction,
      wantsPensionOverview,
    });
    router.push('/form/result');
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">SkatPilot - Trin 2</h1>

        {error && (
          <p className="mb-4 text-red-600 font-semibold text-center">{error}</p>
        )}

        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Årlig skattepligtig indkomst (DKK)</span>
          <input
            type="text"
            value={income}
            onChange={e => setIncome(e.target.value)}
            placeholder="Fx 350000"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </label>

        <fieldset className="mb-4">
          <legend className="text-gray-700 font-semibold mb-2">Har du fradrag?</legend>
          <label className="inline-flex items-center mr-6">
            <input
              type="radio"
              name="hasDeduction"
              checked={hasDeduction === true}
              onChange={() => setHasDeduction(true)}
              className="form-radio"
            />
            <span className="ml-2">Ja</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="hasDeduction"
              checked={hasDeduction === false}
              onChange={() => setHasDeduction(false)}
              className="form-radio"
            />
            <span className="ml-2">Nej</span>
          </label>
        </fieldset>

        <fieldset className="mb-6">
          <legend className="text-gray-700 font-semibold mb-2">Vil du se pensionsoversigt?</legend>
          <label className="inline-flex items-center mr-6">
            <input
              type="checkbox"
              checked={wantsPensionOverview}
              onChange={() => setWantsPensionOverview(!wantsPensionOverview)}
              className="form-checkbox"
            />
            <span className="ml-2">Ja, vis mig min pension</span>
          </label>
        </fieldset>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg font-semibold hover:bg-gray-400 transition"
          >
            Tilbage
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Næste
          </button>
        </div>
      </form>
    </main>
  );
}