/** @jsxImportSource @emotion/react */
import { Interpolation, Theme } from "@emotion/react"
import { formatDistance } from "date-fns"
import Image from "next/image"
import { FaHeart, FaStar } from "react-icons/fa"
import { FiCopy, FiHeart, FiStar } from "react-icons/fi"
import { useLiked } from "utils/liked"
import { useStarred } from "utils/stars"
import { ComponentType, PublishedComponent } from "utils/types"
import Btn from "./Btn"

const _PublishedComponent = ({_id, name, type, likes, stylesMap, creator, createdAt}: PublishedComponent) => {

  const {liked, toggleLike} = useLiked()
  const {starred, toggleStar} = useStarred()

  return (
    <div
      className="bg-gradient-to-br from-pink-500 via-rose-500 to-sky-500 p-1 m-3 transition-all duration-150 ease-linear hover:scale-105 group rounded-xl"
      data-aos="fade-left"
    >
      <div className="component-card relative">
        <div className="text-center font-body py-2 text-xl font-semibold uppercase bg-gradient-to-r from-fuchsia-500 to-teal-500 text-transparent bg-clip-text">
          {name}
        </div>
        <div className="component-container">
          {ComponentType[type] === ComponentType[ComponentType.Button] && 
            <button
              css={stylesMap as Interpolation<Theme>}
            >
              Button
            </button>
          }
          {ComponentType[type] === ComponentType[ComponentType.Input] && 
            <input
              className="min-w-0 w-full max-w-[200px]"
              maxLength={10}
              css={stylesMap as Interpolation<Theme>} 
              placeholder="input..." 
            />
          }
          {ComponentType[type] === ComponentType[ComponentType.Card] && 
            <div 
              css={stylesMap as Interpolation<Theme>}
              className="card"
            >
              Card
            </div>
          }
        </div>
        <div className="flex justify-between items-center w-full p-1 dark:text-offWhite" >
          <div className="flex items-center">
            <Image src={creator.photoURL} height={30} width={30} alt="profile" className="rounded-full"/>
            <div className="space-y-0 leading-none ml-2 pt-1 text-gray-600">
              <div className="text-sm -mb-1">
                {creator.displayName.split(' ')[0] + " " + creator.displayName.split(' ')[1][0]}.
              </div>

              <div className="font-light italic text-xs -mt-4">
                {formatDistance(new Date(), new Date(createdAt))} ago
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <span className="align-text-bottom pt-1">
              {likes}
            </span>
            <Btn
              className="text-pink-300 !p-1 shadow-none text-lg cursor-pointer rounded-full hover:scale-125 focus:scale-125 transition-all duration-200" 
              onClick={() => toggleLike(_id, likes)}
            >
              {liked.includes(_id) ?
                <FaHeart className="animate__animated animate__heartBeat text-pink-400"/>
              :
                <FiHeart />
              }
            </Btn>
          </div>
        </div>
        <Btn 
          className="absolute top-2 left-1 p-1 shadow-none cursor-pointer opacity-0 group-hover:opacity-100 hover:scale-125 transition-all duration-200"
          onClick={() => navigator.clipboard.writeText(JSON.stringify(stylesMap, null, "\t"))} 
        >
          <FiCopy className="text-lg text-gray animate__animated animate__heartBeat"/>
        </Btn>
        <Btn
          className="absolute top-2 right-1 p-1 shadow-none cursor-pointer opacity-0 group-hover:opacity-100 hover:scale-125 focus:scale-125 transition-all duration-200"
          onClick={() => toggleStar(_id)}
        >
          {starred.includes(_id) ?
            <FaStar className="text-[#F5BA31] animate__animated animate__heartBeat"/>
            :
            <FiStar className="text-gray animate__animated animate__heartBeat"/>
          }
        </Btn>
      </div>
    </div>
  )
}

export default _PublishedComponent