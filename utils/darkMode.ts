import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';

const darkModeState = atom<boolean>({
    key: 'darkModeState',
    default: false
})

export const useDarkModeState = () => {
  const [darkMode, setDarkMode] = useRecoilState(darkModeState)
  useEffect( () => {
    setDarkMode(Boolean(JSON.parse(localStorage.getItem("darkMode") || "false")))
  }, [])

  return {darkMode, setDarkMode: (val: boolean) => {window.localStorage.setItem("darkMode", JSON.stringify(val)); setDarkMode(val)}}
}