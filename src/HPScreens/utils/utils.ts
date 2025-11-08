import authStore from '@/zustand/authStore'
import { navigationStore } from '@/zustand/navigationStore'
import popupStore from '@/zustand/popupStore'
import { queryClient } from '@query/index'
import { HPStackNav } from '@utils/types'
import { FadeOut, LinearTransition } from 'react-native-reanimated'

export function logout() {
  const navigation = navigationStore.getState().navigation as HPStackNav
  authStore.getState().removeToken()
  popupStore.getState().clear()
  queryClient.clear()
  navigation?.reset({ index: 0, routes: [{ name: 'HPLogin' }] })
}

export function handleLogout(logoutMutation: () => void) {
  const alert = popupStore.getState().alert
  alert('Log out', 'Are you sure you want to log out from this device?', [
    { text: 'Cancel' },
    {
      text: 'Log out',
      onPress() {
        logoutMutation()
        alert('Please wait', 'Please wait while we log you out', [], true)
      },
    },
  ])
}

export const exiting = FadeOut.duration(250)
export const layout = LinearTransition.duration(250)
