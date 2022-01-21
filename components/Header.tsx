import AddIcon from '@mui/icons-material/Add';
import { Button, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useSocialAuth from 'utils/auth';
import { useUserState } from 'utils/user';
import Btn from './Btn';

// Define the users props
interface IndexProps {
}

const Header = (props: IndexProps) => {
  
  const {signInWithGithub, signInWithTwitter, signOut} = useSocialAuth()
  const {user} = useUserState()
  const [menu, setMenu] = useState<HTMLButtonElement | null>(null)

  const onClick = async () => {
    await signInWithGithub()
    toast.success("Signed in to 💄stylit")
  }

  const handleSignOut = async () => {
    await signOut()
    toast.success("Signed out of 💄stylit")
  }

  return (
    <div className="w-full flex justify-between items-center p-3 bg-opacity-50 bg-gray text-white border-b border-white">
      <div className="flex w-1/4">
        <Link href="/" passHref>
          <div className="text-4xl font-semibold cursor-pointer bg-white rounded-2xl pr-3 py-1 pl-1">
            <div className="logo-gradient">
              💄<span className="text-transparent">stylit</span>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex flex-row justify-evenly w-1/2 text-lg transition-all duration-100">
        <Link href="/component">
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
        <Link href="/component/create" passHref>
          <Button variant='outlined' className="text-gold border-gold hover:border-gold mx-2" endIcon={<AddIcon />}>
            Create
          </Button>
        </Link>
        {user ?
          <>
            <Btn onClick={(event) => setMenu(event.currentTarget)} className="text-black bg-gold">
              <img src={user.photoURL} alt={user.photoURL} className="h-6 rounded-full mr-2"/>
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
              <MenuItem >Published</MenuItem>
              <MenuItem onClick={() => {setMenu(null);handleSignOut()}}>Sign Out</MenuItem>
            </Menu>
          </>
          :
          <Button variant='contained' onClick={onClick} className="text-black bg-gold">
            Sign In
          </Button>
        }
      </div>
    </div>
  )
}

export default Header