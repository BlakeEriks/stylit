import { atom, useRecoilState } from 'recoil';

const likedState = atom<string[]>({
    key: 'likedState',
    default: []
})

export const useLiked = () => {

  const [liked, setLiked] = useRecoilState(likedState)

  const toggleLike = async ( _id: string, likes: number) => {
    const isLiked = (liked.some(like => like === _id))
    const newLikes = likes + (isLiked ? -1 : 1)
    await fetch(`api/components/${_id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({likes: newLikes}),
    })
    const updatedLikes = isLiked ? [...liked.filter(like => like !== _id!)] : [...liked, _id!]
    setLiked(updatedLikes)
    window.localStorage.setItem("likes", JSON.stringify(updatedLikes))

  }

  return {liked, toggleLike, setLiked}
}