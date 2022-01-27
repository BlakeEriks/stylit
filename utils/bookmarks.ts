import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';

const bookmarkState = atom<string[]>({
    key: 'bookmarkState',
    default: []
})

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useRecoilState(bookmarkState)
  useEffect( () => {
    setBookmarks(JSON.parse(localStorage.getItem("bookmarks") || "[]"))
  }, [])

  return {bookmarks, setBookmarks: (val: string[]) => {window.localStorage.setItem("bookmarks", JSON.stringify(val)); setBookmarks(val)}}
}