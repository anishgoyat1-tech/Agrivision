"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

export type FarmSettings = {
  farmName: string;
  farmLocation: string;
  farmSize: number;
  farmType: string;
  description: string;
};

type FarmSettingsContextType = {
  farmSettings: FarmSettings;
  setFarmSettings: (settings: FarmSettings) => void;
  isSettingsSaved: boolean;
  setIsSettingsSaved: (isSaved: boolean) => void;
};

const FarmSettingsContext = createContext<FarmSettingsContextType | undefined>(undefined);

const defaultFarmSettings: FarmSettings = {
  farmName: "Sunny Meadows Farm",
  farmLocation: "Punjab, India",
  farmSize: 500,
  farmType: "arable",
  description: "A family-owned farm dedicated to sustainable and innovative farming practices, specializing in corn and soybean cultivation.",
};

export function FarmSettingsProvider({ children }: { children: ReactNode }) {
  const [farmSettings, setFarmSettings] = useState<FarmSettings>(defaultFarmSettings);
  const [isSettingsSaved, setIsSettingsSaved] = useState(false);

  return (
    <FarmSettingsContext.Provider value={{ farmSettings, setFarmSettings, isSettingsSaved, setIsSettingsSaved }}>
      {children}
    </FarmSettingsContext.Provider>
  );
}

export function useFarmSettings() {
  const context = useContext(FarmSettingsContext);
  if (context === undefined) {
    throw new Error('useFarmSettings must be used within a FarmSettingsProvider');
  }
  return context;
}
