import { useMediaQuery } from '@mui/material';
import device from './screenSizes';

export const useMediaQueries = () => {
  const isMobile = useMediaQuery(device.mobile);
  const isTablet = useMediaQuery(device.tablet);

  return {
    isMobile,
    isTablet,
  };
};