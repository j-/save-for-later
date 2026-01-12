import { useContext } from 'react';
import { InstallPWAContext } from './context';

export const useInstallPWA = () => useContext(InstallPWAContext);
