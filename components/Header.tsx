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

// Define the users props
interface IndexProps {
}

const Header = (props: IndexProps) => {
  
  const {signOut} = useSocialAuth()
  const {user} = useUserState()
  const [menu, setMenu] = useState<HTMLButtonElement | null>(null)
  const [modalState, setModalState] = useModalState()

  const onSignIn = async () => {
    setModalState({
      open: true, 
      title: "Join the Stylit Community! 💛",
      description: "We are stoked to have you. This place functions because of people like you. Sign in with any of these methods, and enjoy!",
      type: "promptLogin"
    })
    // await signInWithGithub()
    // toast.success("Signed in to 💄stylit")
  }

  const handleSignOut = async () => {
    await signOut()
    toast.success("Signed out of 💄stylit")
  }

  return (
    <div className="w-full flex justify-between items-center p-3 bg-opacity-50 bg-gray text-white border-b border-white">
      <div className="flex">
        <Link href="/" passHref>
          <div className="text-4xl font-semibold cursor-pointer  rounded-2xl pr-3 py-1 pl-1 transition-all duration-300 hover:scale-105 shine">
            <div className="logo-gradient">
              💄<span className="text-white">styl<span className="text-gold">it</span></span>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex flex-row justify-evenly w-1/2 text-lg transition-all duration-100">
        <Link href="/#how-it-works">
          <a className="hover:font-semibold cursor-pointer continuous-line">
            How It Works
          </a>
      </Link>
        <Link href="/component">
          <a className="hover:font-semibold cursor-pointer continuous-line">
            Browse
          </a>
        </Link>
        <Link href="/bookmarks">
          <a className="hover:font-semibold cursor-pointer continuous-line">
            Bookmarks
          </a>
        </Link>
        <Link href="/drafts">
          <a className="hover:font-semibold cursor-pointer continuous-line">
            Drafts
          </a>
        </Link>
      </div>
      <div className="flex flex-row justify-end">
        <Link href="/component/create">
          <a>
            <Btn className="text-gold border-2 mx-2 border-gold shine">
              Create
              <FaPlus className='ml-2'/>
            </Btn>
          </a>
        </Link>
        {user ?
          <>
            <Btn onClick={(event) => setMenu(event.currentTarget)} className="text-black bg-gold">
              <span className="rounded-full overflow-hidden mr-2 flex items-center">
                <Image src={user.photoURL} alt={user.photoURL} height={24} width={24}/>
              </span>
              {user.displayName}
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