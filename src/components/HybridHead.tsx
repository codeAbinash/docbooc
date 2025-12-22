import { useCallback, useState, useEffect } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import Menu01Icon from '@hugeicons/Menu01Icon'
import UserSwitchIcon from '@hugeicons/UserSwitchIcon'
import ArrowLeft01Icon from '@hugeicons/ArrowLeft01Icon'
import Colors from '@utils/colors'
import { useColorScheme } from 'nativewind'
import { SemiBold, Medium, Regular } from '@utils/fonts'
import { PaddingTop } from '@components/SafePadding'
import Chip from '@components/Chip'
import Search from '@components/Search'
import DoctorSwitcherModal from '@components/DoctorSwitcherModal'

type HybridHeadProps = {
  title?: string | React.ReactNode
  showSearch?: boolean
  onSearchChange?: (query: string) => void
  onSearchToggle?: (isOpen: boolean) => void
  searchPlaceholder?: string
  searchOpen?: boolean
  children?: React.ReactNode
  chipItems?: Array<{ id: number; name: string; icon: any }>
  selectedChipId?: number
  onChipSelect?: (id: number) => void
  chipScrollRef?: React.RefObject<ScrollView | null>
  showMenu?: boolean
  onMenuPress?: () => void
  showDoctorInfo?: boolean
  doctorInfo?: {
    id: string
    name: string
    specialty: string
  }
  onDoctorSelect?: (doctor: { id: string; name: string; specialty: string }) => void
  showBackButton?: boolean
  onBackPress?: () => void
}

export default function HybridHead({
  title,
  showSearch = false,
  onSearchChange,
  onSearchToggle,
  searchPlaceholder = 'Search...',
  searchOpen = false,
  children,
  chipItems,
  selectedChipId,
  onChipSelect,
  chipScrollRef,
  showMenu = false,
  onMenuPress,
  showDoctorInfo = false,
  doctorInfo,
  onDoctorSelect,
  showBackButton = false,
  onBackPress,
}: HybridHeadProps) {
  const { colorScheme } = useColorScheme()
  const navigation = useNavigation()
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(searchOpen)
  const [showDoctorModal, setShowDoctorModal] = useState(false)
  const [currentDoctor, setCurrentDoctor] = useState(
    doctorInfo || {
      id: '1',
      name: 'Dr. Abinash Karmakar',
      specialty: 'Cardiologist',
    },
  )

  useEffect(() => {
    if (searchOpen) {
      setIsSearchOpen(true)
    }
  }, [searchOpen])

  const handleSearchChange = (text: string) => {
    setSearchQuery(text)
    onSearchChange?.(text)
  }

  const handleSearchToggle = (isOpen: boolean) => {
    setIsSearchOpen(isOpen)
    onSearchToggle?.(isOpen)
    if (!isOpen) {
      setSearchQuery('')
    }
  }

  const handleMenuPress = () => {
    if (onMenuPress) {
      onMenuPress()
    } else {
      ;(navigation as any).openDrawer?.()
    }
  }

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress()
    } else {
      ;(navigation as any).goBack?.()
    }
  }

  const handleDoctorSelect = (doctor: { id: string; name: string; specialty: string }) => {
    setCurrentDoctor(doctor)
    onDoctorSelect?.(doctor)
  }

  return (
    <View className='bg-white  dark:bg-neutral-800'>
      <PaddingTop />
      {isSearchOpen ? (
        <View className='px-6'>
          <Search
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChangeText={handleSearchChange}
            onToggle={handleSearchToggle}
            isVisible={true}
          />
        </View>
      ) : (
        <View className='flex-row items-center justify-between px-5 pb-4 dark:border-neutral-700'>
          <View className='flex-row items-center gap-2'>
            {showBackButton && (
              <TouchableOpacity onPress={handleBackPress} className='rounded-md bg-neutral-100 p-2 dark:bg-neutral-800'>
                <ArrowLeft01Icon
                  size={26}
                  color={colorScheme === 'dark' ? Colors.text.dark : Colors.text.DEFAULT}
                  strokeWidth={2}
                />
              </TouchableOpacity>
            )}
            {showMenu && (
              <TouchableOpacity onPress={handleMenuPress} className='rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800'>
                <Menu01Icon
                  size={26}
                  color={colorScheme === 'dark' ? Colors.text.dark : Colors.text.DEFAULT}
                  strokeWidth={2}
                />
              </TouchableOpacity>
            )}
          </View>
          {showDoctorInfo ? (
            <View className='flex-1 flex-row items-center pb-2'>
              <View className='flex-1 items-center'>
                <Medium className='text-xl text-black dark:text-white'>{currentDoctor.name}</Medium>
                <Medium className='text-xs text-neutral-500'>{currentDoctor.specialty}</Medium>
              </View>
              <TouchableOpacity
                onPress={() => setShowDoctorModal(true)}
                className='rounded-xl bg-neutral-200/60 p-2 dark:bg-neutral-800'
              >
                <UserSwitchIcon size={26} color={Colors.accent} />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View className='flex-1  items-start justify-center py-2 pl-3'>
                {typeof title === 'string' ? <Medium className='text-lg'>{title}</Medium> : title}
              </View>
              <View className='flex-row items-center gap-2'>
                {showSearch && (
                  <Search
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChangeText={handleSearchChange}
                    onToggle={handleSearchToggle}
                    isVisible={false}
                  />
                )}
              </View>
            </>
          )}
        </View>
      )}
      {chipItems && (
        <View className='border-b border-neutral-200 bg-white pb-4 dark:bg-neutral-800'>
          <ScrollView
            ref={chipScrollRef}
            horizontal
            contentContainerClassName=' px-5'
            showsHorizontalScrollIndicator={false}
          >
            {chipItems.map((item) => (
              <Chip
                key={item.id}
                icon={item.icon}
                label={item.name}
                onPress={() => onChipSelect?.(item.id)}
                variant={selectedChipId === item.id ? 'transparentAccent' : 'default'}
              />
            ))}
          </ScrollView>
        </View>
      )}
      {children}
      {showDoctorInfo && (
        <DoctorSwitcherModal
          visible={showDoctorModal}
          onClose={() => setShowDoctorModal(false)}
          currentDoctorId={currentDoctor.id}
          onSelectDoctor={handleDoctorSelect}
        />
      )}
    </View>
  )
}
