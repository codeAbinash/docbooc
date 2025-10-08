import ProfilePicture from '@components/ProfilePicture'
import { PaddingTop } from '@components/SafePadding'
import { useNavigation } from '@react-navigation/native'
import { SemiBold } from '@utils/fonts'
import { DrawerNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { TouchableOpacity, View } from 'react-native'

const TopArea = () => {
  const navigation = useNavigation<DrawerNav>()
  const { colorScheme } = useColorScheme()

  return (
    <View className='bg-white px-5 pb-3 pt-1 dark:bg-neutral-900'>
      <PaddingTop />
      <View className='flex-row justify-between'>
        <TouchableOpacity onPress={() => navigation.openDrawer()} className='flex-row items-center gap-4'>
          <ProfilePicture name='Abinash Karmakar' />
          {/* <Menu05Icon
            size={24}
            strokeWidth={1.7}
            color={colorScheme === 'dark' ? Colors.text.dark : Colors.text.DEFAULT}
          /> */}
          <View className='flex-col'>
            <SemiBold className='text text-[16px]'>Dr. Abinash Karmakar</SemiBold>
            {/* <Medium className='text text-xs opacity-80'>Daktar er Degree, Aro Degree, Bohut boro degree</Medium> */}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TopArea
