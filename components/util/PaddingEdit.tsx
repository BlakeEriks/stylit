import UndoRounded from "@mui/icons-material/UndoRounded"
import IconButton from "@mui/material/IconButton"
import EditSlider from "./EditSlider"

interface PaddingEditProps {
  getStyle: Function
  resetStyles: Function
  setStyle: Function
}

const PaddingEdit = ({getStyle, resetStyles, setStyle}: PaddingEditProps) => {

  const getPadding = (axis: string) => Number(getStyle("padding").split(" ")[axis === 'x' ? 1 : 0].replace("px", ""))

  return (
    <div className="edit-group">
      <div className="edit-group-header">
        <span>
        👌 Padding
        </span>
        <IconButton
          size="small"
          onClick={() => resetStyles("padding")}
        >
          <UndoRounded />
        </IconButton>
      </div>
      
      <div className="flex items-center w-full my-1">
        <div className="edit-label">
          x
        </div>
        <EditSlider
          max={40}
          step={2}
          onChange={(e, v) => setStyle("padding", `${getStyle("padding").split(" ")[0]} ${v}px`)}
          value={getPadding("x")}
        />
      </div>
      <div className="flex items-center w-full my-1">
        <div className="edit-label">
          y
        </div>
        <EditSlider
          max={30}
          step={2}
          onChange={(e, v) => setStyle("padding", `${v}px ${getStyle("padding").split(" ")[1]}`)}
          value={getPadding("y")}
        />
      </div>
    </div>
  )
}

export default PaddingEdit