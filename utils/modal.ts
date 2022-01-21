import { atom, useRecoilState } from 'recoil'

interface ModalInterface {
  open?: boolean
  title?: string
  description?: string
  type?: string | null
  options?: {
    yesText: string
    noText: string
    onYes: Function
    onNo: Function
  } | null
}

const modalState = atom({
    key: 'modalState',
    default: {open: false, title: "", description: "", type: null, options: null} as ModalInterface
})

export const useModalState = () => {
    return useRecoilState(modalState)
}