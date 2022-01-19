import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Btn from "components/Btn";
import BackgroundEdit from "components/util/BackgroundEdit";
import BorderEdit from "components/util/BorderEdit";
import ColorPicker from "components/util/ColorPicker";
import PaddingEdit from "components/util/PaddingEdit";
import ShadowEdit from "components/util/ShadowEdit";
import TextEdit from "components/util/TextEdit";
import { useEffect, useState } from "react";
import { RGBColor } from "react-color";
import { ComponentState, ComponentType, defaultStyles, StyleGroups, Styles } from "utils/types";
var _ = require('lodash/core');

// Define props
interface EditorProps {
  styles: Styles[]
  type: ComponentType
  name: string
  handleSave: Function
  handlePublish: Function
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

const Editor = (props: EditorProps) => {
  
  const [styles, setStyles] = useState<Styles[]>(props.styles)
  const [type, setType] = useState<ComponentType>(props.type)
  const [name, setName] = useState<string>(props.name)

  useEffect( () => {
    setStyles(props.styles)
    setType(props.type)
    setName(props.name)
  }, [props])

  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined);
  const [componentState, setComponentState] = useState<ComponentState>(ComponentState.normal);

  const getStyle = (style: keyof Styles): string => {
    if (styles[componentState].hasOwnProperty(style)) return styles[componentState][style]!
    return styles[ComponentState.normal][style]!
  }

  const getStyles = () => ({...styles[ComponentState.normal], ...styles[componentState]})

  const setStyle = (style: keyof Styles, value: string) => {
    if (styles[componentState][style] === value) return
    let newStyles = [...styles]
    newStyles[componentState][style] = value
    setStyles(newStyles)
  }
  
  // Function to create new component
  // const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
  //   event.preventDefault()

  //   // construct new component
  //   let component: Component = { 
  //     creator_id: "61dcce4e2fa77b6e4b654bd7", 
  //     type: componentType, 
  //     styles: {
  //       ...styles[ComponentState.normal],
  //       '&:hover': {
  //         ...styles[ComponentState.hover]
  //       },
  //       '&:focus': {
  //         ...styles[ComponentState.focus]
  //       }
  //     }, 
  //     likes: { count: 0, users: [] }
  //   }
  
  //   // Make the API request
  //   await fetch(`${props.url}/components`, {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(component),
  //   })

  //   // after api request, push back to main page
  //   router.push("/component")
  // }

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
    if (type === ComponentType.Card) return [ComponentState.hover]
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
    <div className="flex flex-col justify-center max-w-[1100px] w-full min-w-[800px] bg-white bg-opacity-70">
      
      <div className="w-full text-3xl text-center pt-4">
        {props.name}
      </div>

      <div className="flex flex-row p-5">

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
        <div className="flex flex-col items-center w-1/3">
          <ToggleButtonGroup
            value={type}
            exclusive
            onChange={(e,v) => {if (v !== null) setType(v)}}
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
            {ComponentType[type] === "Button" &&
              <button 
                type="button"
                style={getStyles()}
                className="transition-all duration-75 ease-linear">
                Button
              </button>
            }
            {ComponentType[type] === "Input" &&
              <input
              style={getStyles()}
                maxLength={10}
                placeholder="input..." 
                className="transition-all duration-75 ease-linear w-5/6"
              />
            }
            {ComponentType[type] === "Card" &&
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
                className={"normal-case rounded-xl opacity-50 " + (componentState === state ? "text-gold opacity-100" : "text-black")}
                onClick={() => toggleComponentState(state)}
              >
                :{ComponentState[state]}
              </Button>
            ))}
          </div>
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
            componentState={componentState} componentType={type} setStyle={setStyle}
          />
          
        </div>

        {/* Color Picker Pop Up */}
        <ColorPicker
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(undefined)}
          onChange={(rgb: RGBColor) => setColorByAnchoredEl(rgb)}
        />
      </div>

      {/* Save Component */}
      <div className="flex w-full justify-evenly p-4 text-3xl bg-gray">
        <Btn
          className="rounded-2xl bg-sky-500 text-white hover:shadow-lg"
          onClick={() => {props.handleSave({styles: styles, type, name})}}
        >
          Save 💾 
        </Btn>
        <Btn 
          className="rounded-2xl bg-green-500 text-white hover:shadow-lg"
          onClick={() => props.handlePublish()}
        >
          Publish ✅ 
        </Btn>
      </div>
    </div>
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
export default Editor