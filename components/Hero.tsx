import { BoltOutlined, GitHub } from '@mui/icons-material';
import Btn from "components/Btn";
import Image from 'next/image';
import { useEffect, useState } from 'react';
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
    <div className="flex items-center text-6xl h-2/3 min-h-[40rem] w-full p-10">
      <div className="w-1/2 flex flex-col">
        <div className="text-base uppercase font-bold bg-gradient-to-r from-sky-500 via-fuchsia-600 to-orange-600 text-transparent bg-clip-text">
          Hundreds of components. Open Source. Endless customization. 
        </div>
        <div className="text-5xl font-bold text-white my-1">
          The component repository you've been looking for. 
        </div>
        <div className="text-base text-gray mt-1">
          Stylit is a growing repository of styled components that are ready to be used in your next project. Experiment with the component editor. Browse by component type, popularity, and creation time to see what's trending. We're here to make sure your designs are smooth and beautiful! 🤙
        </div>
        <div className="flex mt-2">
          <Btn className="text-lg bg-gold shine">
            <div className="p-1">
              Try Now
              <BoltOutlined fontSize='medium'/>
            </div>
          </Btn>
          <a href="https://github.com/blakeeriks/stylit" target="_blank">
            <Btn className="text-lg shine ml-2 border-2 border-gold">
              <div className="p-1 text-gold">
                Stars {starCount}
                <GitHub color='secondary' className="ml-1"/>
              </div>
            </Btn>
          </a>
        </div>
      </div>
      <div className="w-1/2">
        {/* 1996 × 1358 pixels */}
        <Image src={asset2} height={680} width={1000} className='opacity-95'/>
      </div>
    </div>
  )
}

export default Hero