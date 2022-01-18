import { Slider } from "@mui/material"

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
      className="w-3/4"
      size="small"
      sx={{
        '& .MuiSlider-rail': {
          color: 'var(--black)'
        },
        '& .MuiSlider-track': {
          color: 'var(--gold)'
        },
        '& .MuiSlider-thumb': {
          color: 'var(--gold)'
        },
        '& .MuiSlider-thumb:focus': {
          boxShadow: '0 0 0 8px rgb(219, 36, 56, 0.2);'
        },
        '& .MuiSlider-thumb:hover': {
          boxShadow: '0 0 0 8px rgb(219, 36, 56, 0.2);'
        },
        '& .MuiSlider-thumb:active': {
          boxShadow: '0 0 0 12px rgb(219, 36, 56, 0.2);'
        }
      }}
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