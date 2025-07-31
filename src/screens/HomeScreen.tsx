import { Black, Bold, Light, Medium, Regular, SemiBold } from '@utils/fonts'
import { TouchableOpacity, View } from 'react-native'

export default function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View className='bg flex-1 items-center justify-center gap-10 p-10'>
      <View className='gap-5'>
        <Black className='text text-center text-4xl'>Heading</Black>
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
          className='bg-accent mt-10 rounded-full px-10 py-3'
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Welcome')}
        >
          <SemiBold className='text-sm text-white'>Welcome</SemiBold>
        </TouchableOpacity>
      </View>
      <View className='card line rounded-2xl p-8'>
        <SemiBold className='text text-sm'>This is a card component</SemiBold>
        <Regular className='text text-xs'>You can add more content here.</Regular>
      </View>
    </View>
  )
}
