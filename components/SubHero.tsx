import { GitHub, Twitter } from "@mui/icons-material"
import Btn from "./Btn"

const SubHero = () => {
  return (
    <div className="flex justify-center w-full p-10 diagonal-bg bg-opacity-80  border-white">
      <div className="p-4 rounded-lg bg-grey-600 flex flex-col items-center text-xl">
        <div className="text-4xl font-semibold">
          💄<span className="text-white">styl<span className="text-gold">it</span></span>
        </div>
        <div className="text-grey-200 font-normal max-w-[50vw] text-sm p-2">
          Introducing Stylit, the mega repository of CSS styled components ready to be dropped into your projects. Stylit consists of 100+ customized creations from tons of talented developers. Select the component type you&apos;re looking for, filtering by popularity or creation, try out dark mode, publish new components for the world to see, and much more! Stylit is as awesome as people like you make it. 🤙 
        </div>
        <div className="flex">
          <Btn className="text-lg bg-gold shine text-black border-2 border-gold" href="https://github.com/blakeeriks/stylit">
              <div>
                Read Blog
              </div>
          </Btn>
          <Btn className="text-lg shine border-2 border-gold ml-2" href="https://github.com/blakeeriks/stylit">
            <div className=" text-gold">
              Stars 1
              <GitHub className="ml-1"/>
            </div>
          </Btn>
          <Btn className="text-lg shine border-2 bg-sky-500 border-sky-500 ml-2" href="https://twitter.com/intent/tweet?text=Checkout%20%F0%9F%92%84stylit%20from%20%40be_lockay%20and%20browse%20more%20than%20100%20styled%20components%2C%20ready%20to%20be%20used%20in%20your%20next%20project!%20%F0%9F%8F%84%20%0A%0A%23DevCommunity%0A%0A&url=stylit.netlify.app">
            <div className=" text-white">
              Share
              <Twitter className="ml-1"/>
            </div>
          </Btn>
        </div>
      </div>
    </div>
  )
}

export default SubHero