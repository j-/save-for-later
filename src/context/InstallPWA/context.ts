import { createContext } from 'react';

export type InstallPWAContextType = {
  isInstalled: boolean;
  isSupported: boolean;
  isStandalone: boolean;
  requestInstall: () => void;
};

export const INITIAL_VALUE_INSTALL_PWA_CONTEXT = {
  isInstalled: false,
  isSupported: false,
  isStandalone: false,
  requestInstall: () => {},
} as const satisfies InstallPWAContextType;

export const InstallPWAContext = createContext<InstallPWAContextType>(
  INITIAL_VALUE_INSTALL_PWA_CONTEXT
);
