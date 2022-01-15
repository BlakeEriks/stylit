import { Button } from '@mui/material';
import Link from 'next/link';
import useSocialAuth from 'utils/auth';
import AddIcon from '@mui/icons-material/Add';

// Define the users props
interface IndexProps {
  user: any
  setUser: Function
}

const Header = (props: IndexProps) => {
  
  const {signInWithGithub} = useSocialAuth()

  const onClick = async () => {
    const res = await signInWithGithub()
    console.log(res)
    props.setUser(res)
  }

  return (
    <div className="w-full flex justify-between items-center p-5 bg-opacity-50 bg-gray text-white border-b border-white">
      <Link href="/" passHref>
        <div className="text-4xl font-semibold cursor-pointer">
          stylit💄
        </div>
      </Link>
      <Link href="/component">
        Browse
      </Link>
      <Link href="/component">
        How It Works
      </Link>
      <Link href="/component/create" passHref>
        <Button variant='outlined' className="text-gold border-gold hover:border-gold" endIcon={<AddIcon />}>
          New Component
        </Button>
      </Link>
      <Button variant='contained' onClick={onClick} className="text-black bg-gold">
        Sign in
      </Button>
    </div>
  )
}

export default Header