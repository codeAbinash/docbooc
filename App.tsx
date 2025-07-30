import './src/global.css'

import { Black, Bold, Light, Medium, Regular, SemiBold } from '@utils/fonts'
import { View } from 'react-native'

export default function App() {
  return (
    <View className='flex-1 items-center justify-center bg-black'>
      <Light className='text-2xl text-white'>Light</Light>
      <Regular className='text-2xl text-white'>Regular</Regular>
      <Medium className='text-2xl text-white'>Medium</Medium>
      <SemiBold className='text-2xl text-white'>SemiBold</SemiBold>
      <Bold className='text-2xl text-white'>Bold</Bold>
      <Black className='text-2xl text-white'>Black</Black>
    </View>
  )
}
