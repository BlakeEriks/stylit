import { useRouter } from "next/router"
import { FormEventHandler, useRef, useState } from "react"
import { Component, ComponentType } from "utils/types"

// Define props
interface CreateProps {
  url: string
}

interface Styles {
  color: string
  background: string
  border: string
  padding: string
  borderRadius: string
}

// Define Component
const Create = (props: CreateProps) => {

  // get the next route
  const router = useRouter()

  // since there is just one input we will use a uncontrolled form
  // const item = useRef<HTMLInputElement>(null)

  const [styles, setStyles] = useState<Styles>({
    color: "black", 
    background: "white",
    border: "1px solid black",
    padding: "4px 8px",
    borderRadius: "5px"
  })
  const [componentType, setComponentType] = useState(0)

  const onStyleChange = (event: React.ChangeEvent) => {
    const element = event.currentTarget as HTMLInputElement
    setStyles({...styles, [element.name]: element.value})
  }

  // Function to create new component
  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    // construct new component, create variable, check it item.current is not null to pass type checks
    let component: Component = { creator_id: "61dcce4e2fa77b6e4b654bd7", type: 0, styles: {}, likes: {count: 0, users: []} }

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
    <div className="border w-full h-5/6 p-8 flex flex-col justify-center mx-auto">
      <h1 className="text-center">Create a New Component</h1>
      {/* Display the component on the left */}
      <div className="flex flex-row">
        <div className="w-1/3 flex items-center justify-center">
          {ComponentType[componentType] === "Button" && 
            <button style={styles}>Button</button>
          }
          {ComponentType[componentType] === "Input" && 
            <input style={styles} placeholder="input..."></input>
          }
          {ComponentType[componentType] === "Card" && 
            <button style={styles}></button>
          }
        </div>
        {/* Edit the component on the right */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-2/3">
          <h1>Edit Component</h1>
          <div className="my-2">
            <span className="px-2">Font Color:</span>
            <input name="color" value={styles.color} onChange={onStyleChange} />
          </div>
          <div className="my-2">
            <span className="px-2">Background:</span>
            <input name="background" value={styles.background} onChange={onStyleChange}/>
          </div>
          <div className="my-2">
            <span className="px-2">Padding</span>
            <input name="padding" value={styles.padding} onChange={onStyleChange}/>
          </div>
          <div className="my-2">
            <span className="px-2">Border:</span>
            <input name="border" value={styles.border} onChange={onStyleChange}/>
          </div>
          <div className="my-2">
            <span className="px-2">Border Radius:</span>
            <input name="borderRadius" value={styles.borderRadius} onChange={onStyleChange}/>
          </div>
        </form>
      </div>
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