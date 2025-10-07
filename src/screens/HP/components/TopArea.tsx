import { PaddingTop } from '@components/SafePadding'
import ProfilePicture from '@components/ProfilePicture'
import Menu05Icon from '@hugeicons/Menu05Icon'
import { useNavigation } from '@react-navigation/native'
import { SemiBold } from '@utils/fonts'
import { DrawerNav } from '@utils/types'
import { TouchableOpacity, View } from 'react-native'

const TopArea = () => {
  const navigation = useNavigation<DrawerNav>()
  return (
    <View className='pb5 bg-white px-5 pb-3 pt-1'>
      <PaddingTop />
      <View className='flex-row justify-between'>
        <TouchableOpacity onPress={() => navigation.openDrawer()} className='flex-row items-center gap-5'>
          <Menu05Icon size={24} strokeWidth={1.7} />
          <SemiBold className='text-md'>Daktar Er name</SemiBold>
        </TouchableOpacity>
        <ProfilePicture name='Abinash Karmakar' />
      </View>
    </View>
  )
}

export default TopArea
