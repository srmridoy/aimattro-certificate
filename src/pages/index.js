// next
import Head from 'next/head';
// @mui
import { Box, Container } from '@mui/material';
// _mock
import _mock from '../_mock';
// layouts
import MainLayout from '../layouts/main';
// components
import CustomBreadcrumbs from '../components/custom-breadcrumbs';
// sections
import {
  CarouselCenterMode,
} from '../sections/_examples/extra/carousel';

// ----------------------------------------------------------------------

const _carouselsExample = [{
  id: _mock.id(0),
  title: "Journalism Training - Nari Maitree",
  image: "https://www.aimattro.com/wp-content/uploads/2022/11/image.jpg",
}];

// ----------------------------------------------------------------------

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Head>
        <title> Aimattro Certificates </title>
      </Head>

      <Box
        sx={{
          pt: 6,
          pb: 1,
          bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'),
        }}
      >
        <Container>
          <CustomBreadcrumbs
            heading="List of Traning Programs"
            links={[
              {
                name: 'Aimattro',
                href: 'https://www.aimattro.com',
              },
              {
                name: 'Certificate',
                href: '/',
              },
              { name: 'Training Programs' },
            ]}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <CarouselCenterMode data={_carouselsExample} />
      </Container>
    </>
  );
}