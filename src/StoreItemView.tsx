import Paper from '@mui/material/Paper';
import type { FC } from 'react';
import { FIELD_ITEMS_DATA, type StoreItem } from './api';
import { StoreItemPreview } from './StoreItemPreview';
import { StoreItemViewActions } from './StoreItemViewActions';

export type StoreItemViewProps = {
  item: StoreItem;
  dataUpdatedAt: number;
  deleteItem?: () => void;
  shareItem?: () => void;
  viewItem?: () => void;
};

export const StoreItemView: FC<StoreItemViewProps> = ({
  item,
  dataUpdatedAt,
  deleteItem,
  shareItem,
  viewItem,
}) => {
  return (
    <Paper elevation={0} sx={{ p: 0 }}>
      <StoreItemPreview data={item[FIELD_ITEMS_DATA]} />

      <StoreItemViewActions
        item={item}
        dataUpdatedAt={dataUpdatedAt}
        deleteItem={deleteItem}
        shareItem={shareItem}
        viewItem={viewItem}
      />
    </Paper>
  );
};
