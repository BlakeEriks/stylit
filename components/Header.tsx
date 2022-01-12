import Link from 'next/link';
import useSocialAuth from 'utils/auth';

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
    <div className="w-full flex justify-between p-5">
      <div className="text-4xl font-semibold">
        Stylit💄
      </div>
      <Link href="/component">
        Browse
      </Link>
      <Link href="/component/create">
        Create Component
      </Link>
      <button onClick={onClick} className="bg-red-500 rounded-lg px-2">
        Sign in
      </button>
    </div>
  )
}

export default Header