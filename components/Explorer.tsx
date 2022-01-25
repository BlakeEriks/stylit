/** @jsxImportSource @emotion/react */
import { Interpolation, Theme } from "@emotion/react";
import { Bookmark, BookmarkBorderOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { ComponentType, PublishedComponent } from "utils/types";
import { useUserState } from "utils/user";
import ExploreHeader from "./ExploreHeader";
var _ = require('lodash');

const Explorer = () => {

  const [components, setComponents] = useState<PublishedComponent[]>([])
  const [componentType, setComponentType] = useState<ComponentType>(ComponentType.Button)
  const [sort, setSort] = useState<string>("Popular")
  const [loading, setLoading] = useState(false)
  const [likedComponents, setLikedComponentes] = useState<string[]>([])
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const {user} = useUserState()

  const sortComponents = (components: PublishedComponent[]) => {
    if (sort === "Popular") {
      return components.sort((a,b) => b.likes - a.likes)
    }
    if (sort === "Newest") {
      console.log('sorting newesst')
      return components.sort( (a,b) => new Date(b.createdAt!).getTime() -  new Date(a.createdAt!).getTime() )
    }
    if (sort === "Oldest") {
      console.log('sorting oldest')
      return components.sort( (a,b) => new Date(a.createdAt!).getTime() -  new Date(b.createdAt!).getTime())
    }
    return components
  }

  useEffect( () => {
    const fetchComponents = async () => {
      return await fetch(`/api/components?type=${componentType}`)
    }

    setLoading(true)
    fetchComponents().then( res => res.json())
      .then(components => {
        const sortedComponents = sortComponents(components)
        console.log(sortedComponents)
        setComponents(sortedComponents)
        setLoading(false)
      })
  },[componentType, sort])

  useEffect(() => {
    if (window.localStorage.getItem("likes")) {
      setLikedComponentes(JSON.parse(window.localStorage.getItem("likes")!))
    }
    if (window.localStorage.getItem("bookmarks")) {
      setBookmarks(JSON.parse(window.localStorage.getItem("bookmarks")!))
    }
  }, [])

  const updateLikes =  (componentId: String, like: number) => {
    const index = components.findIndex(component => component._id === componentId)
    const newComponent = {...components[index]} as PublishedComponent
    newComponent.likes! += like
    fetch(`api/components/${componentId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComponent),
    })
    setComponents([...components.slice(0, index), newComponent, ...components.slice(index+1)])
  }

  const toggleLike = (componentId: string) => {
    let newLikes: string[] = []
    if (likedComponents.some(liked => liked === componentId)) {
      newLikes = [...likedComponents.filter(liked => liked !== componentId)]
      updateLikes(componentId, -1)
    }
    else {
      newLikes = [...likedComponents, componentId]
      updateLikes(componentId, 1)
    }
    setLikedComponentes(newLikes)
    window.localStorage.setItem("likes", JSON.stringify(newLikes))
  }
  
  const toggleBookmark = (componentId: string) => {
    let newBookmarks: string[] = []
    if (bookmarks.some(bookmark => bookmark === componentId)) {
      newBookmarks = [...bookmarks.filter(bookmark => bookmark !== componentId)]
    }
    else {
      newBookmarks = [...bookmarks, componentId]
    }
    setBookmarks(newBookmarks)
    window.localStorage.setItem("bookmarks", JSON.stringify(newBookmarks))
  }

  return (
    <div className="flex items-center flex-col p-8 w-full bg-offWhite overflow-auto">
      <ExploreHeader 
        componentType={componentType}
        setComponentType={setComponentType}
        sort={sort}
        setSort={setSort}
      />

      {/* MAPPING OVER THE COMPONENTS */}
      <div className="flex flex-row flex-wrap justify-evenly">
        {components.map(component => (
          <div key={component._id} className="component-card transition-all duration-150 ease-linear hover:scale-105 group relative border border-grey-400">
            {/* <div className="text-center text-lg text-black  w-full">
              {component.name}
            </div> */}
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
            <div className="flex flex-col justify-center w-full border-t border-grey-400 rounded-b-xl bg-grey-200">
                <div className="flex w-full justify-between p-2">
                  <div className="flex items-center">
                    <span 
                      className="text-pink-300 text-xl cursor-pointer rounded-full mb-1 mr-1 p-1 hover:scale-125 transition-all duration-200" 
                      onClick={() => toggleLike(component._id!)}
                    >
                      {likedComponents.includes(component._id || '') ?
                        <FaHeart className="animate__animated animate__heartBeat"/>
                      :
                        <FiHeart />
                      }
                    </span>
                    {component.likes} likes
                  </div>
                  <span 
                    className="rounded-full p-1 cursor-pointer hover:scale-125 transition-all duration-200"
                    onClick={() => toggleBookmark(component._id!)}
                  > 
                    {bookmarks.includes(component._id!) ?
                      <Bookmark  className="text-[#F5BA31] animate__animated animate__heartBeat"/>
                    :
                      <BookmarkBorderOutlined className="text-gray"/>
                    }
                  </span>
                </div>
                <div className="text-sm text-center">
                  Created by {component.creatorId?.displayName}
                </div>
                {/* {formatDistance(new Date(), new Date(component.createdAt!))} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Explorer