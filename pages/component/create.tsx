import { useRouter } from "next/router"
import { FormEventHandler, useState } from "react"
import { Component, ComponentType } from "utils/types"
import { CompactPicker } from 'react-color';
import { Button, MenuItem, Popover, Select, Slider, ToggleButton, ToggleButtonGroup } from "@mui/material";
import SubHero from "components/SubHero";

/* 
  Need a way to restrict field edits per component

  Button: [Normal, Focus, Hover]
  Input: [Normal, Focus, Hover]
  Card: [Normal, Hover]

  Write a function to get a style
*/ 

// Define props
interface CreateComponentProps {
  url: string
}

enum ComponentState {
  normal, focus, hover
}

interface Styles {
  color?: string
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  letterSpacing?: string
  background?: string
  borderColor?: string
  borderWidth?: string
  padding?: string
  borderRadius?: string
  boxShadow?: string
  outline?: string
}

const fontOptions = ["Montserrat", "Open Sans", "Raleway", "Roboto"]
const defaultStyles: Styles = {
  color: "#000000",
  fontSize: "24px",
  fontWeight: "500",
  fontFamily: "Montserrat, sans-serif",
  letterSpacing: "0px",
  background: "white",
  borderColor: "#000000",
  borderWidth: "2px",
  padding: "4px 8px",
  borderRadius: "5px",
  boxShadow: "0px 0px 0px 0px #000000",
  outline: "none"
}
// Define Component
const Create = (props: CreateComponentProps) => {

  // get the next route
  const router = useRouter()
  const [styles, setStyles] = useState<Styles[]>([
    defaultStyles, {}, {}
  ])

  const [componentType, setComponentType] = useState(ComponentType.Button)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [componentState, setComponentState] = useState<ComponentState>(ComponentState.normal);

  const getStyle = (style: keyof Styles): string => {
    if (styles[componentState].hasOwnProperty(style)) return styles[componentState][style]!
    return styles[ComponentState.normal][style]!
  }

  const getStyles = () => ({...styles[ComponentState.normal], ...styles[componentState]})

  const setStyle = (style: keyof Styles, value: string) => {
    let newStyles = {...styles}
    newStyles[componentState][style] = value
    setStyles(newStyles)
  }

  // Function to create new component
  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    // construct new component
    let component: Component = { creator_id: "61dcce4e2fa77b6e4b654bd7", type: componentType, styles: styles, likes: { count: 0, users: [] }, createdAt: 0 }
  
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

  const getPadding = (axis: string) => Number(getStyle("padding").split(" ")[axis === 'x' ? 1 : 0].replace("px", ""))

  const getShadowFragment = (index: number) => {
    const fragment = getStyle("boxShadow").split(" ")[index]
    if (index === 4) return fragment
    return fragment.replace("px", "")
  }

  const setShadow = (value: number | string, index: number) => {
    const fragments = getStyle("boxShadow").split(" ")
    fragments[index] = value + (index !== 4 ? "px" : '')
    setStyle("boxShadow", fragments.join(" "))
  }

  const setColorByAnchoredEl = (hex: string) => {
    const name = anchorEl?.getAttribute("name")
    if (!name) return
    if (name === "shadow") {
      setShadow(hex, 4)
    }
    else {
      setStyle(name as keyof Styles, hex)
    }
  }

  const getComponentType = () => ComponentType[componentType]

  const toggleComponentState = (state: ComponentState) => {
    if (componentState === state) setComponentState(ComponentState.normal)
    else setComponentState(state)
  }

  const getStatesForComponent = () => {
    if (componentType === ComponentType.Card) return [ComponentState.hover]
    return [ComponentState.hover, ComponentState.focus]
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
        <div className="flex flex-col items-center justify-between w-1/3 ">

          {/* Font Edit Section */}
          <div className="my-2 w-full flex flex-col">

            <div className="px-6 text-xl font-medium">
              ✍🏼Text
            </div>

            <div className="flex items-center w-full px-2 my-1">
              <div className="w-1/4">
                font
              </div>
              <Select
                className="w-3/4"
                value={getStyle("fontFamily").split(",")[0]}
                onChange={ event => (
                  setStyle("fontFamily", `${event.target.value}, sans-serif`))}
                  displayEmpty
                sx={{
                  '& .MuiSelect-select': {
                    padding: '1px 0px 1px 8px',
                    fontSize: '14px'
                  },
                  '.MuiPaper-root': {
                    background: '#000000 !important'
                  }
                }}
              >
                {fontOptions.map(font => (
                  <MenuItem 
                  key={font} 
                  value={font}
                  style={{fontFamily: `${font}, sans-serif`, fontWeight: "600"}}
                  >
                    {font}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className="flex items-center w-full px-2 my-1">
              <div className="w-1/4">
                color
              </div>
              <button type="button"
                name="color"
                className="p-2 rounded-lg border-2 w-3/4"
                style={{ background: getStyle("color") }}
                onClick={e => setAnchorEl(e.currentTarget)}>
              </button>
            </div>

            <div className="flex items-center w-full px-2 my-1">
              <div className="w-1/4">
                size
              </div>
              <Slider
                className="w-3/4"
                size="small"
                max={40}
                min={10}
                aria-label="Small"
                onChange={(e, v) => setStyle("fontSize", `${v}px`)}
                value={Number(getStyle("fontSize").replace("px", ""))}
              />
            </div>

            <div className="flex items-center w-full px-2 my-1">
              <div className="w-1/4">
                weight
              </div>
              <Slider
                className="w-3/4"
                size="small"
                max={900}
                min={100}
                step={100}
                onChange={(e, v) => setStyle("fontWeight", v.toString())}
                value={Number(getStyle("fontWeight"))}
              />
            </div>
            
            <div className="flex items-center w-full px-2 my-1">
              <div className="w-1/4">
                space
              </div>
              <Slider
                className="w-3/4"
                size="small"
                max={10}
                onChange={(e, v) => setStyle("letterSpacing", v + 'px')}
                value={Number(getStyle("letterSpacing").replace("px",""))}
              />
            </div>
          </div>

          {/* Background Edit Section */}
          <div className="my-2 w-full flex flex-col">

            <div className="px-6 text-xl font-medium">
              Background
            </div>

            <button type="button"
              name="background"
              className="p-4 rounded-lg border-2"
              style={{ background: getStyle("background") }}
              onClick={e => setAnchorEl(e.currentTarget)}>
            </button>
          </div>

          {/* Padding Edit Section */}
          <div className="my-2 w-full">
            <div className="px-2 text-center">Padding</div>
            <div className="flex flex-row w-full justify-center">
              x
              <span className="w-2/3 px-4">
                <Slider
                  size="small"
                  max={40}
                  aria-label="Small"
                  onChange={(e, v) => setStyle("padding", `${getStyle("padding").split(" ")[0]} ${v}px`)}
                  value={getPadding("x")}
                />
              </span>
            </div>
            <div className="flex flex-row w-full justify-center">
              y
              <span className="w-2/3 px-4">
                <Slider
                  size="small"
                  max={40}
                  aria-label="Small"
                  onChange={(e, v) => setStyle("padding", `${v}px ${getStyle("padding").split(" ")[1]}`)}
                  value={getPadding("y")}
                />
              </span>
            </div>
          </div>
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
                style={getStyles()}
                className="transition-all duration-150 ease-linear">
                Button
              </button>
            }
            {ComponentType[componentType] === "Input" &&
              <input 
                style={getStyles()} 
                placeholder="input..." 
                className="transition-all duration-150 ease-linear w-5/6"  
              />
            }
            {ComponentType[componentType] === "Card" &&
              <div
                style={getStyles()}
                className="flex items-center justify-center transition-all duration-150 ease-linear card cursor-pointer"
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
            ))

            }
            {/* <Button
              className={"normal-case rounded-xl " + (componentState === ComponentState.Hover ? "text-[#DB2438]" : "text-gray")}
              onClick={() => toggleComponentState(ComponentState.Hover)}
            >
              :hover
            </Button>
            <Button
              className={"normal-case rounded-xl " + (componentState === ComponentState.Focus ? "text-[#DB2438]" : "text-gray")}
              onClick={() => toggleComponentState(ComponentState.Focus)}
            >
              :focus
            </Button> */}
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
        <div className="flex flex-col items-center w-1/3 p-4">

          {/* Border Edit Section */}
          <div className="my-2 w-full flex flex-col">
            <div className="px-2 text-center">Border</div>
            <button type="button"
              name="borderColor"
              className="p-4 rounded-lg border-2"
              style={{ background: getStyle("borderColor") }}
              onClick={e => setAnchorEl(e.currentTarget)}>
            </button>
            <div className="flex flex-row w-full justify-center">
              width
              <span className="w-2/3 px-4">
                <Slider
                  size="small"
                  max={8}
                  step={0.1}
                  aria-label="Small"
                  onChange={(e, v) => setStyle("borderWidth", `${v}px`)}
                  value={Number(getStyle("borderWidth").replace("px", ""))}
                />
              </span>
            </div>
            <div className="flex flex-row w-full justify-center">
              radius
              <span className="w-2/3 px-4">
                <Slider
                  size="small"
                  max={30}
                  onChange={(e, v) => setStyle("borderRadius", `${v}px`)}
                  value={Number(getStyle("borderRadius").replace("px", ""))}
                />
              </span>
            </div>
          </div>

          {/* Shadow Edit Section */}
          <div className="my-2 w-full flex flex-col">
            <div className="px-2 text-center">Shadow</div>
            <button type="button"
              name="shadow"
              className="p-4 rounded-lg border-2"
              style={{ background: getShadowFragment(4) }}
              onClick={e => setAnchorEl(e.currentTarget)}>
            </button>
            <div className="flex flex-row w-full justify-center">
              offset x
              <span className="w-2/3 px-4">
                <Slider
                  size="small"
                  max={25}
                  min={-25}
                  onChange={(e, v) => setShadow(Number(v), 0)}
                  value={Number(getShadowFragment(0))}
                />
              </span>
            </div>
            <div className="flex flex-row w-full justify-center">
              offset y
              <span className="w-2/3 px-4">
                <Slider
                  size="small"
                  max={25}
                  min={-25}
                  onChange={(e, v) => setShadow(Number(v), 1)}
                  value={Number(getShadowFragment(1))}
                />
              </span>
            </div>
            <div className="flex flex-row w-full justify-center">
              blur
              <span className="w-2/3 px-4">
                <Slider
                  size="small"
                  max={25}
                  onChange={(e, v) => setShadow(Number(v), 2)}
                  value={Number(getShadowFragment(2))}
                />
              </span>
            </div>
            <div className="flex flex-row w-full justify-center">
              size
              <span className="w-2/3 px-4">
                <Slider
                  size="small"
                  max={getComponentType() === "Card" ? 10 : 15}
                  min={-5}
                  onChange={(e, v) => setShadow(Number(v), 3)}
                  value={Number(getShadowFragment(3))}
                />
              </span>
            </div>
          </div>
        </div>

        {/* Color Picker Pop Up */}
        <Popover
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <CompactPicker
            onChangeComplete={({ hex }) => setColorByAnchoredEl(hex)}
          />
        </Popover>
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