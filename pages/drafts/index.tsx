/** @jsxImportSource @emotion/react */
import { Interpolation, Theme } from "@emotion/react"
import Btn from "components/Btn"
import Editor from "components/Editor"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Component, ComponentState, ComponentType, defaultStyles, Styles } from "utils/types"

interface IndexProps {
  url: string
}

const Index = ({url}: IndexProps) => {

  const router = useRouter()
  const [drafts, setDrafts] = useState<Component[]>([])
  const [selectedDraft, setSelectedDraft] = useState<number>(0)

  useEffect( () => {
    setDrafts(JSON.parse(window.localStorage.getItem('drafts') || "[]"))
  }, [])

  const saveDraft = (draft: Component) => {
    const allDrafts = [...drafts]
    allDrafts[selectedDraft] = draft
    setDrafts(allDrafts)
    
    localStorage.setItem("drafts", JSON.stringify(allDrafts))
  }

  const addDraft = () => {
    const newDraft = {styles: [{...defaultStyles},{},{}], type: 0, name: `Draft #${Math.floor(1000*Math.random())}`}
    setDrafts([...drafts, newDraft])

    localStorage.setItem("drafts", JSON.stringify([...drafts, newDraft]))
  }

  console.log(drafts)

  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-col items-center w-1/4 text-2xl border-r-4 border-black bg-offWhite h-[90vh]">
        <div className="py-3 w-full text-center text-black">
          🌏 Draft Selector
        </div>
        {/* MAPPING OVER THE COMPONENTS */}
        <div className="flex flex-col items-center w-full flex-grow px-5 overflow-scroll h-[80vh]">
          {drafts.map( (component, index) => (
            <div 
              key={index} 
              className="flex flex-col w-full items-center rounded-xl bg-black bg-opacity-40 my-2 hover:bg-red cursor-pointer"
              onClick={() => setSelectedDraft(index)}
            >
              <div className="text-lg text-white">
                {component.name}
              </div>
              <div className={"component-container bg-white "}>
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
            </div>
          ))}
        </div>
        <div className="py-3 w-full text-center text-black">
          <Btn onClick={addDraft}>
            Add Draft +
          </Btn>
        </div>
      </div>
      <div className="flex items-center flex-col w-3/4">
        <div className="text-2xl text-white ">

        </div>
        {drafts.length > 0 ?
        <Editor {...drafts[selectedDraft]} handleSave={saveDraft}/> :
        <div>Create a draft to get started!</div>
        }

      </div>
    </div>
  )
}

// GET PROPS FOR SERVER SIDE RENDERING
export async function getServerSideProps() {
  // get component data from API
  const url = process.env.API_URL

  // return props
  return {
    props: { url }
  }
}

export default Index