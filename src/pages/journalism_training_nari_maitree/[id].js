import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
// react
import { useEffect, useState } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Box, Button, Container, Stack } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// layouts
import MainLayout from '../../layouts/main';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import LoadingScreen from '../../components/loading-screen';
// sections
import Iconify from '../../components/iconify';
import Image from '../../components/image/Image';
import { useSnackbar } from '../../components/snackbar';

// ----------------------------------------------------------------------

ParticipantsPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

ParticipantsPage.propTypes = {
  _participants: PropTypes.arrayOf(PropTypes.object),
};

export default function ParticipantsPage({ _participants }) {
  const { replace, query } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useResponsive('down', 'md');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (_participants.filter(participant => participant.id === query.id).length < 1) {
      replace('/404');
    } else {
      setLoading(false);
    }
  }, [_participants, replace, query.id]);

  const participant = _participants.filter(p => p.id === query.id)[0];

  const handleCopy = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL)
      .then(() => {
        enqueueSnackbar('URL copied to clipboard');
      })
      .catch((error) => {
        enqueueSnackbar('Error copying URL to clipboard', { variant: 'error' });
      });
  };

  const handleDownloadPDF = () => {
    const pdfUrl = `/download/${participant.id}.pdf`;
    const filename = pdfUrl.substring(pdfUrl.lastIndexOf('/') + 1);
    saveAs(pdfUrl, filename);
  };

  const handleDownloadImage = () => {
    const imageUrl = `/download/${participant.id}.jpg`;
    const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    saveAs(imageUrl, filename);
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer.php?u=${window.location.href}`);
  };

  const handleShareInstagram = () => {
    handleCopy();
    enqueueSnackbar('Post the URL on your instagram story.');
  };

  const handleShareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`);
  };

  const handleShareLinkedIn = () => {
    window.open(`https://www.linkedin.com/shareArticle?url=${window.location.href}`);
  };

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <>
      <Head>
        <title> Certificate of {participant.name} </title>
        <meta property="og:title" content={`Certificate of ${participant.name}`} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={`https://www.aimattro.com/download/${participant.id}.jpg`} />
        <meta property="og:type" content="website" />
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
            heading={`Certificate of ${participant.name}`}
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
              { name: participant.name },
            ]}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10, textAlign: 'center' }} maxWidth="lg">
        <Image 
          src={`/download/${participant.id}.jpg`} 
          sx={{ 
            borderWidth: (theme) => theme.spacing(0.5),
            borderStyle: 'solid',
            borderColor: (theme) => theme.palette.grey[700],
            borderRadius: (theme) => theme.spacing(3)
          }} />
        <Stack direction={isMobile ? 'column' : 'row'} justifyContent="center" sx={{ mt: 5 }} spacing={2}>
          <Button variant="soft" size="large" color="warning" startIcon={<Iconify icon="bxs:file-pdf" width={24} />} onClick={handleDownloadPDF}>
            Download PDF
          </Button>
          <Button variant="soft" size="large" color="success" startIcon={<Iconify icon="material-symbols:download" width={24} />} onClick={handleDownloadImage}>
            Download Image
          </Button>
        </Stack>
        <Stack direction={isMobile ? 'column' : 'row'} justifyContent="center" sx={{ mt: 2 }} spacing={isMobile ? 2 : 2}>
          <Button variant="soft" size="large" color="info" startIcon={<Iconify icon="logos:facebook" width={24} />} onClick={handleShareFacebook}>
            Share on Facebook
          </Button>
          <Button variant="soft" size="large" color="error" startIcon={<Iconify icon="skill-icons:instagram" width={24} />} onClick={handleShareInstagram}>
            Share on Instagram
          </Button>
          <Button variant="soft" size="large" color="info" startIcon={<Iconify icon="logos:twitter" width={24} />} onClick={handleShareTwitter}>
            Share on Twitter
          </Button>
          <Button variant="soft" size="large" color="info" startIcon={<Iconify icon="logos:linkedin-icon" width={24} />} onClick={handleShareLinkedIn}>
            Share on LinkedIn
          </Button>
        </Stack>
        <Button onClick={handleCopy} variant="contained" color="primary" startIcon={<Iconify icon="material-symbols:link" width={24} />} sx={{ mt: 5 }}>
          Copy link
        </Button>
      </Container>
    </>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://www.aimattro.com/data.json`);
  const _participants = await res.json();
 
  // Pass data to the page via props
  return { props: { _participants } };
}
 