import { useTheme, useMediaQuery } from '@mui/material';

export interface useScreenWidthResult {
  isWideScreen: boolean;
  isMobileScreen: boolean;
}

export const useScreenWidth = () => {
  const theme = useTheme();

  const isWideScreen = useMediaQuery(theme.breakpoints.up('md'));
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return {
    isWideScreen,
    isMobileScreen,
  };
};
