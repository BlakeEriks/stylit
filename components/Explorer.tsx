/** @jsxImportSource @emotion/react */
import { Interpolation, Theme } from "@emotion/react";
import { Bookmark, BookmarkBorderOutlined, ContentCopy } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { useBookmarks } from "utils/bookmarks";
import { ComponentType, PublishedComponent } from "utils/types";
import ExploreHeader from "./ExploreHeader";
var _ = require('lodash');

const Explorer = () => {

  const router = useRouter()
  const [components, setComponents] = useState<PublishedComponent[]>([])
  const [componentType, setComponentType] = useState<ComponentType>(Number(router.query.type) as ComponentType || ComponentType.Button)
  const [sort, setSort] = useState<string>(router.query.sort as string || "Popular")
  const [loading, setLoading] = useState(false)
  const [likedComponents, setLikedComponentes] = useState<string[]>([])
  const {bookmarks, setBookmarks} = useBookmarks()

  const sortComponents = (components: PublishedComponent[]) => {
    if (sort === "Popular") {
      components.sort((a,b) => b.likes - a.likes)
    }
    if (sort === "Newest") {
      components.sort( (a,b) => new Date(b.createdAt!).getTime() -  new Date(a.createdAt!).getTime() )
    }
    if (sort === "Oldest") {
      components.sort( (a,b) => new Date(a.createdAt!).getTime() -  new Date(b.createdAt!).getTime())
    }
  }

  useEffect(() => {
    setSort(router.query.sort as string || "Popular")
    setComponentType(Number(router.query.type) as ComponentType || ComponentType.Button)
  }, [router.query])

  useEffect( () => {
    const fetchComponents = async () => {
      return await fetch(`/api/components?type=${componentType}`)
    }

    setLoading(true)
    fetchComponents().then( res => res.json())
      .then(components => {
        sortComponents(components)
        setComponents(components)
        setLoading(false)
      })
  },[componentType, sort])

  useEffect(() => {
    if (window.localStorage.getItem("likes")) {
      setLikedComponentes(JSON.parse(window.localStorage.getItem("likes")!))
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
    if (bookmarks.some(bookmark => bookmark === componentId)) {
      setBookmarks([...bookmarks.filter(bookmark => bookmark !== componentId)])
    }
    else {
      setBookmarks([...bookmarks, componentId])
    }
  }

  return (
    <div className="flex items-center flex-col p-8 w-full bg-offWhite overflow-auto dark:bg-grey-800">
      <ExploreHeader 
        componentType={componentType}
        setComponentType={setComponentType}
        sort={sort}
        setSort={setSort}
      />

      {/* MAPPING OVER THE COMPONENTS */}
      <div className="flex flex-row flex-wrap justify-evenly pt-6">
        {components.map( (component, key) => (
          <div 
            key={key} 
            className="component-card m-3 transition-all duration-150 ease-linear hover:scale-105 group relative border border-grey-400"
            data-aos="fade-left"
          >
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
            <div className="flex flex-col justify-center w-full border-t border-grey-400 rounded-b-xl bg-offWhite dark:bg-grey-800">
                <div className="flex w-full justify-between p-2">
                  <div className="flex items-center">
                    <button 
                      className="text-pink-300 text-xl cursor-pointer rounded-full mb-1 mr-1 p-1 hover:scale-125 focus:scale-125 transition-all duration-200" 
                      onClick={() => toggleLike(component._id!)}
                    >
                      {likedComponents.includes(component._id || '') ?
                        <FaHeart className="animate__animated animate__heartBeat text-pink-400"/>
                      :
                        <FiHeart />
                      }
                    </button>
                    <span className="dark:text-offWhite">
                      {component.likes} like{component.likes !== 1 && 's'}
                    </span>
                  </div>
                  <button
                    className="rounded-full p-1 cursor-pointer hover:scale-125 focus:scale-125 transition-all duration-200"
                    onClick={() => toggleBookmark(component._id!)}
                  >
                    {bookmarks.includes(component._id!) ?
                      <Bookmark  className="text-[#F5BA31] animate__animated animate__heartBeat"/>
                    :
                      <BookmarkBorderOutlined className="text-gray animate__animated animate__heartBeat"/>
                    }
                  </button>
                </div>
                {/* <div className="text-sm text-center">
                  Created by {component.creatorId?.displayName}
                </div> */}
                {/* {formatDistance(new Date(), new Date(component.createdAt!))} */}
            </div>
            <Button className="!absolute top-3 left-3 !p-1 !min-w-0 !text-sm cursor-pointer opacity-0 group-hover:opacity-100 hover:scale-125 transition-all duration-200"
              onClick={() => navigator.clipboard.writeText(JSON.stringify(component.stylesMap, null, "\t"))} 
            >
              <ContentCopy className="text-lg text-gray"/>
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Explorer