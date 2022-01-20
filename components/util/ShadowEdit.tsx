import UndoRounded from "@mui/icons-material/UndoRounded";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { RGBColor } from "react-color";
import { ComponentState, ComponentType } from "utils/types";
import ColorPicker from "./ColorPicker";
import EditSlider from "./EditSlider";

interface ShadowEditProps {
  shadows: string[]
  componentState: ComponentState
  componentType: ComponentType
  setStyle: Function
}

const DEFAULT_SHADOW = "0px 0px 0px 0px rgba(0,0,0,1)"
const SHADOW_SPLIT_REGEX = /,(?![^\(]*\))/
const MAX_SHADOWS_ALLOWED = 4

const ShadowEdit = (props: ShadowEditProps) => {

  const {componentState, componentType, setStyle} = props;
  const [shadows, setShadows] = useState<(string[])[]>([ [DEFAULT_SHADOW], [] , []]);
  const [selectedShadow, setSelectedShadow] = useState<number>(0)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>()

  useEffect( () => {
    setShadows(props.shadows.map(shadow => shadow ? splitShadows(shadow) : []))
  }, [props.shadows])

  useEffect( () => {
    if (!getShadows()[selectedShadow]) {
      setSelectedShadow(0)
    }
  },[shadows])

  const getShadowFragment = (index: number) => {
    if (selectedShadow >= getShadows().length) return
    const shadow = getShadows()[selectedShadow]
    const fragment = shadow.split(" ")[index]
    if (index === 4) return fragment
    return fragment.replace("px", "")
  }

  const setShadow = (value: number | string, index: number) => {
    const allShadows = [...shadows]
    const newShadows = [...getShadows()]
    const fragments = newShadows[selectedShadow].split(" ")
    fragments[index] = value + (index !== 4 ? "px" : '')
    newShadows[selectedShadow] = fragments.join(" ")
    allShadows[componentState] = newShadows
    setStyle("boxShadow", newShadows.join(","))
  }

  const addShadow = () => {
    setStyle("boxShadow", [...getShadows(), DEFAULT_SHADOW].join(","))
  }

  const getShadows = () => shadows[componentState].length > 0 ? shadows[componentState] : shadows[ComponentState.normal]

  const resetShadows = () => {
    setStyle("boxShadow", componentState === ComponentState.normal ? DEFAULT_SHADOW : null)
  }

  const splitShadows = (shadows: string) => {
    return shadows.split(SHADOW_SPLIT_REGEX)
  }

  return (
    <div className="edit-group">
      <div className="edit-group-header">
        <span>
          ❐ Shadow 
        </span>
        <IconButton
          size="small"
          children={<UndoRounded />}
          onClick={() => {setSelectedShadow(0);resetShadows()}}
        />
      </div>

      <div className="flex items-center w-full my-1">
        <div className="edit-label">
            color
        </div>

        <button type="button"
          name="shadow"
          className="p-2 rounded-lg border-2 w-3/4"
          style={{ background: getShadowFragment(4) }}
          onClick={e => setAnchorEl(e.currentTarget)}>
        </button>
      </div>

      <div className="flex items-center w-full my-1">
        <div className="edit-label">
          offset x
        </div>
        <EditSlider
          max={10}
          min={-10}
          onChange={(e, v) => setShadow(Number(v), 0)}
          value={Number(getShadowFragment(0))}
        />

      </div>
      <div className="flex items-center w-full my-1">
        <div className="edit-label">
          offset y
        </div>
        <EditSlider
          max={10}
          min={-10}
          onChange={(e, v) => setShadow(Number(v), 1)}
          value={Number(getShadowFragment(1))}
        />

      </div>
      <div className="flex items-center w-full my-1">
        <div className="edit-label">
          blur
        </div>
        <EditSlider
          max={25}
          onChange={(e, v) => setShadow(Number(v), 2)}
          value={Number(getShadowFragment(2))}
        />
      </div>
      <div className="flex items-center w-full my-1">
        <div className="edit-label">
          size
        </div>
        <EditSlider
          max={8}
          min={-5}
          onChange={(e, v) => setShadow(Number(v), 3)}
          value={Number(getShadowFragment(3))}
        />
      </div>

      <div className="flex items-center w-full my-1">
        <div className="edit-label">
          select
        </div>
        <Select
          className="w-3/4"
          value={selectedShadow}
          onChange={ event => setSelectedShadow(Number(event.target.value))}
          variant="standard"
          sx={{
            '& .MuiSelect-select': {
              padding: '1px 0px 1px 8px',
              fontSize: '14px'
            }
          }}
        >
          {getShadows().map( (shadow,index) => (
            <MenuItem 
              key={index} 
              value={index}
              style={{fontSize: '12px'}}
            >
              Box Shadow #{index + 1}
            </MenuItem>
          ))}
          {getShadows().length < MAX_SHADOWS_ALLOWED &&
          <MenuItem
            value={getShadows().length}
            style={{fontSize: '12px'}}
            onClick={() => addShadow()}
          >
            + Add Shadow
          </MenuItem>}
        </Select>
      </div>

      <ColorPicker
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(undefined)}
        onChange={(rgb: RGBColor) => setShadow(`rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`, 4)}
      />
    </div>
  )

}

export default ShadowEdit