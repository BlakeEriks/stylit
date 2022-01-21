import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import { ComponentType } from "utils/types"
import Btn from "./Btn"

interface ExploreHeaderProps {
  filter: {[index in ComponentType]: boolean}
  setFilter: Function
}

const ExploreHeader = ({filter, setFilter}: ExploreHeaderProps) => {

  return(
    <div className="flex justify-between items-center bg-white w-full p-4 rounded-lg">
      <FormGroup className="flex flex-row items-center">
        <FormControlLabel 
          control={
            <Checkbox 
              onChange={event => setFilter({...filter, [ComponentType.Button]: event.target.checked})}
              value={filter[ComponentType.Button]}
              color='secondary'
              defaultChecked
            />
          } 
          label="Buttons"
          className="m-0 hover:bg-gold hover:bg-opacity-20 pl-3 rounded-lg"
          labelPlacement="start"
        />
        <FormControlLabel 
          control={
            <Checkbox 
              onChange={event => setFilter({...filter, [ComponentType.Input]: event.target.checked})} 
              value={filter[ComponentType.Input]}
              color='secondary'
              defaultChecked
            />
          } 
          label="Inputs"
          className="m-0 hover:bg-gold hover:bg-opacity-20 pl-3 rounded-lg"
          labelPlacement="start"
        />
        <FormControlLabel 
          control={
            <Checkbox 
              onChange={event => setFilter({...filter, [ComponentType.Card]: event.target.checked})} 
              value={filter[ComponentType.Card]} 
              color='secondary'
              defaultChecked
            />
          } 
          label="Cards"
          className="m-0 hover:bg-gold hover:bg-opacity-20 pl-3 rounded-lg"
          labelPlacement="start"
        />
      </FormGroup>
      <div className="flex flex-row">
        <Btn>
          Popular
        </Btn>
        <Btn>
          Newest
        </Btn>
        <Btn>
          Oldest
        </Btn>
      </div>
    </div>
  )
}

export default ExploreHeader