import { createTheme, ThemeProvider } from "@mui/material";
import Aos from "aos";
import Footer from "components/Footer";
import Header from "components/Header";
import MetaTags from "components/MetaTags";
import { useEffect } from "react";
import { useDarkModeState } from "utils/darkMode";
import { useLiked } from "utils/liked";
import { useStarred } from "utils/stars";

const Stylit = ({children}: any) => {

  const {darkMode, setDarkMode} = useDarkModeState()
  const {setStarred} = useStarred()
  const {setLiked} = useLiked()
  const mode = darkMode ? "dark" : "light";

  useEffect( () => {
    Aos.init()
    setStarred(JSON.parse(localStorage.getItem("stars") || "[]"))
    setLiked(JSON.parse(localStorage.getItem("likes") || "[]"))
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
      <div className={`${darkMode ? "dark" : "light"} bg-gradient-to-bl from-pink-900 via-[#1d2241] to-yellow-600 flex flex-col items-center `}>
        <MetaTags />
        <Header />
        {children}
        <Footer/>
      </div>
    </ThemeProvider>
  )
}

export default Stylit