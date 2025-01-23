import React, { createContext } from 'react';

type SetCurrentScreen = (screen: string) => void;

export const NavigationContext = createContext<SetCurrentScreen | null>(null);

interface NavigationProviderProps {
  children: React.ReactNode;
  setCurrentScreen: SetCurrentScreen;
}

export function NavigationProvider({ children, setCurrentScreen }: NavigationProviderProps) {
  return (
    <NavigationContext.Provider value={setCurrentScreen}>
      {children}
    </NavigationContext.Provider>
  );
}