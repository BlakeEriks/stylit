/** @jsxImportSource @emotion/react */
import { Interpolation, Theme } from "@emotion/react"
import SubHero from "components/SubHero"
import Image from "next/image"
import { useRouter } from "next/router"
import asset from "public/img/asset-3.svg"
import { useEffect, useState } from "react"
import { ComponentType, PublishedComponent } from "utils/types"
import { useUserState } from "utils/user"

const Published = () => {
  
  const {user} = useUserState()
  const router = useRouter()
  const [components, setComponents] = useState<PublishedComponent[]>([])

  useEffect(() => {
    if (!user) {
      router.push('/')
      return
    }

    const fetchPublished = async () => {
      const res = await fetch(`/api/components?creatorId=${user.id}`)
      setComponents(await res.json())
    }

    fetchPublished()
  }, [])

  return (
    <>
      <SubHero />
      <div className="w-full flex flex-col bg-offWhite">
        <div className="flex justify-center items-center">
          <div>
            <div className="text-3xl font-semibold">
              Your Published Components
            </div>
            <div className="text-grey-600">
              This is where you can come to view all of your masterpieces!
            </div>
          </div>
          <div className="w-1/2 p-6 animate__animated animate__fadeInRight max-w-[400px]">
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

export default Published