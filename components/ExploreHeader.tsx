import Button from "./Button"


const ExploreHeader = () => {
  return(
    <div className="flex justify-between bg-white">
      <div>
        Search: 
        <input />
      </div>
      <div>
        <Button>
          Popular
        </Button>
        <Button>
          Newest
        </Button>
        <Button>
          Oldest
        </Button>
      </div>
    </div>
  )
}

export default ExploreHeader