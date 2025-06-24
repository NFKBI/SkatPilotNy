'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSkatPilot } from '../../../context/SkatPilotContext';

export default function Step1Page() {
  const router = useRouter();
  const { skatData, setSkatData } = useSkatPilot();

  const [name, setName] = useState(skatData.name || '');
  const [cpr, setCpr] = useState(skatData.cpr || '');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (name.trim() !== '' && /^\d{6}[-]?\d{4}$/.test(cpr)) {
      setIsValid(true);
      setError('');
    } else {
      setIsValid(false);
    }
  }, [name, cpr]);

  function validateCpr(cpr: string) {
    return /^\d{6}[-]?\d{4}$/.test(cpr);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError('Indtast venligst dit navn');
      return;
    }
    if (!validateCpr(cpr)) {
      setError('Indtast venligst et gyldigt CPR-nummer (f.eks. 010203-1234)');
      return;
    }
    setError('');
    setSkatData({ name: name.trim(), cpr: cpr.trim() });
    router.push('/form/step2');
  }

  return (
    <main
      className="min-h-screen flex flex-col justify-center items-center bg-blue-50 px-6 py-12"
      aria-labelledby="pageTitle"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-lg w-full max-w-lg p-10"
        noValidate
        aria-describedby="errorMessage"
      >
        <div
          id="stepIndicator"
          className="mb-8 text-blue-800 font-semibold uppercase tracking-wide text-center"
          aria-live="polite"
        >
          Trin 1 af 3
        </div>

        <h1
          id="pageTitle"
          className="text-5xl font-extrabold mb-10 text-center text-blue-900"
        >
          SkatPilot
        </h1>

        {error && (
          <p
            id="errorMessage"
            role="alert"
            className="mb-8 flex items-center text-red-600 font-semibold text-center"
          >
            <svg
              className="w-6 h-6 mr-3 inline-block"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </p>
        )}

        <label htmlFor="nameInput" className="block mb-6">
          <span className="text-blue-800 font-semibold text-xl">Navn</span>
          <input
            id="nameInput"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Indtast dit fulde navn"
            className="mt-3 block w-full rounded-xl border border-blue-300 shadow-sm px-5 py-4
              focus:border-blue-700 focus:ring focus:ring-blue-300 focus:ring-opacity-70 text-xl placeholder-blue-400"
            required
            aria-invalid={error.includes('navn') ? 'true' : 'false'}
            aria-describedby={error.includes('navn') ? 'errorMessage' : undefined}
          />
          <p className="text-sm text-blue-600 mt-1">
            Dit fulde navn som i officielle dokumenter
          </p>
        </label>

        <label htmlFor="cprInput" className="block mb-10">
          <span className="text-blue-800 font-semibold text-xl">CPR-nummer</span>
          <input
            id="cprInput"
            type="text"
            value={cpr}
            onChange={e => setCpr(e.target.value)}
            placeholder="DDMMYY-XXXX"
            maxLength={11}
            className="mt-3 block w-full rounded-xl border border-blue-300 shadow-sm px-5 py-4
              focus:border-blue-700 focus:ring focus:ring-blue-300 focus:ring-opacity-70 text-xl placeholder-blue-400"
            required
            aria-invalid={error.includes('CPR') ? 'true' : 'false'}
            aria-describedby={error.includes('CPR') ? 'errorMessage' : undefined}
          />
          <p className="text-sm text-blue-600 mt-1">
            Dit CPR-nummer bruges til skat og pension
          </p>
        </label>

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-5 rounded-xl font-extrabold transition duration-200
            ${isValid ? 'bg-blue-800 hover:bg-blue-900 text-white shadow-xl' : 'bg-blue-200 text-blue-400 cursor-not-allowed'}`}
        >
          N�ste trin
        </button>
      </form>
    </main>
  );
}