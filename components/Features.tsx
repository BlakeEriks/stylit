import {
  FiAnchor
} from "react-icons/fi";

const Features = () => {

  const features = [
    {
      title: "100s of Components",
      description: "Browse hundreds of components to find the perfect fit for your app.",
      icon: <FiAnchor />
    },
    {
      title: "100s of Components",
      description: "Browse hundreds of components to find the perfect fit for your app.",
      icon: <FiAnchor />
    },
    {
      title: "100s of Components",
      description: "Browse hundreds of components to find the perfect fit for your app.",
      icon: <FiAnchor />
    },
    {
      title: "100s of Components",
      description: "Browse hundreds of components to find the perfect fit for your app.",
      icon: <FiAnchor />
    },
    {
      title: "100s of Components",
      description: "Browse hundreds of components to find the perfect fit for your app.",
      icon: <FiAnchor />
    },
    {
      title: "100s of Components",
      description: "Browse hundreds of components to find the perfect fit for your app.",
      icon: <FiAnchor />
    },
    {
      title: "100s of Components",
      description: "Browse hundreds of components to find the perfect fit for your app.",
      icon: <FiAnchor />
    },
    {
      title: "100s of Components",
      description: "Browse hundreds of components to find the perfect fit for your app.",
      icon: <FiAnchor />
    },
    {
      title: "100s of Components",
      description: "Browse hundreds of components to find the perfect fit for your app.",
      icon: <FiAnchor />
    },
    {
      title: "100s of Components",
      description: "Browse hundreds of components to find the perfect fit for your app.",
      icon: <FiAnchor />
    },
  ]

  return (
    <div className="flex flex-wrap justify-between">
      {features.map(({icon, title, description}, index) => (
        <div key={index} className="flex flex-col items-center flex-wrap min-w-[10vw] max-w-[15vw] mx-4 my-10" data-aos="fade-left">
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