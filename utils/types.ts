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
export interface Component {
  _id?: string
  creator_id?: string
  name: string
  type: ComponentType
  styles: Styles[]
  likes?: {count: number, users: string[]}
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
  outline: "none"
}