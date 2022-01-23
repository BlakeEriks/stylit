import "animate.css";
import Aos from "aos";
import "aos/dist/aos.css";
import Footer from 'components/Footer';
import Header from 'components/Header';
import MetaTags from 'components/MetaTags';
import Modal from 'components/util/Modal';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {

  useEffect( () => {
    Aos.init()
  }, [])

  return (
    <RecoilRoot>
      <div className="bg-gradient-to-bl from-pink-900 via-grey-800 to-yellow-600 flex flex-col items-center">
        <MetaTags />
        <Header />
        <Component {...pageProps} />
        <Footer/>
      </div>
      <Modal />
      <Toaster position="bottom-right" reverseOrder={false} />
    </RecoilRoot>
  )
}

export default MyApp
