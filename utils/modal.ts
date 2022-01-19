import { atom, useRecoilState } from 'recoil'

const modalState = atom({
    key: 'modalState',
    default: {open: false, title: "", description: "", promptLogin: false}
})

export const useModalState = () => {
    return useRecoilState(modalState)
}