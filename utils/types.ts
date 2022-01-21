// Interface to defining our object of response functions
export interface ResponseFuncs {
  GET?: Function
  POST?: Function
  PUT?: Function
  DELETE?: Function
}

export enum ComponentType {Button, Input, Card}

export interface User {
  _id?: string
  email: string
  bookmarks?: string[]
}

// Interface to define our Component model on the frontend
interface Component {
  name: string
  type: ComponentType
}

export interface DraftComponent extends Component {
  stylesMap: {[index in ComponentState]: Styles}
}

export interface PublishedComponent extends Component {
  _id?: string
  likes: {count: number, users: string[]}
  stylesMap: { [index in ('&:hover' | '&:focus')]: Styles | keyof Styles }
  creator_id: string
  createdAt?: number
}

export interface Styles {
  color?: string
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  letterSpacing?: string
  background?: string
  borderColor?: string
  borderWidth?: string
  padding?: string
  borderRadius?: string
  boxShadow?: string
  outline?: string
  transition?: string
}

export interface StyleGroups {
  "text": (keyof Styles)[]
  "background": (keyof Styles)[]
  "padding": (keyof Styles)[]
  "border": (keyof Styles)[]
}

export enum ComponentState {
  normal, focus, hover
}

export const defaultStyles: Styles = {
  fontFamily: "Montserrat, sans-serif",
  color: "#000000",
  fontSize: "24px",
  fontWeight: "500",
  letterSpacing: "0px",
  background: "white",
  borderColor: "#000000",
  borderWidth: "2px",
  padding: "4px 8px",
  borderRadius: "5px",
  boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)",
  outline: "none",
  transition: "all 0.3s ease"
}