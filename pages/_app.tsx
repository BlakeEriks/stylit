import "animate.css";
import "aos/dist/aos.css";
import Stylit from "components/Stylit";
import Modal from 'components/util/Modal';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Stylit>
        <Component {...pageProps} />
      </Stylit>
      <Modal />
      <Toaster position="bottom-right" reverseOrder={false} />
    </RecoilRoot>
  )
}

export default MyApp
