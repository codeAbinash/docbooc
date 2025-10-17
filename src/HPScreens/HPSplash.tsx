import { Medium } from '@utils/fonts'
import { HPNavProp, NavProp } from '@utils/types'
import { useEffect } from 'react'
import { View } from 'react-native'

export default function HPSplash({ navigation }: HPNavProp) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login')
    }, 0)
  }, [])

  return (
    <View className='flex-1 items-center justify-center'>
      <Medium>Splash Screen</Medium>
    </View>
  )
}