import Link from "next/link"
import { Component, ComponentType } from "utils/types"
import ExploreHeader from "./ExploreHeader"

const components = [
  <button key="0"></button>,
  <input key="1"></input>,
  <div key="2"></div>
]

const Explorer = ({components}: {components: Component[]}) => {
  return (
    <div className="w-full bg-offWhite">
      <ExploreHeader />

      <Link href="/component/create" passHref><button>Create a New Component</button></Link>
      {/* MAPPING OVER THE COMPONENTS */}
      <div className="border flex flex-row flex-wrap justify-center">
        {components.map(component => (
          <div key={component._id} className="component-container m-3 border">
            {ComponentType[component.type] === "Button" && 
              <button style={component.styles}>Button</button>
            }
            {ComponentType[component.type] === "Input" && 
              <input style={component.styles} placeholder="input..."></input>
            }
            {ComponentType[component.type] === "Card" && 
              <div 
                style={component.styles}
                className="card"
              >
                Card
              </div>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default Explorer