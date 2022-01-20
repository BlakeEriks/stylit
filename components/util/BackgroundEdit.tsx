import UndoRounded from "@mui/icons-material/UndoRounded"
import IconButton from "@mui/material/IconButton"

interface BackgroundEditProps {
  getStyle: Function
  resetStyles: Function
  setAnchorEl: Function
}

const BackgroundEdit = ({getStyle, resetStyles, setAnchorEl}: BackgroundEditProps) => {
  return (
    <div className="edit-group">
      <div className="edit-group-header">
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
        <div className="edit-label">
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