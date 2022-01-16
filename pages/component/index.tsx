import { Component, ComponentType } from "utils/types"
import Link from "next/link"
import Explorer from '../../components/Explorer';

// define the page component
const Index = ({components}: {components: Component[]}) => {
  return (
    <Explorer components={components} />
  )
}

// GET PROPS FOR SERVER SIDE RENDERING
export async function getServerSideProps() {
  // get component data from API
  const res = await fetch(process.env.API_URL + "/components" as string)
  console.log(res)
  const components = await res.json()

  // return props
  return {
    props: { components },
  }
}

export default Index