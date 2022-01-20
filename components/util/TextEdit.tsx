import UndoRounded from "@mui/icons-material/UndoRounded"
import IconButton from "@mui/material/IconButton"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import EditSlider from "./EditSlider"

interface TextEditProps {
  getStyle: Function
  resetStyles: Function
  setStyle: Function
  setAnchorEl: Function
}

const fontOptions = ["Montserrat", "Open Sans", "Raleway", "Roboto"]

const TextEdit = ({getStyle, resetStyles, setStyle, setAnchorEl}: TextEditProps) => {
  
  return (
    <div className="my-2 w-full flex flex-col mx-2">

      <div className="text-xl font-medium border-b flex justify-between items-end">
        <span>
          ✍🏼 Text
        </span>
        <IconButton
          size="small"
          children={<UndoRounded />}
          onClick={() => resetStyles("text")}
        />
      </div>

      <div className="flex items-center w-full my-1">
        <div className="edit-label">
          font
        </div>
        <Select
          className="w-3/4"
          color="secondary"
          value={getStyle("fontFamily").split(",")[0]}
          onChange={ event => (
            setStyle("fontFamily", `${event.target.value}, sans-serif`))}
          variant="standard"
          sx={{
            '& .MuiSelect-select': {
              padding: '1px 0px 1px 8px',
              fontSize: '14px'
            }
          }}
        >
          {fontOptions.map(font => (
            <MenuItem 
            key={font} 
            value={font}
            style={{fontFamily: `${font}, sans-serif`, fontWeight: "600", fontSize: '12px'}}
            >
              {font}
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className="flex items-center w-full my-1">
        <div className="edit-label">
          color
        </div>
        <button type="button"
          name="color"
          className="p-2 rounded-lg border-2 w-3/4"
          style={{ background: getStyle("color") }}
          onClick={e => setAnchorEl(e.currentTarget)}>
        </button>
      </div>

      <div className="flex items-center w-full my-1">
        <div className="edit-label">
          size
        </div>
        <EditSlider
          max={40}
          min={20}
          step={2}
          onChange={(e: Event, v: number | number[]) => setStyle("fontSize", `${v}px`)}
          value={Number(getStyle("fontSize").replace("px", ""))}
        />
      </div>

      <div className="flex items-center w-full my-1">
        <div className="edit-label">
          weight
        </div>
        <EditSlider
          max={900}
          min={100}
          step={100}
          onChange={(e, v) => setStyle("fontWeight", v.toString())}
          value={Number(getStyle("fontWeight"))}
        />
      </div>
      
      <div className="flex items-center w-full my-1">
        <div className="edit-label">
          space
        </div>
        <EditSlider
          max={10}
          onChange={(e, v) => setStyle("letterSpacing", v + 'px')}
          value={Number(getStyle("letterSpacing").replace("px",""))}
        />
      </div>
    </div>
  )
}

export default TextEdit