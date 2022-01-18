/** @jsxImportSource @emotion/react */
import { Interpolation, Theme } from "@emotion/react"
import { useEffect, useState } from "react"
import { Component, ComponentType } from "utils/types"
import ExploreHeader from "./ExploreHeader"

const Explorer = ({url}: {url: string}) => {

  const [components, setComponents] = useState<Component[]>([])
  const [filter, setFilter] = useState({
    button: true,
    input: true,
    card: true
  })
  const [loading, setLoading] = useState(false)

  useEffect( () => {
    const fetchComponents = async () => {
      if (Object.entries(filter).filter(type => type[1]).length === 0) return {json: () => []}
      return await fetch(url + `/components?type=${Object.entries(filter).filter(type => type[1]).map( (type,index) => index).join(',')}`)
    }

    setLoading(true)
    fetchComponents().then( res => res.json())
      .then(components => {
        setComponents(components)
        setLoading(false)
      })
  },[filter])

  return (
    <div className="flex items-center flex-col p-4 w-full bg-offWhite">
      <ExploreHeader filter={filter} setFilter={setFilter}/>

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