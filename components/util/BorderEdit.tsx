import { UndoRounded } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import EditSlider from "./EditSlider"

interface BorderEditProps {
  getStyle: Function
  resetStyles: Function
  setStyle: Function
  setAnchorEl: Function
}

const BorderEdit = ({getStyle, resetStyles, setStyle, setAnchorEl}: BorderEditProps) => {
  return (
    <div className="my-2 w-full">
      <div className="text-xl font-medium border-b flex justify-between items-end">
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
        <div className="w-1/4">
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
        <div className="w-1/4">
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
        <div className="w-1/4">
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