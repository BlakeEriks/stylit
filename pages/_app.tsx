import { createTheme, ThemeProvider } from '@mui/material';
import Footer from 'components/Footer';
import Header from 'components/Header';
import MetaTags from 'components/MetaTags';
import Modal from 'components/util/Modal';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  
  const theme = createTheme({
    palette: {
      primary: {
        main: '#db2438'
      },
      secondary: {
        main: '#f5ba31'
      }
    }
  })

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <div className="bg-gradient-to-bl from-pink-900 via-grey-800 to-yellow-600 flex flex-col items-center">
          <MetaTags />
          <Header />
          <Component {...pageProps} />
          <Footer/>
        </div>
        <Modal />
        <Toaster position="bottom-right" reverseOrder={false} />
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default MyApp
