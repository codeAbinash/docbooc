import { Medium } from '@utils/fonts'
import { View } from 'react-native'

export default function WelcomeScreen() {
  return (
    <View className='bg flex-1 items-center justify-center'>
      <Medium className='text'>Welcome to the App</Medium>
    </View>
  )
}
