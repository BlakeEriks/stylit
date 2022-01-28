import { Menu, MenuItem } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';
import useSocialAuth from 'utils/auth';
import { useModalState } from 'utils/modal';
import { useUserState } from 'utils/user';
import Btn from './Btn';

const Header = () => {
  
  const {signOut} = useSocialAuth()
  const {user} = useUserState()
  const [menu, setMenu] = useState<HTMLElement | null>(null)
  const [modalState, setModalState] = useModalState()
  const [showNav, setShowNav] = useState(false)

  const links = [
    {name: "How It Works", path: "/#how-it-works"},
    {name: "Browse", path: "/component"},
    {name: "Bookmarks", path: "/bookmarks"},
    {name: "Drafts", path: "/drafts"},
  ]

  const onSignIn = async () => {
    setModalState({
      open: true, 
      title: "Join the Stylit Community! 💛",
      description: "We are stoked to have you. This place functions because of people like you. Sign in with any of these methods, and enjoy!",
      type: "promptLogin"
    })
  }

  const handleSignOut = async () => {
    await signOut()
    toast.success("Signed out of 💄stylit")
  }

  return (
    <div className="flex flex-col md:flex-row w-full justify-between items-center p-3 bg-opacity-50 bg-gray text-white border-b border-white">
      <Btn className="flex shadow-none">
        <Link href="/" passHref>
          <div className="text-4xl font-semibold cursor-pointer  rounded-2xl pr-3 py-1 pl-1 transition-all duration-300 hover:scale-105 shine">
            💄<span className="text-white">styl<span className="text-gold">it</span></span>
          </div>
        </Link>
      </Btn>
      <div className={`${showNav ? 'flex' : 'hidden'} md:flex flex-col md:flex-row justify-evenly items-center order-1 w-1/2 text-lg transition-all duration-100 mt-2`}>
        {links.map( link => (   
          <Link href={link.path} key={link.name}>
            <a className="hover:font-semibold cursor-pointer continuous-line py-1" onClick={() => setShowNav(false)}>
              {link.name}
            </a>
          </Link>
        ))}
      </div>
      <div className="flex flex-row justify-end md:order-1">
        <Btn className="rounded-md block lg:hidden md:hidden xl:hidden">
          <div
            className={`text-white duration-500 text-lg flex items-center justify-center menu-animation-hover menu-toggle ${
              showNav && "menu-toggle-active"
            }`}
            onClick={() => setShowNav(!showNav)}
          >
            <span></span>
          </div>
        </Btn>
        <Btn className="text-gold border-2 mx-2 border-gold shine">
          <Link href="/component/create">
            <div className="flex items-center">
              Create
              <FaPlus className='ml-2'/>
            </div>
          </Link>
        </Btn>
        {user ?
          <>
            <Btn onClick={(event) => setMenu(event.currentTarget)} className="text-black bg-gold shine">
              <span className="rounded-full overflow-hidden mr-2 flex items-center">
                <Image src={user.photoURL} alt={user.photoURL} height={24} width={24}/>
              </span>
              {user.displayName.split(' ')[0]}
            </Btn>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={menu}
              open={!!menu}
              onClose={() => setMenu(null)}
              transitionDuration={100}
            >
              <MenuItem onClick={() => setMenu(null)}><Link href="/published">Published</Link></MenuItem>
              <MenuItem onClick={() => {setMenu(null);handleSignOut()}}>Sign Out</MenuItem>
            </Menu>
          </>
          :
          <Btn onClick={onSignIn} className="text-black bg-gold shine">
            Sign In
          </Btn>
        }
      </div>
    </div>
  )
}

export default Header