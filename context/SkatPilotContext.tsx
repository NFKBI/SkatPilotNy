"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SkatData {
  name: string;
  cpr: string;
  income?: string;
  hasDeduction?: boolean;
  wantsPensionOverview?: boolean;
}

interface SkatPilotContextType {
  skatData: SkatData;
  setSkatData: (data: Partial<SkatData>) => void;
}

const SkatPilotContext = createContext<SkatPilotContextType | undefined>(undefined);

export const SkatPilotProvider = ({ children }: { children: ReactNode }) => {
  const [skatData, setSkatDataState] = useState<SkatData>({ name: '', cpr: '' });

  const setSkatData = (data: Partial<SkatData>) => {
    setSkatDataState(prev => ({ ...prev, ...data }));
  };

  return (
    <SkatPilotContext.Provider value={{ skatData, setSkatData }}>
      {children}
    </SkatPilotContext.Provider>
  );
};

export const useSkatPilot = () => {
  const context = useContext(SkatPilotContext);
  if (!context) throw new Error('useSkatPilot must be used within SkatPilotProvider');
  return context;
};