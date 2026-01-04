import authStore from '@/zustand/authStore'
import { Medium } from '@utils/fonts'
import { NavProp } from '@utils/types'
import { useEffect } from 'react'
import { View } from 'react-native'

export default function Splash({ navigation }: NavProp) {
  const { token } = authStore()
  useEffect(() => {
    if (token) {
      navigation.replace('Home')
      return
    }
    navigation.replace('Login')
  }, [])

  return (
    <View className='flex-1 items-center justify-center'>
      <Medium>Splash Screen</Medium>
    </View>
  )
}
