import Animations from '@assets/animations/animations'
import { Lottie } from '@components/Lottie'
import Slider from '@components/Slider/Slider'
import Add01Icon from '@hugeicons/Add01Icon'
import { Black, Bold, Light, Medium, Regular, SemiBold } from '@utils/fonts'
import { NavProp } from '@utils/types'
import { TouchableOpacity, View } from 'react-native'

export default function HomeScreen({ navigation }: NavProp) {
  return (
    <View className='bg flex-1 items-center justify-center gap-10 p-6'>
      <View className='gap-5'>
        <View className='mr-10 flex flex-row items-center justify-center gap-3'>
          <Lottie source={Animations.welcome} style={{ width: 60, height: 60, marginHorizontal: 0 }} />
          <Black className='text text-center' style={{ fontSize: 32, lineHeight: 40 }}>
            Welcome
          </Black>
        </View>
        <Medium className='gray text-center text-sm'>
          This is a sample Home Screen. Press the button to navigate to the Welcome Screen.
        </Medium>
      </View>
      <View>
        <Light className='text text-xl'>Light</Light>
        <Regular className='text text-xl'>Regular</Regular>
        <Medium className='text text-xl'>Medium</Medium>
        <SemiBold className='text text-xl'>SemiBold</SemiBold>
        <Bold className='text text-xl'>Bold</Bold>
        <Black className='text text-xl'>Black</Black>
        <TouchableOpacity
          className='mt-10 flex-row items-center gap-2 rounded-full bg-accent px-7 py-3 pl-5'
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Welcome')}
        >
          <Add01Icon strokeWidth={2} color='white' size={20} />
          <SemiBold className='text-sm text-white'>Welcome</SemiBold>
        </TouchableOpacity>
      </View>
      <View className='w-full'>
        <Slider
          onComplete={() => {
            navigation.navigate('Welcome')
          }}
        />
      </View>
    </View>
  )
}
