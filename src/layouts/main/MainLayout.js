import PropTypes from 'prop-types';
// next
import dynamic from 'next/dynamic';
// @mui
import { Box } from '@mui/material';
//
const Header = dynamic(() => import('./Header'), { ssr: false });
const Footer = dynamic(() => import('./Footer'), { ssr: false });

// ----------------------------------------------------------------------

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default function MainLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 8, md: 11 },
        }}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  );
}
