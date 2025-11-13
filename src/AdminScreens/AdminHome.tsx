import { handleLogout } from '@/HPScreens/utils/utils'
import Button from '@components/Button'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { Bold } from '@utils/fonts'
import { AdminNavProp } from '@utils/types'
import { View } from 'react-native'
import { logout } from './utils'

export default function AdminHome({ navigation }: AdminNavProp) {
  return (
    <View className='flex flex-1 items-center justify-center gap-5 p-5'>
      <PaddingTop />
      <Bold className='mb-5 text-3xl'>Admin App</Bold>

      <Button onPress={() => navigation.navigate('AdminAddDoctors')} title='Add Doctors'></Button>
      <Button onPress={() => handleLogout(() => logout('AdminLogin'))} title='Logout'></Button>
      <PaddingBottom />
    </View>
  )
}
