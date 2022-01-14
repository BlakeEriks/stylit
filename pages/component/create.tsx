import { useRouter } from "next/router"
import { ChangeEvent, FormEventHandler, useRef, useState } from "react"
import { Component, ComponentType } from "utils/types"
import { CompactPicker, TwitterPicker } from 'react-color';
import { MenuItem, Popover, Select, Slider, ToggleButton, ToggleButtonGroup } from "@mui/material";

// Define props
interface CreateComponentProps {
  url: string
}

interface Styles {
  color: string
  fontSize: string
  fontWeight: string
  fontFamily: string
  letterSpacing: string
  background: string
  borderColor: string
  borderWidth: string
  padding: string
  borderRadius: string
  boxShadow: string
}

const fontOptions = ["Montserrat", "Open Sans", "Raleway", "Roboto"]

// Define Component
const Create = (props: CreateComponentProps) => {

  // get the next route
  const router = useRouter()
  const [styles, setStyles] = useState<Styles>({
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
    boxShadow: "0px 0px 0px 0px #000000"
  })
  const [componentType, setComponentType] = useState(ComponentType.Button)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // Function to create new component
  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    // construct new component
    let component: Component = { creator_id: "61dcce4e2fa77b6e4b654bd7", type: componentType, styles: styles, likes: { count: 0, users: [] } }
  
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

  const getPadding = (axis: string) => Number(styles.padding.split(" ")[axis === 'x' ? 1 : 0].replace("px", ""))

  const getShadowFragment = (index: number) => {
    const fragment = styles.boxShadow.split(" ")[index]
    if (index === 4) return fragment
    return fragment.replace("px", "")
  }

  const setShadow = (value: number | string, index: number) => {
    const fragments = styles.boxShadow.split(" ")
    fragments[index] = value + (index !== 4 ? "px" : '')
    setStyles({ ...styles, boxShadow: fragments.join(" ") })
  }

  const setColorByAnchoredEl = (hex: string) => {
    if (!anchorEl) return
    const name = anchorEl.getAttribute("name")
    if (!name) return
    if (name === "shadow") {
      setShadow(hex, 4)
    }
    else {
      setStyles({ ...styles, [name]: hex })
    }
  }

  const getComponentType = () => ComponentType[componentType]

  return (
    <div className="border w-full h-5/6 p-8 flex flex-col justify-center mx-auto max-w-[1000px]">
      <h1 className="text-center md:text-teal-600">Create a New Component</h1>

      <form onSubmit={handleSubmit} className="flex flex-row">

        {/* Left Side Edit Panel */}
        <div className="flex flex-col items-center justify-evenly w-1/3 p-4">

          {/* Font Edit Section */}
          <div className="my-2 w-full flex flex-col">
            <div className="px-2 text-center">Font</div>
            <button type="button"
              name="color"
              className="p-4 rounded-lg border-2"
              style={{ background: styles.color }}
              onClick={e => setAnchorEl(e.currentTarget)}>
            </button>

            <div className="flex flex-row w-full justify-center">
              size
              <span className="w-2/3 px-4">
                <Slider
                  size="small"
                  max={40}
                  min={10}
                  aria-label="Small"
                  onChange={(e, v) => setStyles({ ...styles, fontSize: `${v}px` })}
                  value={Number(styles.fontSize.replace("px", ""))}
                  />
              </span>
            </div>

            <div className="flex flex-row w-full justify-center">
              weight
              <span className="w-2/3 px-4">
                <Slider
                  size="small"
                  max={900}
                  min={100}
                  step={100}
                  onChange={(e, v) => setStyles({ ...styles, fontWeight: `${v}` })}
                  value={Number(styles.fontWeight)}
                  />
              </span>
            </div>
            
            <div className="flex flex-row w-full justify-center">
              spacing
              <span className="w-2/3 px-4">
                <Slider
                  size="small"
                  max={20}
                  onChange={(e, v) => setStyles({ ...styles, letterSpacing: `${v}px` })}
                  value={Number(styles.letterSpacing.replace("px",""))}
                  />
              </span>
            </div>

            <Select
              value={styles.fontFamily.split(",")[0]}
              onChange={ event => (
                setStyles({...styles, fontFamily: `${event.target.value}, sans-serif`}))}
                displayEmpty
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

          {/* Background Edit Section */}
          <div className="my-2">
            <span className="px-2">Background:</span>
            <button type="button"
              name="background"
              className="p-4 rounded-lg border-2"
              style={{ background: styles.background }}
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
                  onChange={(e, v) => setStyles({ ...styles, padding: `${styles.padding.split(" ")[0]} ${v}px` })}
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
                  onChange={(e, v) => setStyles({ ...styles, padding: `${v}px ${styles.padding.split(" ")[1]}` })}
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
            onChange={(e,v) => setComponentType(v)}
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
          
          <div className="component-container">
            {ComponentType[componentType] === "Button" &&
              <button 
                style={styles} 
                className="transition-all duration-150 ease-linear">
                Button
              </button>
            }
            {ComponentType[componentType] === "Input" &&
              <input 
                style={styles} 
                placeholder="input..." 
                className="transition-all duration-150 ease-linear w-5/6"  
              />
            }
            {ComponentType[componentType] === "Card" &&
              <div
                style={styles}
                className="flex items-center justify-center card"
              >
                Card
              </div>
            }
          </div>

          {/* Save Component */}
          <button 
            type="submit"
            className="border rounded-2xl px-6 py-2 my-4"
          >
            Save
          </button>
        </div>

        {/* Edit the component on the right */}
        <div className="flex flex-col items-center w-1/3 p-4">

          {/* Border Edit Section */}
          <div className="my-2 w-full flex flex-col">
            <div className="px-2 text-center">Border</div>
            <button type="button"
              name="borderColor"
              className="p-4 rounded-lg border-2"
              style={{ background: styles.borderColor }}
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
                  onChange={(e, v) => setStyles({ ...styles, borderWidth: `${v}px` })}
                  value={Number(styles.borderWidth.replace("px", ""))}
                />
              </span>
            </div>
            <div className="flex flex-row w-full justify-center">
              radius
              <span className="w-2/3 px-4">
                <Slider
                  size="small"
                  max={30}
                  onChange={(e, v) => setStyles({ ...styles, borderRadius: `${v}px` })}
                  value={Number(styles.borderRadius.replace("px", ""))}
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

        {/* Color Picker Pop O */}
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