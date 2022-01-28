import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLiked } from "utils/liked";
import { useStarred } from "utils/stars";
import { ComponentType, PublishedComponent } from "utils/types";
import ExploreHeader from "./ExploreHeader";
import _PublishedComponent from "./_PublishedComponent";
var _ = require('lodash');

const Explorer = () => {

  const router = useRouter()
  const [components, setComponents] = useState<PublishedComponent[]>([])
  const [componentType, setComponentType] = useState<ComponentType>(Number(router.query.type) as ComponentType || ComponentType.Button)
  const [sort, setSort] = useState<string>(router.query.sort as string || "Popular")
  const [loading, setLoading] = useState(false)
  const {liked} = useLiked()
  const {starred} = useStarred()

  const sortComponents = (components: PublishedComponent[]) => {
    if (sort === "Popular") {
      components.sort((a,b) => b.likes - a.likes)
    }
    if (sort === "Newest") {
      components.sort( (a,b) => new Date(b.createdAt!).getTime() -  new Date(a.createdAt!).getTime() )
    }
    if (sort === "Oldest") {
      components.sort( (a,b) => new Date(a.createdAt!).getTime() -  new Date(b.createdAt!).getTime())
    }
  }

  const updateComponents = async () => {
    return fetch(`/api/components?type=${componentType}`)
      .then( res => res.json())
      .then(components => {
        sortComponents(components)
        setComponents(components)
        setLoading(false)
      })
  }

  useEffect(() => {
    setSort(router.query.sort as string || "Popular")
    setComponentType(Number(router.query.type) as ComponentType || ComponentType.Button)
  }, [router.query])

  useEffect( () => {
    setLoading(true)
    updateComponents()
  },[componentType, sort])
  
  useEffect( () => {
    updateComponents()
  },[starred, liked])

  return (
    <div className="flex items-center flex-col p-8 w-full min-h-[100vh] bg-offWhite overflow-auto dark:bg-grey-800">
      <ExploreHeader 
        componentType={componentType}
        setComponentType={setComponentType}
        sort={sort}
        setSort={setSort}
      />

      {/* MAPPING OVER THE COMPONENTS */}
      <div className="flex flex-row flex-wrap justify-evenly items-center pt-6">
        {loading ? <CircularProgress size={80}/> :
        components.map( (component, key) => (
          <_PublishedComponent
            key={key}
            {...component}
          />))}
      </div>
    </div>
  )
}

export default Explorer