/** @jsxImportSource @emotion/react */
import { Interpolation, Theme } from "@emotion/react"
import { Add } from "@mui/icons-material"
import DeleteOutline from "@mui/icons-material/DeleteOutline"
import { Button } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import Editor from "components/Editor"
import SubHero from "components/SubHero"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useModalState } from "utils/modal"
import { ComponentState, ComponentType, defaultStyles, DraftComponent, PublishedComponent } from "utils/types"
import { useUserState } from "utils/user"

const Index = () => {
  const router = useRouter()
  const [drafts, setDrafts] = useState<DraftComponent[]>([])
  const [selectedDraft, setSelectedDraft] = useState<number>(0)
  const [modalState, setModalState] = useModalState()
  const {user} = useUserState()

  useEffect( () => {
    setDrafts(JSON.parse(window.localStorage.getItem('drafts') || "[]"))
  }, [])

  useEffect( () => {
    if (selectedDraft > 0 && selectedDraft >= drafts.length) {
      setSelectedDraft(drafts.length - 1)
    }
  }, [drafts])

  const saveDraft = (draft: DraftComponent) => {
    const allDrafts = [...drafts]
    allDrafts[selectedDraft] = draft
    setDrafts(allDrafts)
    
    localStorage.setItem("drafts", JSON.stringify(allDrafts))
    toast.success("Saved " + draft.name)
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
    setSelectedDraft(drafts.length)
    localStorage.setItem("drafts", JSON.stringify([...drafts, newDraft]))
  }

  const deleteDraft = (name: string) => {
    const newDrafts = [...drafts.filter(draft => draft.name !== name)]
    setDrafts(newDrafts)
    localStorage.setItem("drafts", JSON.stringify(newDrafts))
  }

  const getSelectedDraft = () => (drafts.length === 0 ? 
    {
      stylesMap: {
        [ComponentState.normal]: {...defaultStyles},
        [ComponentState.focus]: {},
        [ComponentState.hover]: {},
      }, 
      type: 0, 
      name: `Draft #${Math.floor(1000*Math.random())}`
    } : selectedDraft === drafts.length ? drafts[drafts.length - 1] : drafts[selectedDraft])

  const publishDraft = async () => {
    const {stylesMap} = drafts[selectedDraft]

    // construct new component
    let component: PublishedComponent = { 
      creator: user.id,
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
      likes: 0
    }
  
    // Make the API request
    // await fetch(`${url}/components`, {
    await fetch(`api/components`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(component),
    })

    return component
  }

  const onPublish = async (draft: DraftComponent) => {
    saveDraft(draft)

    if (!user) {
      setModalState({
        open: true, 
        title: "Sign In to publish a component! 💛",
        description: "We love to see who our creators are. Own that work! Check out the sign in options below.",
        type: "promptLogin"
      })
      return
    }

    setModalState({
      open: true,
      title: "Are you sure you're ready to publish? 👀",
      description: "You won't be able to edit this component any longer!",
      type: "yesOrNo",
      options: {
        yesText: "✅ Let's do it!",
        noText: "❕ Wait go back!",
        onYes: async () => {
          setModalState({open: true, type: "loading"})
          const component = await publishDraft()
          router.push(`/component?sort=Newest&type=${component.type}`)
          deleteDraft(component.name)
          setModalState({open: false})
          toast.success("Published " + component.name)
        },
        onNo: () => setModalState({open: false})
      }
    })
  }

  return (
    <>
      <SubHero />
      <div className="flex flex-col-reverse xl:flex-row w-full bg-gradient-to-br from-pink-300 via-orange-100 to-sky-200 border-t border-white">
        <div className="flex flex-col items-center xl:w-1/4 xl:max-w-xs text-2xl border-r-2 border-grey-600 dark:border-white bg-offWhite flex-grow animate__animated animate__fadeInLeft dark:bg-grey-800 transition-all duration-200">
          <div className="py-3 w-full text-center text-black bg-white font-bold border-b border-grey-600 shadow-xl dark:text-white dark:bg-grey-600 dark:border-white transition-all duration-200">
            🌏 Draft Selector
          </div>
          {/* MAPPING OVER THE COMPONENTS */}
          <div className="flex xl:flex-col items-center justify-start w-full flex-grow p-5 overflow-auto xl:h-[80vh]">
            {drafts.map( (draft, index) => (
              <div 
                key={index}
                className={`${selectedDraft === index ? "border-2 border-sky-500 scale-105" : "opacity-70"}
                hover:shadow-sky-500 component-card xl:my-3 xl:mx-0 cursor-pointer group xl:w-full shrink-0 mx-3`}
                onClick={() => setSelectedDraft(index)}
              >
                <div className="flex items-center justify-between text-lg text-center text-grey-600 dark:text-white font-bold shadow-sm w-full">
                  <span className="opacity-0 group-hover:opacity-70 w-0">
                    <IconButton
                      size="small"
                      onClick={() => deleteDraft(draft.name)}
                    >
                      <DeleteOutline />
                    </IconButton>
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
                      readOnly
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
            <Button onClick={addDraft} className="rounded-md text-xl !text-grey-600 dark:text-gray" startIcon={<Add />}>
              New Draft
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col flex-grow p-[2vw]">
          <Editor draft={getSelectedDraft()!} handleSave={saveDraft} handlePublish={onPublish}/> 
        </div>

      </div>
    </>
  )
}

export default Index