import Link from "next/link"
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi"
import Btn from "./Btn"

const Footer = () => {

  const links = [
    {name: "How It Works", path: "/#how-it-works"},
    {name: "Browse", path: "/component"},
    {name: "Bookmarks", path: "/bookmarks"},
    {name: "Drafts", path: "/drafts"},
  ]

  return (
    <div className="w-full flex flex-col lg:flex-row justify-between p-2 bg-gradient-to-r from-pink-600 via-sky-600 to-fuchsia-600 px-10 border-t-2 border-white">
      <div className="flex justify-center items-center text-white font-semibold text-xl">
        <div className="pt-2">
          Created by Blake Eriks
        </div>
        <Btn className="bg-[#0a66c2] mx-2 shine" href="https://www.linkedin.com/in/blake-eriks/">
          <FiLinkedin />
        </Btn>
        <Btn className="bg-sky-500 mx-2 shine" href="https://twitter.com/be_lockay">
          <FiTwitter />
        </Btn>
        <Btn className="bg-grey-600 mx-2 shine" href="https://github.com/BlakeEriks">
          <FiGithub />
        </Btn>
      </div>
      <div className="flex justify-center items-center">
        {links.map( link => (   
          <Link href={link.path} key={link.name}>
            <a className="text-white hover:font-semibold cursor-pointer py-1 mx-2">
              {link.name}
            </a>
          </Link>
        ))}
        <Btn className="flex shadow-none">
          <Link href="/" passHref>
            <div className="text-4xl font-semibold cursor-pointer  rounded-2xl pr-3 py-1 pl-1 transition-all duration-300 hover:scale-105 shine">
              💄<span className="text-white">styl<span className="text-gold">it</span></span>
            </div>
          </Link>
        </Btn>
      </div>
    </div>
  )
}

export default Footer