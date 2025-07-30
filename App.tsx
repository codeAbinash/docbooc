import './src/global.css'

import { Medium } from '@utils/fonts'
import { View } from 'react-native'

export default function App() {
  return (
    <View className='flex-1 bg-black justify-center items-center'>
      <Medium className='text-5xl text-white'> Hello World</Medium>
    </View>
  )
}
