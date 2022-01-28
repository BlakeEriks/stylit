import { MouseEventHandler } from "react"

interface ButtonProps {
  active?: boolean
  className? : string
  onClick? : MouseEventHandler<HTMLElement>
  href?: string
}

const Btn: React.FC<ButtonProps> = ({children, active, className, onClick, href}) => {

  return (
    !!href ?
      <a 
        type="button"
        className={`flex items-center rounded-lg font-body px-3 py-1 transition-all duration-150 shadow-lg ${className}`}
        onClick={onClick}
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    :
      <button 
        type="button"
        className={`flex items-center rounded-lg font-body px-3 py-1 transition-all duration-150 shadow-lg ${className}`}
        onClick={onClick}  
      >
        {children}
      </button>
  )
}

export default Btn