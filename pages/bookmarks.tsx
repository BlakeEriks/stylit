const Bookmarks = () => {
  return (
    <h1>Bookmarks</h1>
  )
}

// GET PROPS FOR SERVER SIDE RENDERING
// export async function getServerSideProps() {
//   // get component data from API
//   const res = await fetch(process.env.API_URL + "/components" as string)
//   const components = await res.json()

//   // return props
//   return {props: { components }}
// }

export default Bookmarks