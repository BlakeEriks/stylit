/** @jsxImportSource @emotion/react */
import { Interpolation, Theme } from "@emotion/react"
import { DeleteOutline } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import Btn from "components/Btn"
import Editor from "components/Editor"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useModalState } from "utils/modal"
import { ComponentState, ComponentType, defaultStyles, DraftComponent, PublishedComponent } from "utils/types"
import { useUserState } from "utils/user"

interface IndexProps {
  url: string
}

const Index = ({url}: IndexProps) => {

  const router = useRouter()
  const [drafts, setDrafts] = useState<DraftComponent[]>([])
  const [selectedDraft, setSelectedDraft] = useState<number>(0)
  const [modalState, setModalState] = useModalState()
  const {user} = useUserState()

  useEffect( () => {
    setDrafts(JSON.parse(window.localStorage.getItem('drafts') || "[]"))
  }, [])

  const saveDraft = (draft: DraftComponent) => {
    const allDrafts = [...drafts]
    allDrafts[selectedDraft] = draft
    setDrafts(allDrafts)
    
    localStorage.setItem("drafts", JSON.stringify(allDrafts))
  }

  const addDraft = () => {
    const newDraft = {
      stylesMap: {
        [ComponentState.normal]: {...defaultStyles},
        [ComponentState.focus]: {},
        [ComponentState.hover]: {},
      }, 
      type: 0, 
      name: `Draft #${Math.floor(1000*Math.random())}`
    }
    setDrafts([...drafts, newDraft])

    localStorage.setItem("drafts", JSON.stringify([...drafts, newDraft]))
  }

  const deleteDraft = (index: number) => {
    const newDrafts = [...drafts.slice(0,index), ...drafts.slice(index+1)]
    if (selectedDraft === newDrafts.length) setSelectedDraft(newDrafts.length - 1)
    setDrafts(newDrafts)
    localStorage.setItem("drafts", JSON.stringify(newDrafts))
  }

  const getSelectedDraft = () => drafts.length === 0 ? null : selectedDraft === drafts.length ? drafts[drafts.length - 1] : drafts[selectedDraft]

  const onPublish = async () => {
    if (!user) {
      setModalState({
          open: true, 
          title: "Sign In to publish a component! 💛",
          description: "We love to see who our creators are. Own that work! Check out the sign in options below.",
          promptLogin: true
        })
    }

    const {stylesMap} = drafts[selectedDraft]

    // construct new component
    let component: PublishedComponent = { 
      creator_id: "61dcce4e2fa77b6e4b654bd7",
      ...drafts[selectedDraft],
      stylesMap: {
        ...stylesMap[ComponentState.normal],
        '&:hover': {
          ...stylesMap[ComponentState.hover]
        },
        '&:focus': {
          ...stylesMap[ComponentState.focus]
        }
      }, 
      likes: { count: 0, users: [] }
    }
  
    // Make the API request
    await fetch(`${url}/components`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(component),
    })

    // after api request, push back to main page
    router.push("/component")
  }

  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-col items-center w-1/4 text-2xl border-r-4 border-black bg-offWhite h-[90vh]">
        <div className="py-3 w-full text-center text-black bg-white font-bold border-b-2 border-grey-600 shadow-xl">
          🌏 Draft Selector
        </div>
        {/* MAPPING OVER THE COMPONENTS */}
        <div className="flex flex-col items-center w-full flex-grow p-5 overflow-auto h-[80vh]">
          {drafts.map( (draft, index) => (
            <div 
              key={index}
              className={`${selectedDraft === index ? "border-2 border-gold scale-105" : "opacity-70"}
              flex flex-col w-full items-center rounded-xl my-3 cursor-pointer group
              hover:shadow-gold bg-white shadow-2xl transition-all duration-150`}
              onClick={() => setSelectedDraft(index)}
            >
              <div className="flex items-center justify-between text-lg text-center text-grey-600 font-bold shadow-sm w-full">
                <span className="opacity-0 group-hover:opacity-70 w-0 transition-all duration-150">
                  <IconButton
                    size="small"
                    children={<DeleteOutline />}
                    onClick={() => deleteDraft(index)}
                    />
                </span>
                {draft.name}
                <span></span>
              </div>
              <div className="component-container">
                {ComponentType[draft.type] === "Button" && 
                  <button 
                    css={draft.stylesMap[ComponentState.normal] as Interpolation<Theme>}
                  >
                    Button
                  </button>
                }
                {ComponentType[draft.type] === "Input" && 
                  <input
                    className="min-w-0"
                    css={draft.stylesMap[ComponentState.normal] as Interpolation<Theme>} 
                    placeholder="input..." 
                  />
                }
                {ComponentType[draft.type] === "Card" && 
                  <div
                    css={draft.stylesMap[ComponentState.normal] as Interpolation<Theme>}
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
        <Editor draft={getSelectedDraft()!} handleSave={saveDraft} handlePublish={onPublish}/> :
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