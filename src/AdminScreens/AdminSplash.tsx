import authStore from '@/zustand/authStore'
import { navigationStore } from '@/zustand/navigationStore'
import { Medium } from '@utils/fonts'
import { AdminNavProp } from '@utils/types'
import { useEffect } from 'react'
import { View } from 'react-native'

export default function AdminSplash({ navigation }: AdminNavProp) {
  const { token } = authStore()
  const setNavigation = navigationStore((state) => state.setNavigation)

  useEffect(() => {
    setNavigation(navigation)
  }, [navigation, setNavigation])

  useEffect(() => {
    if (!token) navigation.replace('AdminLogin')
    else navigation.replace('AdminHome')
  }, [navigation, token])

  return (
    <View className='flex-1 items-center justify-center'>
      <Medium>Splash Screen</Medium>
    </View>
  )
}
