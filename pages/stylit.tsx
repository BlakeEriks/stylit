import { createTheme, ThemeProvider } from "@mui/material";
import Aos from "aos";
import Footer from "components/Footer";
import Header from "components/Header";
import MetaTags from "components/MetaTags";
import { useEffect } from "react";
import { useDarkModeState } from "utils/darkMode";

const Stylit = ({children}: any) => {

  const {darkMode, setDarkMode} = useDarkModeState()
  const mode = darkMode ? "dark" : "light";

  useEffect( () => {
    Aos.init()
  }, [])

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main:'#0ea5e9',
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className={`${darkMode ? "dark" : "light"} bg-gradient-to-bl from-pink-900 via-grey-800 to-yellow-600 flex flex-col items-center `}>
        <MetaTags />
        <Header />
        {children}
        <Footer/>
      </div>
    </ThemeProvider>
  )
}

export default Stylit