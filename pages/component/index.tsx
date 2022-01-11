import { Component } from "../../utils/types"
import Link from "next/link"

// Define the components props
interface IndexProps {
  components: Component[]
}

// define the page component
function Index(props: IndexProps) {
  const { components } = props

  return (
    <div>
      <h1>The Component List</h1>
      <h2>Click On Component to see it individually</h2>
      {/* MAPPING OVER THE COMPONENTS */}
      {components.map(component => (
        <div key={component._id}>
          <Link href={`/component/${component._id}`}>
            <h3 style={{ cursor: "pointer" }}>
              {component.type} - {component.likes.count}
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
  const res = await fetch(process.env.API_URL as string)
  const components = await res.json()

  // return props
  return {
    props: { components },
  }
}

export default Index