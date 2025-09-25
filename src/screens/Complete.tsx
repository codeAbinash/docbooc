import Animations from '@assets/animations/animations'
import { Lottie } from '@components/Lottie'
import { View } from 'react-native'

export default function Complete() {
  return (
    <View className='bg flex-1 items-center justify-center'>
      <Lottie source={Animations.check} loop={false} />
    </View>
  )
}
