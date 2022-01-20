/** @jsxImportSource @emotion/react */
import { Interpolation, Theme } from "@emotion/react";
import { useEffect, useState } from "react";
import { ComponentType, PublishedComponent } from "utils/types";
import ExploreHeader from "./ExploreHeader";
var _ = require('lodash');

const Explorer = ({url}: {url: string}) => {

  const [components, setComponents] = useState<PublishedComponent[]>([])
  const [filter, setFilter] = useState<{[index in ComponentType]: boolean}>({
    [ComponentType.Button]: true,
    [ComponentType.Input]: true,
    [ComponentType.Card]: true
  })
  const [loading, setLoading] = useState(false)

  useEffect( () => {
    const fetchComponents = async () => {
      // console.log( _.pickBy(filter, _.isTruthy) )
      const types = _.values(_.mapValues(_.pickBy(filter, _.isTruthy), (value: boolean, key: ComponentType) => ComponentType[key] ) ).join(',')
      // if (Object.entries(filter).filter(type => type[1]).length === 0) return {json: () => []}
      console.log(`/components?type=${types}`)
      return await fetch(url + `/components?type=${types}`)
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
                css={component.stylesMap as Interpolation<Theme>}
              >
                Button
              </button>
            }
            {ComponentType[component.type] === "Input" && 
              <input 
                css={component.stylesMap as Interpolation<Theme>} 
                placeholder="input..." 
              />
            }
            {ComponentType[component.type] === "Card" && 
              <div 
                css={component.stylesMap as Interpolation<Theme>}
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