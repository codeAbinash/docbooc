import Animations from '@assets/animations/animations'
import { Lottie } from '@components/Lottie'
import { Add01Icon } from '@hugeicons/Add01Icon'
import { Black, Bold, Light, Medium, Regular, SemiBold } from '@utils/fonts'
import { TouchableOpacity, View } from 'react-native'

export default function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View className='bg flex-1 items-center justify-center gap-10 p-10'>
      <View className='gap-5'>
        <View className='mr-10 flex flex-row items-center justify-center gap-3'>
          <Lottie source={Animations.welcome} style={{ width: 60, height: 60, marginHorizontal: 0 }} />
          <Black className='text text-center' style={{ fontSize: 32, lineHeight: 40 }}>
            Heading
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
          className='mt-10 flex-row items-center gap-2 rounded-full bg-accent px-10 py-3 pr-7'
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Welcome')}
        >
          <SemiBold className='text-sm text-white'>Welcome</SemiBold>
          <Add01Icon strokeWidth={2} color='white' size={20} />
        </TouchableOpacity>
      </View>
      <View className='card line rounded-2xl p-8'>
        <SemiBold className='text text-sm'>This is a card component</SemiBold>
        <Regular className='text text-xs'>You can add more content here.</Regular>
      </View>
    </View>
  )
}
