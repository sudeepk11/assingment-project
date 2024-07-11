// hooks/useZustandStore.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IUser } from '../types'

type State = {
  token: string | null
  user: IUser | null
}

type Action = {
  loginUser: (token: State['token'], user: State['user']) => void
  logoutUser: () => void
}

const useAuthStore = create(
  persist<State & Action>(
    (set) => ({
      token: null,
      user: null,
      loginUser: (token, user) => set({ token, user }),
      logoutUser: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

export default useAuthStore