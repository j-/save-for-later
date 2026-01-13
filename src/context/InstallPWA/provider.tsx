import useMediaQuery from '@mui/material/useMediaQuery';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';
import { InstallPWAContext, type InstallPWAContextType } from './context';

interface BeforeInstallPromptEvent extends Event {
  prompt?: () => Promise<'accepted' | 'dismissed'>;
}

const useRunningStandalone = (): boolean => {
  const iosStandalone = (navigator as any).standalone === true;

  const dmStandalone =
    useMediaQuery('(display-mode: standalone)') ?? false;

  const dmFullscreen =
    useMediaQuery('(display-mode: fullscreen)') ?? false;

  const dmMinimalUI =
    useMediaQuery('(display-mode: minimal-ui)') ?? false;

  return iosStandalone || dmStandalone || dmFullscreen || dmMinimalUI;
};

export const InstallPWAProvider: FC<PropsWithChildren> = ({ children }) => {
  const beforeinstallpromptEventRef = useRef<BeforeInstallPromptEvent>(null);

  const [isSupported, setIsSupported] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  const isStandalone = useRunningStandalone();

  const requestInstall = useCallback(async () => {
    if (!beforeinstallpromptEventRef.current) {
      throw new Error('Tried to install PWA before it was ready');
    }
    if (!beforeinstallpromptEventRef.current.prompt) {
      throw new Error('Before install prompt event did not have a prompt action');
    }
    try {
      const result = await beforeinstallpromptEventRef.current.prompt();
      if (result === 'dismissed') {
        throw new Error('Dismissed install prompt');
      }
    } catch (cause) {
      throw new Error('Error occurred when trying to install PWA', { cause });
    }
  }, []);

  const value = useMemo<InstallPWAContextType>(() => ({
    isSupported,
    isInstalled,
    isStandalone,
    requestInstall,
  }), [
    isSupported,
    isInstalled,
    isStandalone,
    requestInstall,
  ]);

  const handleBeforeinstallprompt = useCallback((e: Event) => {
    e.preventDefault();
    beforeinstallpromptEventRef.current = e;
    setIsSupported(true);
  }, []);

  const handleAppinstalled = useCallback(async () => {
    setIsInstalled(true);
  }, []);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', handleBeforeinstallprompt);

    return () => {
      window.addEventListener('beforeinstallprompt', handleBeforeinstallprompt);
    };
  }, [handleBeforeinstallprompt]);

  useEffect(() => {
    window.addEventListener('appinstalled', handleAppinstalled);

    return () => {
      window.addEventListener('appinstalled', handleAppinstalled);
    };
  }, [handleAppinstalled]);

  return <InstallPWAContext value={value}>{children}</InstallPWAContext>;
};
