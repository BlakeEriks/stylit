import { BoltOutlined } from "@mui/icons-material"
import Link from "next/link"
import Btn from "./Btn"

const HowItWorks = () => {
  return (
    <div className="flex flex-col w-full p-10 pb-0" data-aos="fade-left" id="how-it-works">
      <div className="flex w-full flex-start">
        <div className="text-2xl uppercase font-bold bg-gradient-to-r from-sky-400 to-fuchsia-700 text-transparent bg-clip-text">
          How it works
        </div>
      </div>
      <div className="flex w-full justify-between text-white items-start">
        <div className="flex flex-col items-start pr-2">
          <div className="text-2xl my-4 font-semibold space-y-2">
            <div>
              3 Easy Steps. Endless Customizations.
            </div>
            <div>
              Let&apos;s get you started! 🏄
            </div>
            <Link href="/drafts">
              <a>
                <Btn className="text-lg bg-gold shine text-black mt-3">
                    <div className="p-1">
                      Try Now
                      <BoltOutlined fontSize='medium'/>
                    </div>
                </Btn>
              </a>
            </Link>
          </div>
        </div>
        <div className="flex flex-col w-1/5">
          <div className="flex w-full items-center">
            <div className="uppercase text-xl font-semibold text-gold">
              Step 1
            </div>
            <div className="flex-grow bg-white h-[1px] mx-2"></div>
          </div>
          <div className="text-lg py-4">
            Sign in to Stylit using either Github or Twitter.
          </div>
        </div>
        <div className="flex flex-col w-1/5">
          <div className="flex w-full items-center">
            <div className="uppercase text-xl font-semibold text-gold">
              Step 2
            </div>
            <div className="flex-grow bg-white h-[1px] mx-2"></div>
          </div>
          <div className="text-lg py-4">
            Head over to the 
            <Link
              href="/drafts" 
            >
              <a className="font-bold bg-gradient-to-r from-orange-400 to-fuchsia-700 text-transparent bg-clip-text">{" "}drafts{" "}</a>
            </Link>
            dashboard to create your first component.
          </div>
        </div>
        <div className="flex flex-col w-1/5">
          <div className="flex w-full items-center">
            <div className="uppercase text-xl font-semibold text-gold">
              Step 3
            </div>
            <div className="flex-grow bg-white h-[1px] mx-2"></div>
          </div>
          <div className="text-lg py-4">
            Publish the component and show off your skills to the Stylit community!
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks