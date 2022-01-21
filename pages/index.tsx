import Explorer from 'components/Explorer';
import Hero from 'components/Hero';
import Features from '../components/Features';

// interface IndexProps{
//   url: string
// }

const Home = () => {
// const Home = ({url}: IndexProps) => {
  return (
    <>
      <Hero />
      <Features />
      <Explorer />
    </>
  )
}

// GET PROPS FOR SERVER SIDE RENDERING
// export async function getServerSideProps() {
//   // return props
//   const url = process.env.API_URL
//   return {props: {url}}
// }

export default Home
