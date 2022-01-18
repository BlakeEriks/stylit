import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from 'components/Header';
import { useState } from 'react';
import MetaTags from 'components/MetaTags';
import Footer from 'components/Footer';
import { createTheme, ThemeProvider } from '@mui/material';

function MyApp({ Component, pageProps }: AppProps) {
  
  const [user, setUser] = useState<object | undefined>()
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
    <ThemeProvider theme={theme}>
      <div className="bg-gradient-to-b from-[#5d0d0d] via-red to-gray flex flex-col items-center">
        <MetaTags />
        <Header user={user} setUser={setUser}/>
        <Component {...pageProps} />
        <Footer/>
      </div>
    </ThemeProvider>
  )
}

export default MyApp
