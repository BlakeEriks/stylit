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
  creator_id: string
  type: ComponentType
  styles: object
  likes: {count: number, users: string[]}
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