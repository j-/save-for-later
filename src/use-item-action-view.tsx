import { useNavigate } from '@tanstack/react-router';
import { useCallback } from 'react';
import { itemIdRoute } from './Router';

export const useItemActionView = () => {
  const navigate = useNavigate();

  return useCallback(async (itemId: string) => {
    if (!itemId) return;

    await navigate({
      to: itemIdRoute.fullPath,
      params: { itemId },
    });
  }, [navigate]);
};
