import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from 'components/Header';
import { useState } from 'react';
import MetaTags from 'components/MetaTags';
import Footer from 'components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  
  const [user, setUser] = useState<object | undefined>()

  return (
    <div className="bg-gradient-to-b from-[#5d0d0d] via-red to-gray flex flex-col items-center">
      <MetaTags />
      <Header user={user} setUser={setUser}/>
      <Component {...pageProps} />
      <Footer/>
    </div>
  )
}

export default MyApp
