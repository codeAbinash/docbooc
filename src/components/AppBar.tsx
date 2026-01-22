import DoctorSwitcherModal from '@components/DoctorSwitcherModal'
import { PaddingTop } from '@components/SafePadding'
import Menu01Icon from '@hugeicons/Menu01Icon'
import UserSwitchIcon from '@hugeicons/UserSwitchIcon'
import { useNavigation } from '@react-navigation/native'
import Colors from '@utils/colors'
import { Medium } from '@utils/fonts'
import { Doctor, DrawerNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { memo, useMemo, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

const initialDoctor: Doctor = {
  id: '1',
  name: 'Dr. Abinash Karmakar',
  email: null,
  contactNumber: null,
  gender: null,
  department: null,
  degrees: null,
  experience: null,
  specialization: 'Cardiologist',
  createdAt: new Date().toISOString(),
  verified: null,
}

const MainContent = memo(() => {
  const [showDoctorModal, setShowDoctorModal] = useState(false)
  const [currentDoctor, setCurrentDoctor] = useState(initialDoctor)

  return (
    <>
      <View className='flex-1 flex-row items-center pb-2'>
        <View className='flex-1 items-center'>
          <Medium className='text-xl text-black dark:text-white'>{currentDoctor.name}</Medium>
          <Medium className='text-xs text-neutral-500'>{currentDoctor.specialization}</Medium>
        </View>
        <TouchableOpacity
          onPress={() => setShowDoctorModal(true)}
          className='rounded-xl bg-neutral-200/60 p-2 dark:bg-neutral-800'
        >
          <UserSwitchIcon size={26} color={Colors.accent} />
        </TouchableOpacity>
      </View>
      <DoctorSwitcherModal
        visible={showDoctorModal}
        onClose={() => setShowDoctorModal(false)}
        currentDoctorId={currentDoctor.id}
        onSelectDoctor={setCurrentDoctor}
      />
    </>
  )
})

const AppBar = memo(({ children }: { children?: React.ReactNode }) => {
  const navigation = useNavigation<DrawerNav>()
  const { colorScheme } = useColorScheme()
  const iconColor = useMemo(() => (colorScheme === 'dark' ? Colors.text.dark : Colors.text.DEFAULT), [colorScheme])

  return (
    <View className='bg-white px-5 py-2 dark:bg-neutral-900'>
      <PaddingTop />
      <View className='flex-row items-center'>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          className='rounded-xl bg-neutral-200/60 p-2 dark:bg-neutral-800'
        >
          <Menu01Icon size={26} color={iconColor} strokeWidth={2} />
        </TouchableOpacity>
        {children || <MainContent />}
      </View>
    </View>
  )
})

export default AppBar
