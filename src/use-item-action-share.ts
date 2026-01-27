import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { FIELD_ITEMS_DATA, getItemOptions } from './api';

export const useItemActionShare = () => {
  const queryClient = useQueryClient();

  return useCallback(async (itemId: string) => {
    const item = await queryClient.ensureQueryData(getItemOptions(itemId));
    const shareData = item[FIELD_ITEMS_DATA];

    if (
      typeof navigator.share !== 'function' ||
      typeof navigator.canShare !== 'function' ||
      !navigator.canShare(shareData)
    ) {
      return;
    }

    try {
      await navigator.share(shareData);
    } catch {
      // Ignore share errors.
    };
  }, [queryClient]);
};
