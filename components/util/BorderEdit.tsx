import UndoRounded from "@mui/icons-material/UndoRounded"
import IconButton from "@mui/material/IconButton"
import EditSlider from "./EditSlider"

interface BorderEditProps {
  getStyle: Function
  resetStyles: Function
  setStyle: Function
  setAnchorEl: Function
}

const BorderEdit = ({getStyle, resetStyles, setStyle, setAnchorEl}: BorderEditProps) => {
  return (
    <div className="edit-group">
      <div className="edit-group-header">
        <span>
          🧱 Border
        </span>
        <IconButton
          size="small"
          children={<UndoRounded />}
          onClick={() => resetStyles("border")}
        />
      </div>

      <div className="flex items-center w-full my-1">
        <div className="edit-label">
            color
        </div>

        <button type="button"
          name="borderColor"
          className="p-2 rounded-lg border-2 w-3/4"
          style={{ background: getStyle("borderColor") }}
          onClick={e => setAnchorEl(e.currentTarget)}>
        </button>
      </div>
      
      <div className="flex items-center w-full my-1">
        <div className="edit-label">
          width
        </div>
        <EditSlider
          max={8}
          step={0.1}
          onChange={(e, v) => setStyle("borderWidth", `${v}px`)}
          value={Number(getStyle("borderWidth").replace("px", ""))}
        />
      </div>

      <div className="flex items-center w-full my-1">
        <div className="edit-label">
          radius
        </div>
        <EditSlider
          max={30}
          onChange={(e, v) => setStyle("borderRadius", `${v}px`)}
          value={Number(getStyle("borderRadius").replace("px", ""))}
        />
      </div>
    </div>
  )
}

export default BorderEdit