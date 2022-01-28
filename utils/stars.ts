import { atom, useRecoilState } from 'recoil';

const starredState = atom<string[]>({
    key: 'starredState',
    default: []
})

export const useStarred = () => {
  const [starred, setStarred] = useRecoilState(starredState)
  
  const toggleStar = (componentId: string) => {
    const newStars = starred.some(star => star === componentId) ? [...starred.filter(star => star !== componentId)] : [...starred, componentId]
    setStarred(newStars)
    window.localStorage.setItem("stars", JSON.stringify(newStars))
  }

  return {starred, toggleStar, setStarred}
}