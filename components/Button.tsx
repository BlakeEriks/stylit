import { EventHandler, MouseEventHandler } from "react"

interface ButtonProps {
  active?: boolean
  className? : string
  onClick? : MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({children, active, className, onClick}) => {
  return (
    <button 
      type="button" 
      className={`font-body px-3 py-2 hover:text-red transition-all duration-150 ${className}`}
      onClick={onClick}  
    >
      {children}
    </button>
  )
}

export default Button