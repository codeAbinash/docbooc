import { PaddingTop } from '@components/SafePadding'
import Menu01Icon from '@hugeicons/Menu01Icon'
import UserSwitchIcon from '@hugeicons/UserSwitchIcon'
import { useNavigation } from '@react-navigation/native'
import Colors from '@utils/colors'
import { Medium, SemiBold } from '@utils/fonts'
import { DrawerNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import DoctorSwitcherModal from './DoctorSwitcherModal'

const TopArea = () => {
  const navigation = useNavigation<DrawerNav>()
  const { colorScheme } = useColorScheme()
  const [showDoctorModal, setShowDoctorModal] = useState(false)
  const [currentDoctor, setCurrentDoctor] = useState({
    id: '1',
    name: 'Dr. Abinash Karmakar',
    specialty: 'Cardiologist',
  })

  return (
    <>
      <View className='bg-white px-5 pb-3 pt-1 dark:bg-neutral-900'>
        <PaddingTop />
        <View className='flex-row items-center justify-between'>
          <TouchableOpacity onPress={() => navigation.openDrawer()} className='flex-row items-center gap-4'>
            {/* <ProfilePicture name={currentDoctor.name} /> */}
            <Menu01Icon
              size={26}
              color={colorScheme === 'light' ? Colors.text.DEFAULT : Colors.text.dark}
              strokeWidth={2}
            />
            <View className='flex-col'>
              <SemiBold className='text text-[16px]'>{currentDoctor.name}</SemiBold>
              <Medium className='text text-xs opacity-60'>{currentDoctor.specialty}</Medium>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowDoctorModal(true)}
            className='rounded-xl bg-accent/15 p-3'
            activeOpacity={0.7}
          >
            <UserSwitchIcon size={20} color={Colors.accent} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <DoctorSwitcherModal
        visible={showDoctorModal}
        onClose={() => setShowDoctorModal(false)}
        currentDoctorId={currentDoctor.id}
        onSelectDoctor={(doctor) => setCurrentDoctor(doctor)}
      />
    </>
  )
}

export default TopArea
