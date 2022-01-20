import { Edit } from "@mui/icons-material";
import UndoRounded from "@mui/icons-material/UndoRounded";
import { IconButton } from "@mui/material";
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
import { ComponentState, ComponentType, DraftComponent, StyleGroups, Styles } from "utils/types";
var _ = require('lodash');

// Define props
interface EditorProps {
  draft: DraftComponent
  handleSave: Function
  handlePublish: Function
}

/* Group styling options */
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

/* Component for editing component drafts */
const Editor = (props: EditorProps) => {
  
  const lastSaved: DraftComponent = JSON.parse(JSON.stringify(props.draft))
  const [draft, setDraft] = useState(lastSaved)
  const [componentState, setComponentState] = useState<ComponentState>(ComponentState.normal);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>();
  const [editNameAnchorEl, setEditNameAnchorEl] = useState<HTMLElement | undefined>();

  const {stylesMap, type, name} = draft
  console.log(name)
  /* Update editor on draft change */
  useEffect( () => {

    /* Do nothing if draft didn't change */
    if (_.isMatch(lastSaved, draft)) return
  
    setDraft(lastSaved)
    setComponentState(ComponentState.normal)
  }, [props])

  /* Retrieve a style for current component state */
  const getStyle = (style: keyof Styles): string => {
    if (stylesMap[componentState].hasOwnProperty(style)) return stylesMap[componentState][style]!
    return stylesMap[ComponentState.normal][style]!
  }

  /* Retrieve all styles */
  const getStyles = () => ({...stylesMap[ComponentState.normal], ...stylesMap[componentState]})

  /* Set style on current component state */
  const setStyle = (style: keyof Styles, value: string) => {
    if (stylesMap[componentState][style] === value) return
    let newstylesMap = {...stylesMap}
    if (!value) delete newstylesMap[componentState][style]
    else newstylesMap[componentState][style] = value
    setDraft({...draft, stylesMap: newstylesMap})
  }

  /* Style reset function */
  const resetStyles = (styleGroup: string) => {
    const resetState = (componentState === ComponentState.normal) ? lastSaved.stylesMap[ComponentState.normal] : stylesMap[ComponentState.normal]
    for (const style of styleGroups[styleGroup as keyof StyleGroups]) {
      setStyle(style, resetState[style]!)
    }
  }

  /* Set a color style based on anchored color picker */
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

  return (
    <div className="flex flex-col justify-center max-w-[1100px] w-full min-w-[800px] bg-white bg-opacity-70">
      
      <div className="flex justify-between items-center w-full px-4 py-2 bg-gray text-5xl">
        <div>
          🌜
        </div>
        <div className="flex items-center justify-center min-w-[25%] max-w-[50%]">
          {name}
          <IconButton
            size="medium"
            children={<Edit fontSize="medium"/>}
            onClick={(event) => setEditNameAnchorEl(event.currentTarget)}
          />
        </div>
        <IconButton
          size="large"
          children={<UndoRounded fontSize="large"/>}
          onClick={() => setDraft(lastSaved)}
        />
      </div>

      <div className="flex flex-row">

        {/* Left Side Edit Panel */}
        <div className="flex flex-col items-center justify-between w-1/3 bg-rose-50 p-5 shadow-2xl">

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
        <div className="flex flex-col items-center w-1/3 bg-offWhite py-8">

          {/* Component Type Selector */}
          <ToggleButtonGroup
            value={type}
            exclusive
            onChange={(e,v) => {if (v !== null) setDraft({...draft, type: v})}}
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
          
          {/* Component View */}
          <div className="component-container">
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

          {/* State toggle buttons */}
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
        <div className="flex flex-col items-center justify-between w-1/3 bg-rose-50 p-5 shadow-2xl">

          {/* Border Edit Section */}
          <BorderEdit
            getStyle={getStyle} 
            resetStyles={resetStyles}
            setStyle={setStyle}
            setAnchorEl={setAnchorEl} 
          />

          {/* Shadow Edit Section */}
          <ShadowEdit
            shadows={_.values(_.mapValues(stylesMap, (styles: Styles)=>styles.boxShadow))}
            componentState={componentState} 
            componentType={type} 
            setStyle={setStyle}
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
          onClick={() => {props.handleSave({stylesMap, type, name})}}
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