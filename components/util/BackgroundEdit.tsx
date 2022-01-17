import { IconButton } from "@mui/material"
import { UndoRounded } from "@mui/icons-material"
import { StyleGroups, Styles } from "utils/types"

interface BackgroundEditProps {
  getStyle: Function
  resetStyles: Function
  setAnchorEl: Function
}

const BackgroundEdit = ({getStyle, resetStyles, setAnchorEl}: BackgroundEditProps) => {
  return (
    <div className="my-2 w-full flex flex-col mx-2">
      <div className="text-xl font-medium border-b flex justify-between items-end">
        <span>
        🌈 Background
        </span>
        <IconButton
          size="small"
          children={<UndoRounded />}
          onClick={() => resetStyles("background")}
        />
      </div>

      <div className="flex items-center w-full my-1">
        <div className="w-1/4">
          color
        </div>
        <button type="button"
          name="background"
          className="p-2 rounded-lg border-2 w-3/4"
          style={{ background: getStyle("background") }}
          onClick={e => setAnchorEl(e.currentTarget)}>
        </button>
      </div>
    </div>
  )
}

export default BackgroundEdit