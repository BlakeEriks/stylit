import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from 'components/Header';
import { Fragment, useState } from 'react';
import MetaTags from 'components/MetaTags';
import Footer from 'components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  
  const [user, setUser] = useState<object | undefined>()

  return (
    <Fragment>
      <MetaTags />
      <Header user={user} setUser={setUser}/>
      <Component {...pageProps} />
      <Footer/>
    </Fragment>
  )
}

export default MyApp
