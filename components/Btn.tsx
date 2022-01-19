import { MouseEventHandler } from "react"

interface ButtonProps {
  active?: boolean
  className? : string
  onClick? : MouseEventHandler<HTMLButtonElement>
}

const Btn: React.FC<ButtonProps> = ({children, active, className, onClick}) => {
  return (
    <button 
      type="button"
      className={`flex items-center rounded-xl font-body px-3 py-1 transition-all duration-150 shadow-lg ${className}`}
      onClick={onClick}  
    >
      {children}
    </button>
  )
}

export default Btn