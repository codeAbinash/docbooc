import { useCallback, useState } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import Cancel01Icon from '@hugeicons/Cancel01Icon'
import Search01Icon from '@hugeicons/Search01Icon'
import Colors from '@utils/colors'
import { useColorScheme } from 'nativewind'


interface SearchProps {
  placeholder?: string
  value: string
  onChangeText: (text: string) => void
  onToggle?: (isVisible: boolean) => void
  isVisible?: boolean
}

export const Search = ({
  placeholder = 'Search...',
  value,
  onChangeText,
  onToggle,
  isVisible = false,
}: SearchProps) => {
  const { colorScheme } = useColorScheme()
  const [showSearch, setShowSearch] = useState(isVisible)

  const toggleSearch = useCallback(() => {
    setShowSearch((prev) => !prev)
    if (showSearch) {
      onChangeText('')
    }
    onToggle?.(!showSearch)
  }, [showSearch, onChangeText, onToggle])

  return (
    <View>
      
      {showSearch ? (
        <View className=' flex-row items-center  '>
          <View className=' flex-1 flex-row items-center  px-2 py-1 '>
            
            <TextInput
              className='flex-1  text-xl text-neutral-900 dark:text-white'
              style={{ paddingVertical: 0 }}
              placeholder={placeholder}
              placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
              value={value}
              onChangeText={onChangeText}
              autoFocus
            />
          </View>
          <TouchableOpacity
            onPress={toggleSearch}
            className='rounded-full bg p-1 dark:bg-neutral-800'
          >
            <Cancel01Icon size={28} color={Colors.accent} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={toggleSearch} className=' rounded-lg p-1 dark:bg-neutral-800'>
          <Search01Icon
            size={28}
            color={colorScheme === 'dark' ? Colors.text.dark : Colors.text.DEFAULT}
            strokeWidth={2}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default Search
