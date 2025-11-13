import authStore from '@/zustand/authStore'
import { navigationStore } from '@/zustand/navigationStore'
import popupStore from '@/zustand/popupStore'
import { queryClient } from '@query/index'

export function logout(to: string = 'UserLogin') {
  const navigation = navigationStore.getState().navigation
  authStore.getState().removeToken()
  popupStore.getState().clear()
  queryClient.clear()
  navigation?.reset({ index: 0, routes: [{ name: to as any }] })
}
