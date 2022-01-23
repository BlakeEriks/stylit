import { useRouter } from "next/router"
import { useState } from "react"
import { PublishedComponent } from "utils/types"

// Define Prop Interface
interface ShowProps {
  todo: PublishedComponent
  url: string
}

// Define Component
function Show(props: ShowProps) {
  // get the next router, so we can use router.push later
  const router = useRouter()

  // set the todo as state for modification
  const [component, setComponent] = useState<PublishedComponent>(props.todo)

  // function to complete a todo
  // const handleComplete = async () => {
  //   if (!component.completed) {
  //     // make copy of todo with completed set to true
  //     const newTodo: Component = { ...todo, completed: true }
  //     // make api call to change completed in database
  //     await fetch(props.url + "/" + todo._id, {
  //       method: "put",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       // send copy of todo with property
  //       body: JSON.stringify(newTodo),
  //     })
  //     // once data is updated update state so ui matches without needed to refresh
  //     setTodo(newTodo)
  //   }
  //   // if completed is already true this function won't do anything
  // }

  // function for handling clicking the delete button
  const handleDelete = async () => {
    await fetch(props.url + "/" + component._id, {
      method: "delete",
    })
    //push user back to main page after deleting
    router.push("/component")
  }

  //return JSX
  return (
    <div>
      <h1>{component._id}</h1>
      <h2>{component.likes}</h2>
      {/* <button onClick={handleComplete}>Complete</button> */}
      <button onClick={handleDelete}>Delete</button>
      <button
        onClick={() => {
          router.push("/component")
        }}
      >
        Go Back
      </button>
    </div>
  )
}

// Define Server Side Props
export async function getServerSideProps(context: any) {
  // fetch the component, the param was received via context.query.id
  const res = await fetch(process.env.API_URL + "/components/" + context.query.id)
  const todo = await res.json()

  //return the serverSideProps the todo and the url from out env variables for frontend api calls
  return { props: { todo, url: process.env.API_URL } }
}

// export component
export default Show