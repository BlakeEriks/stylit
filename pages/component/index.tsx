import { Component, ComponentType } from "utils/types"
import Link from "next/link"
import Explorer from '../../components/Explorer';

// define the page component
const Index = ({url}: {url: string}) => {
  return (
    <Explorer url={url} />
  )
}

// GET PROPS FOR SERVER SIDE RENDERING
export async function getServerSideProps() {
  // get component data from API
  const url = process.env.API_URL

  // return props
  return {
    props: { url }
  }
}

export default Index