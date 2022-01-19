import Popover from "@mui/material/Popover";
import { useState } from "react";
import { ChromePicker, Color, ColorResult } from "react-color";

interface ColorPickerProps {
  anchorEl: HTMLElement | undefined
  onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void
  onChange: Function
}

const ColorPicker = ({anchorEl, onClose, onChange}: ColorPickerProps) => {

  const [color, setColor] = useState<Color | undefined>(undefined)
  
  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <ChromePicker
        color={color}
        onChange={({rgb}: ColorResult) => {setColor(rgb);onChange(rgb)}}
      />
    </Popover>
  )
}

export default ColorPicker