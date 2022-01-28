/** @jsxImportSource @emotion/react */
import { CircularProgress } from "@mui/material"
import SubHero from "components/SubHero"
import _PublishedComponent from "components/_PublishedComponent"
import Image from "next/image"
import asset from "public/img/bookmarks.svg"
import { useEffect, useState } from "react"
import { useStarred } from "utils/stars"
import { PublishedComponent } from "utils/types"

const Starred = () => {

  const [components, setComponents] = useState<PublishedComponent[]>([])
  const {starred} = useStarred()
  const [loading, setLoading] = useState(false)

  const updateComponents = async () => {
    if (!starred || !starred.length) {
      setLoading(false)
      return
    }
    fetch(`/api/components?id=${starred.join(',')}`).then(res => res.json())
      .then(components => {
        setComponents(components)
        setLoading(false)
      })
  }

  useEffect( () => {
    setLoading(true)
    updateComponents()
  }, [])

  useEffect( () => {
    updateComponents()
  }, [starred])

  return (
    <>
      <SubHero />
      <div className="w-full flex flex-col bg-offWhite min-h-[60vh]">
        <div className="flex flex-col md:flex-row justify-center items-center p-4">
          <div className="animate__animated animate__fadeInLeft">
            <div className="text-3xl font-semibold">
              Your Starred Components
            </div>
            <div className="text-grey-600">
              All your favs from across the galaxy whenever you need them.
            </div>
          </div>
          <div className="md:w-1/2 p-6 animate__animated animate__fadeInRight max-w-[400px]">
            <Image src={asset} priority/>
          </div>
        </div>
        {/* MAPPING OVER THE COMPONENTS */}
        <div className="flex flex-row flex-wrap justify-evenly items-center pt-6">
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

export default Starred