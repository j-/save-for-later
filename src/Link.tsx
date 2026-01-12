import MUIButton from '@mui/material/Button';
import MUILink from '@mui/material/Link';
import { createLink } from '@tanstack/react-router';

export const Link = createLink(MUILink);
export const LinkButton = createLink(MUIButton);
