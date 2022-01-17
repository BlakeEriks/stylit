import { useRouter } from "next/router"
import { FormEventHandler, useState } from "react"
import { Component, ComponentState, ComponentType, StyleGroups, Styles } from "utils/types"

import { Button, Popover, ToggleButton, ToggleButtonGroup } from "@mui/material";
import SubHero from "components/SubHero";
import { ChromePicker, Color, ColorResult, RGBColor } from "react-color";
import TextEdit from "components/util/TextEdit";
import BackgroundEdit from "components/util/BackgroundEdit";
import PaddingEdit from "components/util/PaddingEdit";
import BorderEdit from "components/util/BorderEdit";
import ColorPicker from "components/util/ColorPicker";
import ShadowEdit from "components/util/ShadowEdit";
var _ = require('lodash/core');

// Define props
interface CreateComponentProps {
  url: string
}

const defaultStyles: Styles = {
  fontFamily: "Montserrat, sans-serif",
  color: "#000000",
  fontSize: "24px",
  fontWeight: "500",
  letterSpacing: "0px",
  background: "white",
  borderColor: "#000000",
  borderWidth: "2px",
  padding: "4px 8px",
  borderRadius: "5px",
  boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)",
  outline: "none"
}

const styleGroups: StyleGroups = {
  text: [
    "fontFamily",
    "color",
    "fontSize",
    "fontWeight",
    "letterSpacing",
  ],
  background: [
    "background"
  ],
  padding: [
    "padding"
  ],
  border: [
    "borderColor",
    "borderWidth",
    "borderRadius"
  ]
}

// Define Component
const Create = (props: CreateComponentProps) => {

  // get the next route
  const router = useRouter()
  const [styles, setStyles] = useState<Styles[]>([
    defaultStyles, {}, {}
  ])

  const [componentType, setComponentType] = useState(ComponentType.Button)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined);
  const [componentState, setComponentState] = useState<ComponentState>(ComponentState.normal);

  const getStyle = (style: keyof Styles): string => {
    if (styles[componentState].hasOwnProperty(style)) return styles[componentState][style]!
    return styles[ComponentState.normal][style]!
  }

  const getStyles = () => ({...styles[ComponentState.normal], ...styles[componentState]})

  const setStyle = (style: keyof Styles, value: string) => {
    if (styles[componentState][style] === value) return
    let newStyles = {...styles}
    newStyles[componentState][style] = value
    setStyles(newStyles)
  }

  // Function to create new component
  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    // construct new component
    let component: Component = { 
      creator_id: "61dcce4e2fa77b6e4b654bd7", 
      type: componentType, 
      styles: {
        ...styles[ComponentState.normal],
        '&:hover': {
          ...styles[ComponentState.hover]
        },
        '&:focus': {
          ...styles[ComponentState.focus]
        }
      }, 
      likes: { count: 0, users: [] }, 
      createdAt: 0 
    }
  
    // Make the API request
    await fetch(`${props.url}/components`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(component),
    })

    // after api request, push back to main page
    router.push("/component")
  }

  const setColorByAnchoredEl = ({r,g,b,a}: any) => {
    const rgbaString = `rgba(${r},${g},${b},${a})`
    const name = anchorEl?.getAttribute("name")
    if (!name) return
    setStyle(name as keyof Styles, rgbaString)
  }

  const toggleComponentState = (state: ComponentState) => {
    if (componentState === state) setComponentState(ComponentState.normal)
    else setComponentState(state)
  }

  const getStatesForComponent = () => {
    if (componentType === ComponentType.Card) return [ComponentState.hover]
    return [ComponentState.hover, ComponentState.focus]
  }
  
  /* Style reset function */
  const resetStyles = (styleGroup: string) => {
    const resetState = (componentState === ComponentState.normal) ? defaultStyles : styles[ComponentState.normal]
    for (const style of styleGroups[styleGroup as keyof StyleGroups]) {
      setStyle(style, resetState[style]!)
    }
  }

  return (
    <>
    <SubHero />
    <div className="border w-full h-5/6 px-4 flex flex-col justify-center mx-auto max-w-[1000px] bg-white rounded-xl bg-opacity-80">
      <div className="text-center text-4xl my-3 ">
        🎨{" "}
        <span className="bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400 bg-clip-text text-transparent">Create a New Component</span> 
        {" "}🖌
      </div>

      <form onSubmit={handleSubmit} className="flex flex-row">

        {/* Left Side Edit Panel */}
        <div className="flex flex-col items-center justify-between w-1/3">

          {/* Text Edit Section */}
          <TextEdit 
            getStyle={getStyle} 
            resetStyles={resetStyles}
            setStyle={setStyle}
            setAnchorEl={setAnchorEl} 
          />

          {/* Background Edit Section */}
          <BackgroundEdit
            getStyle={getStyle}
            resetStyles={resetStyles}
            setAnchorEl={setAnchorEl}
          />

          {/* Padding Edit Section */}
          <PaddingEdit
            getStyle={getStyle} 
            resetStyles={resetStyles}
            setStyle={setStyle}
          />
          
        </div>

        {/* Center Panel Component View */}
        <div className="w-1/3 flex flex-col items-center">
          <ToggleButtonGroup
            value={componentType}
            exclusive
            onChange={(e,v) => {if (v !== null) setComponentType(v)}}
            className="my-4"
          >
            <ToggleButton value={ComponentType.Button} aria-label="button">
              Button
            </ToggleButton>
            <ToggleButton value={ComponentType.Input} aria-label="input">
              Input
            </ToggleButton>
            <ToggleButton value={ComponentType.Card} aria-label="card">
              Card
            </ToggleButton>
          </ToggleButtonGroup>
          
          <div className="component-container h-52">
            {ComponentType[componentType] === "Button" &&
              <button 
                type="button"
                style={getStyles()}
                className="transition-all duration-75 ease-linear">
                Button
              </button>
            }
            {ComponentType[componentType] === "Input" &&
              <input 
              style={getStyles()}
                maxLength={10}
                placeholder="input..." 
                className="transition-all duration-75 ease-linear w-5/6"
                onKeyDown={event => {if (event.keyCode === 13) event.preventDefault()}}
              />
            }
            {ComponentType[componentType] === "Card" &&
              <div
              style={getStyles()}
                className="transition-all duration-75 ease-linear card"
              >
                Card
              </div>
            }
          </div>

          <div className="flex flex-row">
            {getStatesForComponent().map(state => (
              <Button
                key={state}
                className={"normal-case rounded-xl " + (componentState === state ? "text-[#DB2438]" : "text-gray")}
                onClick={() => toggleComponentState(state)}
              >
                :{ComponentState[state]}
              </Button>
            ))}
          </div>

          {/* Save Component */}
          <Button 
            type="submit"
            className="border rounded-2xl px-6 py-2 my-2"
          >
            Save ✅
          </Button>
        </div>

        {/* Edit the component on the right */}
        <div className="flex flex-col items-center justify-evenly w-1/3">

          {/* Border Edit Section */}
          <BorderEdit
            getStyle={getStyle} 
            resetStyles={resetStyles}
            setStyle={setStyle}
            setAnchorEl={setAnchorEl} 
          />

          {/* Shadow Edit Section */}
          <ShadowEdit
            componentState={componentState} componentType={componentType} setStyle={setStyle}
          />
          
        </div>

        {/* Color Picker Pop Up */}
        <ColorPicker
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(undefined)}
          onChange={(rgb: RGBColor) => setColorByAnchoredEl(rgb)}
        />

      </form>

    </div>
    </>
  )
}

// export getStaticProps to provide API_URL to component
export async function getStaticProps(context: any) {
  return {
    props: {
      url: process.env.API_URL,
    },
  }
}

// export component
export default Create