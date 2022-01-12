import { User } from "../../utils/types"
import Link from "next/link"

// Define the users props
interface IndexProps {
  users: User[]
}

// define the page component
const Index = ({users}: IndexProps) => {
  console.log(users + " in user index page")
  return (
    <div>
      <h1>The Component List</h1>
      <h2>Click On Component to see it individually</h2>
      <Link href="/component/create" passHref><button>Create a New Todo</button></Link>
      {/* MAPPING OVER THE COMPONENTS */}
      {users?.map( user => (
        <div key={user._id}>
          <Link href={`/component/${user._id}`} passHref>
            <h3 style={{ cursor: "pointer" }}>
              {JSON.stringify(user)}
            </h3>
          </Link>
        </div>
      ))}
    </div>
  )
}

// GET PROPS FOR SERVER SIDE RENDERING
export async function getServerSideProps() {
  // get component data from API
  const res = await fetch( (process.env.API_URL + "/users") as string)
  const users = await res.json()
  console.log(users)

  // return props
  return {
    props: { users },
  }
}

export default Index