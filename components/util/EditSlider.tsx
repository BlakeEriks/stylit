import Slider from "@mui/material/Slider"

interface EditSliderProps {
  min?: number
  max?: number
  step?: number
  onChange: (event: Event, value: number | number[]) => void
  value: number
}

const EditSlider = ({min, max, step, onChange, value}: EditSliderProps ) => {
  return (
    <Slider
      className="w-3/4 transition-all duration-75"
      size="small"
      max={max}
      min={min}
      step={step}
      aria-label="Small"
      onChange={onChange}
      value={value}
    />
  )
}

export default EditSlider