'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSkatPilot } from '../../../context/SkatPilotContext';

export default function Step1Page() {
  const router = useRouter();
  const { skatData, setSkatData } = useSkatPilot();

  const [name, setName] = useState(skatData.name || '');
  const [cpr, setCpr] = useState(skatData.cpr || '');
  const [error, setError] = useState('');

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
    <main className="min-h-screen fl