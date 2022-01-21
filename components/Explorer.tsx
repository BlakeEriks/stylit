/** @jsxImportSource @emotion/react */
import { Interpolation, Theme } from "@emotion/react";
import { useEffect, useState } from "react";
import { ComponentType, PublishedComponent } from "utils/types";
import ExploreHeader from "./ExploreHeader";
var _ = require('lodash');

// const Explorer = ({url}: {url: string}) => {
const Explorer = () => {

  const [components, setComponents] = useState<PublishedComponent[]>([])
  const [filter, setFilter] = useState<{[index in ComponentType]: boolean}>({
    [ComponentType.Button]: true,
    [ComponentType.Input]: true,
    [ComponentType.Card]: true
  })
  const [loading, setLoading] = useState(false)

  useEffect( () => {
    const fetchComponents = async () => {
      const types = _.values(_.mapValues(_.pickBy(filter, _.isTruthy), (value: boolean, key: ComponentType) => ComponentType[key] ) ).join(',')
      // return await fetch(url + `/components?type=${types}`)
      return await fetch(`/api/components?type=${types}`)
    }

    setLoading(true)
    fetchComponents().then( res => res.json())
      .then(components => {
        setComponents(components)
        setLoading(false)
      })
  },[filter])

  return (
    <div className="flex items-center flex-col p-8 w-full bg-offWhite overflow-auto">
      <ExploreHeader filter={filter} setFilter={setFilter}/>

      {/* MAPPING OVER THE COMPONENTS */}
      <div className="flex flex-row flex-wrap justify-evenly">
        {components.map(component => (
          <div key={component._id} className="component-card transition-all duration-150 ease-linear hover:scale-105 group">
            <div className="text-center text-lg text-grey-600 group-hover:font-bold shadow-sm w-full">
              {component.name}
            </div>
            <div className="component-container ">
              {ComponentType[component.type] === ComponentType[ComponentType.Button] && 
                <button
                  css={component.stylesMap as Interpolation<Theme>}
                >
                  Button
                </button>
              }
              {ComponentType[component.type] === ComponentType[ComponentType.Input] && 
                <input
                  className="min-w-0"
                  maxLength={10}
                  css={component.stylesMap as Interpolation<Theme>} 
                  placeholder="input..." 
                />
              }
              {ComponentType[component.type] === ComponentType[ComponentType.Card] && 
                <div 
                  css={component.stylesMap as Interpolation<Theme>}
                  className="card"
                >
                  Card
                </div>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Explorer