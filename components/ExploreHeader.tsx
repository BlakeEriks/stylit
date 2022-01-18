import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import Btn from "./Btn"

interface ExploreHeaderProps {
  filter: {
    button: boolean,
    input: boolean,
    card: boolean
  }
  setFilter: Function
}

const ExploreHeader = ({filter, setFilter}: ExploreHeaderProps) => {

  return(
    <div className="flex justify-between items-center bg-white w-11/12 p-4 rounded-xl">
      <FormGroup className="flex flex-row items-center">
        <FormControlLabel 
          control={
            <Checkbox 
              onChange={event => setFilter({...filter, button: event.target.checked})}
              value={filter.button}
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
              onChange={event => setFilter({...filter, input: event.target.checked})} 
              value={filter.input}
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
              onChange={event => setFilter({...filter, card: event.target.checked})} 
              value={filter.card} 
              color='secondary'
              defaultChecked
            />
          } 
          label="Cards"
          className="m-0 hover:bg-gold hover:bg-opacity-20 pl-3 rounded-lg"
          labelPlacement="start"
        />
      </FormGroup>
      <div>
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