import { useCallback, useState } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Search01Icon from '@hugeicons/Search01Icon'
import Cancel01Icon from '@hugeicons/Cancel01Icon'
import ArrowLeft01Icon from '@hugeicons/ArrowLeft01Icon'
import Colors from '@utils/colors'
import { useColorScheme } from 'nativewind'
import { SemiBold, Medium } from '@utils/fonts'
import { PaddingTop } from '@components/SafePadding'

type CustomHeaderProps = {
  title: string
  showSearch?: boolean
  showBackButton?: boolean
  onBackPress?: () => void
  onSearchChange?: (query: string) => void
  onSearchToggle?: (isOpen: boolean) => void
  searchPlaceholder?: string
  rightElement?: React.ReactNode
  children?: React.ReactNode
}

export default function CustomHeader({
  title,
  showSearch = false,
  showBackButton = false,
  onBackPress,
  onSearchChange,
  onSearchToggle,
  searchPlaceholder = 'Search...',
  rightElement,
  children,
}: CustomHeaderProps) {
  const { colorScheme } = useColorScheme()
  const [isSearchOpen, setIsSearchOpen] = useState(showSearch)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleSearch = useCallback(() => {
    const newState = !isSearchOpen
    setIsSearchOpen(newState)
    onSearchToggle?.(newState)
    if (newState) {
      setSearchQuery('')
    }
  }, [isSearchOpen, onSearchToggle])

  const handleSearchChange = (text: string) => {
    setSearchQuery(text)
    onSearchChange?.(text)
  }

  return (
    <View className='bg-white dark:bg-neutral-900'>
      <PaddingTop />
      <View className='py-2 pl-8 pr-6'>
        {isSearchOpen ? (
          <View className='flex-row items-center gap-2'>
            <View className='flex-1 flex-row items-center gap-2 rounded-lg border border-neutral-800 bg-white px-6 py-3 dark:border-neutral-700 dark:bg-neutral-800'>
              <Search01Icon
                size={20}
                color={colorScheme === 'dark' ? Colors.text.dark : Colors.text.DEFAULT}
                strokeWidth={2}
              />
              <TextInput
                className='flex-1 text-neutral-900 dark:text-white'
                style={{ paddingVertical: 0 }}
                placeholder={searchPlaceholder}
                placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
                value={searchQuery}
                onChangeText={handleSearchChange}
                autoFocus
              />
            </View>
            <TouchableOpacity
              onPress={toggleSearch}
              className='rounded-lg border border-neutral-800 bg-neutral-100 p-2 dark:bg-neutral-800'
            >
              <Cancel01Icon size={26} color={Colors.accent} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        ) : (
          <View className='flex-row items-center justify-between' style={{ height: 44 }}>
            <View className='flex-1 flex-row items-center gap-3'>
              {showBackButton && (
                <TouchableOpacity
                  onPress={onBackPress}
                  className='size-10 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800'
                >
                  <ArrowLeft01Icon size={24} strokeWidth={1.8} color={colorScheme === 'dark' ? 'white' : 'black'} />
                </TouchableOpacity>
              )}
              <SemiBold className='text-xl text-neutral-900 dark:text-white'>{title}</SemiBold>
            </View>
            {rightElement ? (
              rightElement
            ) : showSearch ? (
              <TouchableOpacity onPress={toggleSearch} className='rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800'>
                <Search01Icon
                  size={26}
                  color={colorScheme === 'dark' ? Colors.text.dark : Colors.text.DEFAULT}
                  strokeWidth={2}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        )}
      </View>

      {children}
    </View>
  )
}
