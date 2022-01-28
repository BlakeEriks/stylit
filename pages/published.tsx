/** @jsxImportSource @emotion/react */
import { CircularProgress } from "@mui/material"
import SubHero from "components/SubHero"
import _PublishedComponent from "components/_PublishedComponent"
import Image from "next/image"
import { useRouter } from "next/router"
import asset from "public/img/asset-3.svg"
import { useEffect, useState } from "react"
import { useLiked } from "utils/liked"
import { useStarred } from "utils/stars"
import { PublishedComponent } from "utils/types"
import { useUserState } from "utils/user"

const Published = () => {
  
  const {user} = useUserState()
  const router = useRouter()
  const [components, setComponents] = useState<PublishedComponent[]>([])
  const [loading, setLoading] = useState(false)
  const {starred} = useStarred()
  const {liked} = useLiked()

  const updateComponents = async () => {
    const res = await fetch(`/api/components?creator=${user.id}`)
    setLoading(false)
    setComponents(await res.json())
  }

  useEffect(() => {
    if (!user) {
      router.push('/')
      return
    }
    setLoading(true)
    updateComponents()
  }, [])

  useEffect( () => {
    updateComponents()
  },[starred, liked])

  return (
    <>
      <SubHero />
      <div className="w-full flex flex-col bg-offWhite min-h-[60vh]">
        <div className="flex justify-center items-center">
          <div className="animate__animated animate__fadeInLeft">
            <div className="text-3xl font-semibold">
              Your Published Components
            </div>
            <div className="text-grey-600">
              This is where you can come to view all of your masterpieces!
            </div>
          </div>
          <div className="w-1/2 p-6 animate__animated animate__fadeInRight max-w-[400px]">
            <Image src={asset} priority/>
          </div>
        </div>
        {/* MAPPING OVER THE COMPONENTS */}
        <div className="flex flex-row flex-wrap justify-evenly items-start pt-6">
          {loading ? <CircularProgress size={80}/> : 
          components.map( (component, key) => (
            <_PublishedComponent
              key={key}
              {...component}
            />))
          }
        </div>
      </div>
    </>
  )
}

export default Published