import { Component, ComponentType } from "utils/types"
import Link from "next/link"

// Define the components props
interface IndexProps {
  components: Component[]
}

const components = [
  <button key="0"></button>,
  <input key="1"></input>,
  <div key="2"></div>
]

// define the page component
const Index = (props: IndexProps) => {
  const { components } = props

  return (
    <div>
      <h1>The Component List</h1>
      <h2>Click On Component to see it individually</h2>
      <br/>
      <Link href="/component/create" passHref><button>Create a New Component</button></Link>
      {/* MAPPING OVER THE COMPONENTS */}
      <div className="border flex flex-row">
      {components.map(component => (
        <div key={component._id} className="w-44 h-44 flex justify-center items-center border">
          {/* <Link href={`/component/${component._id}`} passHref> */}
              {ComponentType[component.type] === "Button" && 
                <button style={component.styles}>Button</button>
              }
              {ComponentType[component.type] === "Input" && 
                <input style={component.styles} placeholder="input..."></input>
              }
              {ComponentType[component.type] === "Card" && 
                <button style={component.styles}></button>
              }
          {/* </Link> */}
        </div>
      ))}
      </div>
    </div>
  )
}

// GET PROPS FOR SERVER SIDE RENDERING
export async function getServerSideProps() {
  // get component data from API
  const res = await fetch(process.env.API_URL + "/components" as string)
  console.log(res)
  const components = await res.json()

  // return props
  return {
    props: { components },
  }
}

export default Index