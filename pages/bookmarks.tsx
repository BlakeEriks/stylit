/** @jsxImportSource @emotion/react */
import { Interpolation, Theme } from "@emotion/react"
import SubHero from "components/SubHero"
import Image from "next/image"
import asset from "public/img/bookmarks.svg"
import { useEffect, useState } from "react"
import { useBookmarks } from "utils/bookmarks"
import { ComponentType, PublishedComponent } from "utils/types"

const Bookmarks = () => {

  const [components, setComponents] = useState<PublishedComponent[]>([])
  const {bookmarks, setBookmarks} = useBookmarks()

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!bookmarks || !bookmarks.length) return
      const res = await fetch(`/api/components?id=${bookmarks.join(',')}`)
      console.log(bookmarks.join(','))
      setComponents(await res.json())
    }

    fetchBookmarks()
  }, [bookmarks])

  return (
    <>
      <SubHero />
      <div className="w-full flex flex-col bg-offWhite">
        <div className="flex flex-col md:flex-row justify-center items-center p-4">
          <div>
            <div className="text-3xl font-semibold">
              Your Saved Components
            </div>
            <div className="text-grey-600">
              All your favs from across the galaxy whenever you need them.
            </div>
          </div>
          <div className="md:w-1/2 p-6 animate__animated animate__fadeInRight max-w-[400px]">
            <Image src={asset} priority/>
          </div>
        </div>
        {/* MAPPING OVER THE COMPONENTS */}
        <div className="flex flex-row flex-wrap justify-evenly">
          {components.map(component => (
            <div key={component._id} className="component-card transition-all duration-150 ease-linear hover:scale-105 m-2">
              <div className="text-center text-lg text-grey-600 shadow-sm w-full dark:text-white">
                {component.name}
              </div>
              <div className="component-container">
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
    </>
  )
}

export default Bookmarks