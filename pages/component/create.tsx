import { useRouter } from "next/router"
import { FormEventHandler, useRef } from "react"
import { Component } from "../../utils/types"

// Define props
interface CreateProps {
  url: string
}

// Define Component
const Create = (props: CreateProps) => {
  
  // get the next route
  const router = useRouter()

  // since there is just one input we will use a uncontrolled form
  const item = useRef<HTMLInputElement>(null)

  // Function to create new component
  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    // construct new component, create variable, check it item.current is not null to pass type checks
    let component: Component = { creator_id: "61dcce4e2fa77b6e4b654bd7", type: 0, styles: {}, likes: {count: 0, users: []} }

    if (item.current !== null) {
      component = {...component, type: 1 }
    }

    // Make the API request
    await fetch(props.url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(component),
    })

    // after api request, push back to main page
    router.push("/component")
  }

  return (
    <div>
      <h1>Create a New Component</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={item}></input>
        <input type="submit" value="create todo"></input>
      </form>
    </div>
  )
}

// export getStaticProps to provie API_URL to component
export async function getStaticProps(context: any) {
  return {
    props: {
      url: process.env.API_URL,
    },
  }
}

// export component
export default Create