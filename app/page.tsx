'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();

  function handleStart() {
    router.push('/form/step1');
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-blue-50 px-6 py-12">
      <Image
        src="/skatpilot_logo_128x128.png"
        alt="Skat Pilot logo"
        width={128}
        height={128}
        className="mb-6"
      />
      <h1 className="text-5xl font-extrabold text-blue-900 mb-4 text-center">
        Velkommen til Skat Pilot
      </h1>
      <p className="text-xl text-blue-700 mb-10 text-center max-w-md">
        Din personlige guide til nem og tryg skatteindberetning.
      </p>
      <button
        onClick={handleStart}
        className="px-12 py-4 bg-blue-800 text-white rounded-xl font-bold hover:bg-blue-900 transition"
      >
        Kom i gang
      </button>
    </main>
  );
}