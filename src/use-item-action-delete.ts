import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useCallback } from 'react';
import { deleteItemOptions } from './api';
import { indexRoute } from './Router';

export const useItemActionDelete = () => {
  const navigate = useNavigate();

  const {
    mutateAsync: deleteItem,
  } = useMutation(deleteItemOptions);

  return useCallback(async (itemId: string) => {
    await deleteItem([itemId], {
      onSuccess() {
        navigate({
          to: indexRoute.fullPath,
        });
      },
    });
  }, [deleteItem, navigate]);
};
