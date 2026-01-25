import { DepartmentIcon } from '@/AdminScreens/Department/types'
import Animations from '@assets/animations/animations'
import Chip from '@components/Chip'
import DoctorSwitcherModal from '@components/DoctorSwitcherModal'
import { Lottie } from '@components/Lottie'
import { PaddingTop } from '@components/SafePadding'
import Search from '@components/Search'
import ArrowLeft01Icon from '@hugeicons/ArrowLeft01Icon'
import { HugeIconProps } from '@hugeicons/constants'
import Menu01Icon from '@hugeicons/Menu01Icon'
import SquareIcon from '@hugeicons/SquareIcon'
import { useNavigation } from '@react-navigation/native'
import Colors from '@utils/colors'
import { Medium, Regular } from '@utils/fonts'
import { getIconByName } from '@utils/icons'
import type { Doctor } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { ComponentType, memo, useCallback, useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

interface ChipItem {
  id: number | string
  name: string
  icon?: DepartmentIcon | ComponentType<HugeIconProps> | null
}

interface HybridHeadProps {
  title?: string | React.ReactNode
  showSearch?: boolean
  onSearchChange?: (query: string) => void
  onSearchToggle?: (isOpen: boolean) => void
  searchPlaceholder?: string
  searchOpen?: boolean
  children?: React.ReactNode
  chipItems?: ChipItem[]
  selectedChipId?: number | string
  onChipSelect?: (id: number | string) => void
  chipScrollRef?: React.RefObject<ScrollView | null>
  showMenu?: boolean
  onMenuPress?: () => void
  showDoctorInfo?: boolean
  doctorInfo?: Doctor
  onDoctorSelect?: (doctor: Doctor) => void
  showBackButton?: boolean
  onBackPress?: () => void
  rightElement?: React.ReactNode
  doctors?: Doctor[]
}

const ICON_SIZE = {
  BACK: 30,
  MENU: 26,
  SQUARE: 26,
} as const

function HybridHead({
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
  rightElement,
  doctors = [],
}: HybridHeadProps) {
  const { colorScheme } = useColorScheme()
  const navigation = useNavigation()

  // State
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(searchOpen && !rightElement)
  const [showDoctorModal, setShowDoctorModal] = useState(false)

  const isDark = colorScheme === 'dark'
  const iconColor = isDark ? Colors.text.dark : Colors.text.DEFAULT

  // Effects
  useEffect(() => {
    if (searchOpen) {
      setIsSearchOpen(true)
    }
  }, [searchOpen])

  // Handlers
  const handleSearchChange = useCallback(
    (text: string) => {
      setSearchQuery(text)
      onSearchChange?.(text)
    },
    [onSearchChange],
  )

  const handleSearchToggle = useCallback(
    (isOpen: boolean) => {
      setIsSearchOpen(isOpen)
      onSearchToggle?.(isOpen)
      if (!isOpen) {
        setSearchQuery('')
      }
    },
    [onSearchToggle],
  )

  const handleMenuPress = useCallback(() => {
    if (onMenuPress) {
      onMenuPress()
    } else {
      ;(navigation as any).openDrawer?.()
    }
  }, [onMenuPress, navigation])

  const handleBackPress = useCallback(() => {
    if (onBackPress) {
      onBackPress()
    } else {
      ;(navigation as any).goBack?.()
    }
  }, [onBackPress, navigation])

  const handleDoctorSelect = useCallback(
    (doctor: Doctor) => {
      onDoctorSelect?.(doctor)
    },
    [onDoctorSelect],
  )

  const handleCloseDoctorModal = useCallback(() => {
    setShowDoctorModal(false)
  }, [])

  const handleOpenDoctorModal = useCallback(() => {
    setShowDoctorModal(true)
  }, [])

  // Render helpers
  const renderChipItem = useCallback(
    (item: ChipItem) => {
      const icon = getIconByName(item.icon as DepartmentIcon)
      return (
        <Chip
          key={item.id}
          icon={icon}
          label={item.name}
          onPress={() => onChipSelect?.(item.id)}
          variant={selectedChipId === item.id ? 'transparentAccent' : 'default'}
        />
      )
    },
    [selectedChipId, onChipSelect],
  )

  return (
    <View className='bg-white pt-3 dark:bg-neutral-800'>
      <PaddingTop />

      {/* Search Mode */}
      {isSearchOpen ? (
        <View className='px-5'>
          <Search
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChangeText={handleSearchChange}
            onToggle={handleSearchToggle}
            isVisible={true}
          />
        </View>
      ) : (
        /* Header Content */
        <View className='flex-row items-center justify-between px-5 dark:border-neutral-700'>
          {/* Left Section - Back & Menu */}
          <View className='flex-row items-center gap-2'>
            {showBackButton && (
              <TouchableOpacity onPress={handleBackPress} className='dark:bg-neutral-800'>
                <ArrowLeft01Icon size={ICON_SIZE.BACK} color={iconColor} strokeWidth={2} />
              </TouchableOpacity>
            )}

            {showMenu && (
              <TouchableOpacity onPress={handleMenuPress} className='rounded-lg p-1 dark:bg-neutral-800'>
                <Menu01Icon size={ICON_SIZE.MENU} color={iconColor} strokeWidth={2} />
              </TouchableOpacity>
            )}
          </View>

          {/* Center/Right Section - Doctor Info or Title */}
          {showDoctorInfo ? (
            <View className='flex-1 flex-row items-center'>
              <View className='flex-1 flex-row items-center justify-center'>
                {doctorInfo?.name ? (
                  <>
                    <Medium className='text-2xl text-black dark:text-white'>{doctorInfo.name}</Medium>
                    <Regular className='text-2xl text-black dark:text-white'> |</Regular>
                    <Medium className='bg-neutral-100 p-1 text-xs text-neutral-500'>
                      {doctorInfo?.specialization ?? doctorInfo?.department ?? 'N/A'}
                    </Medium>
                    
                  </>
                ) : (
                  <View className='items-center justify-center  w-12'>
                    <Lottie source={Animations.loading} size={25} />
                  </View>
                )}
              </View>
              <TouchableOpacity onPress={handleOpenDoctorModal} className='rounded-xl p-1 dark:bg-neutral-800'>
                <SquareIcon size={ICON_SIZE.SQUARE} color={Colors.accent} />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View className='flex-1 items-start justify-center py-1 pl-2'>
                {typeof title === 'string' ? <Medium className='text-2xl'>{title}</Medium> : title}
              </View>
              <View className='flex-row items-center gap-2'>
                {showSearch && !rightElement && (
                  <Search
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChangeText={handleSearchChange}
                    onToggle={handleSearchToggle}
                    isVisible={false}
                  />
                )}
                {rightElement}
              </View>
            </>
          )}
        </View>
      )}

      {/* Chip Items */}
      {chipItems && (
        <View className='bg-white py-3 dark:bg-neutral-800'>
          <ScrollView
            ref={chipScrollRef}
            horizontal
            contentContainerClassName='px-5'
            showsHorizontalScrollIndicator={false}
          >
            {chipItems.map(renderChipItem)}
          </ScrollView>
        </View>
      )}

      {/* Additional Children */}
      {children}

      {/* Doctor Switcher Modal */}
      {showDoctorInfo && (
        <DoctorSwitcherModal
          visible={showDoctorModal}
          onClose={handleCloseDoctorModal}
          currentDoctorId={doctorInfo?.id}
          onSelectDoctor={handleDoctorSelect}
          doctors={doctors}
        />
      )}
    </View>
  )
}

export default memo(HybridHead)
