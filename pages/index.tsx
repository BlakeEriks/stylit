import Explorer from 'components/Explorer';
import Hero from 'components/Hero'
import type { NextPage } from 'next'
import Features from '../components/Features';
import { Component } from 'utils/types';

const Home = ({components}: {components: Component[]}) => {
  return (
    <>
      <Hero />
      <Features />
      <Explorer components={components} />
    </>
  )
}

// GET PROPS FOR SERVER SIDE RENDERING
export async function getServerSideProps() {
  // get component data from API
  const res = await fetch(process.env.API_URL + "/components" as string)
  const components = await res.json()

  // return props
  return {props: { components }}
}

export default Home
