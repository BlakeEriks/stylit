import { FiBookmark, FiFilter, FiHexagon, FiMoon, FiRadio, FiSliders, FiTwitter, FiUsers } from "react-icons/fi";

const Features = () => {

  const features = [
    {
      title: "100s of Components",
      description: "Browse hundreds of components to find the perfect fit for your app.",
      icon: <FiHexagon />
    },
    {
      title: "Highly Customizable",
      description: "The creator holds the power with the Stylit component editor.",
      icon: <FiSliders />
    },
    {
      title: "Bookmarks",
      description: "Bookmark the styles you know you'll want to come back to.",
      icon: <FiBookmark />
    },
    {
      title: "Dark Mode",
      description: "Give those eyes a rest by enabling dark mode. 🌚",
      icon: <FiMoon />
    },
    {
      title: "Sort it Up!",
      description: "Use the sort in the explorer to find what you're looking for.",
      icon: <FiFilter />
    },
    {
      title: "Open Source",
      description: "Want to help make Stylit better? Contribute to the project!",
      icon: <FiRadio />
    },
    {
      title: "For Devs, By Devs",
      description: "We are stronger together! Share and use the coolest styles.",
      icon: <FiUsers />
    },
    {
      title: "Share It!",
      description: "Know someone who'd benefit from 💄stylit? Share it! #stylit",
      icon: <FiTwitter />
    }
  ]

  return (
    <div className="w-full flex justify-evenly flex-wrap ">
      {features.map(({icon, title, description}, index) => (
        <div key={index} className="flex min-w-[300px] md:basis-1/4 flex-col items-center flex-wrap  px-4 py-8" data-aos="fade-left">
          <div className="rounded-lg bg-gradient-to-b from-fuchsia-600 via-pink-700 to-sky-600 text-white p-2 text-6xl">
            {icon}
          </div>
          <div className="text-white text-xl text-center mt-4 mb-2 font-semibold">
            {title}
          </div>
          <div className="text-gray text-base text-center">
            {description}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Features