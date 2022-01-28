import { BoltOutlined, GitHub } from '@mui/icons-material';
import Btn from "components/Btn";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Features from './Features';
import HowItWorks from './HowItWorks';
import asset2 from '/public/img/asset2.svg';

const Hero = () => {

  const [starCount, setStarCount] = useState<number>()

  const fetchStarCount = () => {
    fetch("https://api.github.com/repos/blakeeriks/stylit", {
        method: "get"
      })
      .then(response => response.json())
      .then(data => {
        setStarCount(data.stargazers_count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // fetch on load once
  useEffect(() => {
    fetchStarCount();
  }, []);

  
  return (
    <div className="flex flex-col w-full p-10">
      <div className="flex flex-col md:flex-row justify-evenly items-center md:h-[66vh] min-h-[40rem] w-full ">
        <div className="w-full md:w-1/2 flex flex-col justify-center animate__animated animate__fadeInLeft min-h-[350px]">
          <div className="text-base uppercase font-bold bg-gradient-to-r from-sky-500 via-fuchsia-600 to-orange-600 text-transparent bg-clip-text">
            Hundreds of components. Open Source. Endless customization. 
          </div>
          <div className="text-5xl font-bold text-white my-3">
            The component repository you&apos;ve been looking for. 
          </div>
          <div className="text-base text-gray mt-1">
            Stylit is a growing repository of styled components that are ready to be used in your next project. Experiment with the component editor. Browse by component type, popularity, and creation time to see what&apos;s trending. We&apos;re here to make sure your designs are smooth and beautiful! 🤙
          </div>
          <div className="flex mt-2">
            <Btn className="text-lg bg-gold shine text-black border-2 border-gold">
              <Link href="/drafts" passHref>
                <div className="p-1">
                  Try Now
                  <BoltOutlined fontSize='medium'/>
                </div>
              </Link>
            </Btn>
            <Btn className="text-lg shine ml-2 border-2 border-gold" href="https://github.com/blakeeriks/stylit">
              <div className="p-1 text-gold capitalize">
                Stars {starCount}
                <GitHub className="ml-1"/>
              </div>
            </Btn>
          </div>
        </div>
        <div className="md:w-1/2 max-w-[400px] my-8 animate__animated animate__fadeInRight">
          <Image src={asset2} alt={asset2} className='opacity-95' priority/>
        </div>
      </div>
      <div className="w-full flex flex-col items-center border bg-grey-800 border-fuchsia-500 min-w-[80vw] max-w-[95vw] rounded-2xl p-5 py-10">
        <Features />
        <HowItWorks />
      </div>
    </div>
  )
}

export default Hero