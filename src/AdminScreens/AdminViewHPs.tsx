import { View, Text } from 'react-native'
import { Bold } from '@utils/fonts'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'

export default function AdminViewHPs() {
  return (
    <View className='flex flex-1 items-center justify-center gap-5 p-5'>
      <PaddingTop />
      <Bold className='mb-5 text-3xl'>View HPs</Bold>
      <Text className='text-center text-neutral-600 dark:text-neutral-400'>
        Health Points viewing feature coming soon
      </Text>
      <PaddingBottom />
    </View>
  )
}
