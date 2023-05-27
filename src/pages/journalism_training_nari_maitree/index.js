import PropTypes from 'prop-types';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Box, Container, Divider, Fab, Stack, Typography } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// layouts
import MainLayout from '../../layouts/main';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import { CustomAvatar } from '../../components/custom-avatar';
import Iconify from '../../components/iconify';
// utils
import { fDate } from '../../utils/formatTime';

// ----------------------------------------------------------------------

ParticipantsPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

ParticipantsPage.propTypes = {
  _participants: PropTypes.arrayOf(PropTypes.object),
};

export default function ParticipantsPage({ _participants }) {
  const { push } = useRouter();
  const isMobile = useResponsive('down', 'md');

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
            heading="List of Participants"
            links={[
              {
                name: 'Aimattro',
                href: 'https://www.aimattro.com',
              },
              {
                name: 'Certificate',
                href: '/',
              },
              {
                name: 'Journalism Training - Nari Maitree',
                href: '/journalism_training_nari_maitree/',
              },
              { name: 'Participants' },
            ]}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }} maxWidth="md">
        <Typography variant="subtitle2" align="center">Find your name and click on “View Certificate”</Typography>
        <Box
          sx={{
            background: (theme) => theme.palette.background.neutral,
            borderRadius: 4,
            p: 4,
            mt: 4,
          }}
        >
          <Stack
            spacing={isMobile ? 4 : 2}
            divider={<Divider />}
          >
            {
              _participants.map(participant => (
                <Stack key={participant.id} direction={isMobile ? "column" : "row"} alignItems={isMobile ? "left" : "center"} spacing={2} justifyContent="space-between">
                  <Stack direction="row" alignItems="center" spacing={2} width={isMobile ? "100%" : "30%"}>
                    <CustomAvatar key="default" color="default" sx={{ width: 48, height: 48 }}>
                      <Iconify icon="carbon:ibm-cloud-for-education" width={24} />
                    </CustomAvatar>
                    <Typography variant="subtitle1">{participant.name} ({participant.age})</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {
                      isMobile &&
                      <Iconify icon="mdi:phone" width={24} sx={{ color: 'primary.main' }} />
                    }
                    <Typography variant="body1">{`${participant.mobile.slice(0, 3)}****${participant.mobile.slice(-4)}`}</Typography>
                  </Stack>

                  <Fab variant="extended" onClick={() => push(`/journalism_training_nari_maitree/${participant.id}`)}>
                    <Iconify icon="mdi:certificate-outline" width={24} />
                    View Certificate
                  </Fab>
                </Stack>
              ))
            }
          </Stack>
        </Box>
      </Container>
    </>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://www.aimattro.com/certificate/data.json`);
  const _participants = await res.json();
 
  // Pass data to the page via props
  return { props: { _participants } };
}