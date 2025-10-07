import Chip from '@components/Chip'
import ProfilePicture from '@components/ProfilePicture'
import { PaddingTop } from '@components/SafePadding'
import Loading03Icon from '@hugeicons/Loading03Icon'
import Menu05Icon from '@hugeicons/Menu05Icon'
import TickDouble02Icon from '@hugeicons/TickDouble02Icon'
import { useNavigation } from '@react-navigation/native'
import Colors from '@utils/colors'
import { SemiBold } from '@utils/fonts'
import { DrawerNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

type TabsProps = {
  activeTab: number
  onTabChange: (index: number) => void
}

const tabs = [
  { label: 'Ongoing', icon: Loading03Icon },
  { label: 'Complete', icon: TickDouble02Icon },
]
function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <View className='flex-row gap-2'>
      {tabs.map((tab, index) => (
        <Chip
          key={index}
          label={tab.label}
          icon={tab.icon}
          isActive={activeTab === index}
          onPress={() => onTabChange(index)}
        />
      ))}
    </View>
  )
}

const TopArea = () => {
  const navigation = useNavigation<DrawerNav>()
  const [activeTab, setActiveTab] = useState(0)
  const { colorScheme } = useColorScheme()

  return (
    <View className='bg-white px-5 pb-3 pt-1 dark:bg-neutral-900'>
      <PaddingTop />
      <View className='flex-row justify-between'>
        <TouchableOpacity onPress={() => navigation.openDrawer()} className='flex-row items-center gap-5'>
          <Menu05Icon
            size={24}
            strokeWidth={1.7}
            color={colorScheme === 'dark' ? Colors.text.dark : Colors.text.DEFAULT}
          />
          <SemiBold className='text text-[16px]'>Daktar Er name</SemiBold>
        </TouchableOpacity>
        <ProfilePicture name='Abinash Karmakar' />
      </View>
      <View className='mt-3'>
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      </View>
    </View>
  )
}

export default TopArea
