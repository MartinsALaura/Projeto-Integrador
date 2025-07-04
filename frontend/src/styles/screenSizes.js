const size = {
  mobile: '480px',
  tablet: '992px',
  laptop: '1024px'
};

export const device = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`
};

export default device;