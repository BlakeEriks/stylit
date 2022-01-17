/** @jsxImportSource @emotion/react */
import { Interpolation, Theme } from "@emotion/react"
import Link from "next/link"
import { Component, ComponentType } from "utils/types"
import ExploreHeader from "./ExploreHeader"

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
              <button 
                css={component.styles as Interpolation<Theme>}
              >
                Button
              </button>
            }
            {ComponentType[component.type] === "Input" && 
              <input 
                css={component.styles as Interpolation<Theme>} 
                placeholder="input..." 
              />
            }
            {ComponentType[component.type] === "Card" && 
              <div 
                css={component.styles as Interpolation<Theme>}
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