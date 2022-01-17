import { UndoRounded } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import EditSlider from "./EditSlider"

interface PaddingEditProps {
  getStyle: Function
  resetStyles: Function
  setStyle: Function
}

const PaddingEdit = ({getStyle, resetStyles, setStyle}: PaddingEditProps) => {

  const getPadding = (axis: string) => Number(getStyle("padding").split(" ")[axis === 'x' ? 1 : 0].replace("px", ""))

  return (
    <div className="my-2 w-full">
      <div className="text-xl font-medium border-b flex justify-between items-end">
        <span>
        👌 Padding
        </span>
        <IconButton
          size="small"
          children={<UndoRounded />}
          onClick={() => resetStyles("padding")}
        />
      </div>
      
      <div className="flex items-center w-full my-1">
        <div className="w-1/4">
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
        <div className="w-1/4">
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