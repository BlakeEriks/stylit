import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton, MenuItem, Select } from "@mui/material";
import { useDarkModeState } from "utils/darkMode";
import { ComponentType } from "utils/types";

interface ExploreHeaderProps {
  componentType: ComponentType
  setComponentType: Function
  sort: string
  setSort: Function
}

const ExploreHeader = ({componentType, setComponentType, sort, setSort}: ExploreHeaderProps) => {

  const {darkMode, setDarkMode} = useDarkModeState()

  return(
    <div className="flex justify-between items-center bg-white w-full p-4 px-8 rounded-lg border border-grey-400  dark:bg-grey-600">
      <div className="flex items-center w-1/4 my-1 text-xl">
        <IconButton
          size="large"
          onClick={() => setDarkMode(!darkMode)}
        >
        {
          darkMode ?
            <DarkModeIcon 
              fontSize="large" 
              color="primary"
            />
          :
            <LightModeIcon
              fontSize="large" 
              color="primary"
            />
          }
        </IconButton>
        <div className="flex items-center text-black dark:text-white">
          <div className="mr-2">
            Type:
          </div>
          <Select
            color="primary"
            value={componentType}
            onChange={ event => setComponentType(event.target.value)}
            className="text-xl"
            sx={{
              '& .MuiSelect-select': {
                padding: '3px 0px 3px 8px',
              }
            }}
          >
            <MenuItem
              value={ComponentType.Button}
            >
                Button
            </MenuItem>
            <MenuItem
              value={ComponentType.Input}
            >
                Input
            </MenuItem>
            <MenuItem
              value={ComponentType.Card}
            >
                Card
            </MenuItem>
          </Select>
        </div>
        </div>
      <div className="flex items-end text-5xl pt-2 uppercase font-bold bg-gradient-to-r from-sky-500 via-fuchsia-600 to-orange-600 text-transparent bg-clip-text">
        Explorer
      </div>
      <div className="flex flex-row justify-end w-1/4 dark:text-white">
        <button className={"text-xl mx-2 cursor-pointer transition- duration-200 " + (sort === "Popular" ? "text-sky-500 font-bold" : "hover:text-sky-300 focus:text-sky-300")} onClick={() => setSort("Popular")}>
          Popular
        </button>
        <button className={"text-xl mx-2 cursor-pointer transition-all duration-200 " + (sort === "Newest" ? "text-sky-500 font-bold" : "hover:text-sky-300 focus:text-sky-300")} onClick={() => setSort("Newest")}>
          Newest
        </button>
        <button className={"text-xl mx-2 cursor-pointer transition-all duration-200 " + (sort === "Oldest" ? "text-sky-500 font-bold" : "hover:text-sky-300 focus:text-sky-300")} onClick={() => setSort("Oldest")}>
          Oldest
        </button>        
      </div>
    </div>
  )
}

export default ExploreHeader