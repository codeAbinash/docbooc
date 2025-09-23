import Press from '@components/Press'
import ArrowLeft01Icon from '@hugeicons/ArrowLeft01Icon'
import { useNavigation } from '@react-navigation/native'
import { SemiBold } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { View } from 'react-native'

export function Header({ title }: { title: string }) {
  const { colorScheme } = useColorScheme()
  const navigation = useNavigation<StackNav>()
  return (
    <View className='w-full flex-row items-center justify-between gap-5 p-5 py-3 pt-1'>
      <View>
        <Press
          className='size-12 items-center justify-center rounded-full bg-white dark:bg-zinc-900'
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft01Icon
            size={25}
            strokeWidth={1.5}
            style={{ marginRight: 2 }}
            color={colorScheme === 'dark' ? 'white' : 'black'}
          />
        </Press>
      </View>
      <View>
        <SemiBold className='text text-base'>{title}</SemiBold>
      </View>
      <View style={{ opacity: 0 }}>
        <Press
          className='size-12 items-center justify-center rounded-full bg-white dark:bg-zinc-900'
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft01Icon
            size={25}
            strokeWidth={1.5}
            style={{ marginRight: 2 }}
            color={colorScheme === 'dark' ? 'white' : 'black'}
          />
        </Press>
      </View>
    </View>
  )
}
