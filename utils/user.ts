import { atom, useRecoilState, useResetRecoilState } from 'recoil'

const userState = atom<any>({
    key: 'userState',
    default: null
})

export const useUserState = () => {
    const [user, setUser] = useRecoilState(userState)
    return {user, setUser, resetUser: useResetRecoilState(userState)}
}