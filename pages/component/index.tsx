import Explorer from '../../components/Explorer';

// define the page component
// const Index = ({url}: {url: string}) => {
const Index = () => {
  return (
    <Explorer />
  )
}

// GET PROPS FOR SERVER SIDE RENDERING
// export async function getServerSideProps() {
//   // get component data from API
//   const url = process.env.API_URL

//   // return props
//   return {
//     props: { url }
//   }
// }

export default Index