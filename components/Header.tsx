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
  const [menu, setMenu] = useState<HTMLButtonElement | null>()

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
      <Link href="/" passHref>
        <div className="text-4xl font-semibold cursor-pointer bg-white rounded-2xl pr-3 py-1 pl-1">
          <div className="logo-gradient">
            💄<span className="text-transparent">stylit</span>
          </div>
        </div>
      </Link>
      <Link href="/component">
        How It Works
      </Link>
      <Link href="/component">
        Browse
      </Link>
      <Link href="/bookmarks">
        Bookmarks
      </Link>
      <Link href="/drafts">
        Drafts
      </Link>
      <Link href="/component/create" passHref>
        <Button variant='outlined' className="text-gold border-gold hover:border-gold" endIcon={<AddIcon />}>
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
          >
            <MenuItem >Published</MenuItem>
            <MenuItem onClick={() => handleSignOut()}>Sign Out</MenuItem>
          </Menu>
        </>
        :
        <Button variant='contained' onClick={onClick} className="text-black bg-gold">
          Sign In
        </Button>
      }
    </div>
  )
}

export default Header