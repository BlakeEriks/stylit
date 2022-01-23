/** @jsxImportSource @emotion/react */
import { Interpolation, Theme } from "@emotion/react"
import { useRouter } from "next/router"
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
  console.log(components)
  return (
    <div className="w-full">
      <div className="text-4xl text-white">
        This is where you can come to view all of your published components!
      </div>
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

export default Published