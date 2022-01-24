/** @jsxImportSource @emotion/react */
import { Interpolation, Theme } from "@emotion/react";
import { BookmarkBorderOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { ComponentType, PublishedComponent } from "utils/types";
import { useUserState } from "utils/user";
import ExploreHeader from "./ExploreHeader";
var _ = require('lodash');

const Explorer = () => {

  const [components, setComponents] = useState<PublishedComponent[]>([])
  const [filter, setFilter] = useState<{[index in ComponentType]: boolean}>({
    [ComponentType.Button]: true,
    [ComponentType.Input]: true,
    [ComponentType.Card]: true
  })
  const [loading, setLoading] = useState(false)
  const [likedComponents, setLikedComponentes] = useState<string[]>([])
  const {user} = useUserState()

  useEffect( () => {
    const fetchComponents = async () => {
      const types = _.values(_.mapValues(_.pickBy(filter, _.isTruthy), (value: boolean, key: ComponentType) => ComponentType[key] ) ).join(',')
      return await fetch(`/api/components?type=${types}`)
    }

    setLoading(true)
    fetchComponents().then( res => res.json())
      .then(components => {
        setComponents(components)
        setLoading(false)
      })
  },[filter])

  useEffect(() => {
    if (window.localStorage.getItem("likes")) {
      setLikedComponentes(JSON.parse(window.localStorage.getItem("likes")!))
    }
  }, [])

  const updateLikes = (component: PublishedComponent) => {

  }

  const toggleLike = (componentId: string) => {
    let newLikes: string[] = []
    if (likedComponents.some(liked => liked === componentId)) {
      newLikes = [...likedComponents.filter(liked => liked !== componentId)]
    }
    else {
      newLikes = [...likedComponents, componentId]
    }
    setLikedComponentes(newLikes)
    window.localStorage.setItem("likes", JSON.stringify(newLikes))
  }

  return (
    <div className="flex items-center flex-col p-8 w-full bg-offWhite overflow-auto">
      <ExploreHeader filter={filter} setFilter={setFilter}/>

      {/* MAPPING OVER THE COMPONENTS */}
      <div className="flex flex-row flex-wrap justify-evenly">
        {components.map(component => (
          <div key={component._id} className="component-card transition-all duration-150 ease-linear hover:scale-105 group relative">
            <div className="text-center text-lg text-black  w-full">
              {component.name}
            </div>
            <div className="component-container flex-col shadow-inner">
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
            <div className="flex justify-end w-full absolute -bottom-2.5 opacity-0 group-hover:opacity-100 group-hover:bottom-2 transition-all duration-200">
              <div className="w-11/12 flex flex-col items-end bg-white border-t border-l border-opacity-60 bg-opacity-90 pt-2 px-4 rounded-tl-full text-grey-500 ">
                <div className="font-semibold flex items-center">
                  <span 
                    className="text-pink-400 text-xl cursor-pointer rounded-full mb-1 mr-1 p-1 hover:bg-grey-200 transition-all duration-100" 
                    onClick={() => toggleLike(component._id!)}
                  >
                    {likedComponents.includes(component._id || '') ?
                      <FaHeart className="animate__animated animate__heartBeat"/>
                    :
                      <FiHeart />
                    }
                  </span>
                  <span className="flex items-center">
                    {component.likes} likes
                  </span>
                </div>
                <div className="text-sm text-center">
                  Created by {component.creatorId.displayName}
                </div>
              </div>
            </div>
            <div className="absolute top-10 left-4 rounded-full border p-2 text-lg opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer">
              <BookmarkBorderOutlined />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Explorer