import { useState } from 'react'
import { View, TouchableOpacity, ScrollView, Modal } from 'react-native'
import { Medium, SemiBold } from '@utils/fonts'
import ArrowDown01Icon from '@hugeicons/Doctor01Icon'
import Cancel01Icon from '@hugeicons/Cancel01Icon'
import Tick02Icon from '@hugeicons/Tick02Icon'
import Colors from '@utils/colors'
import { useColorScheme } from 'nativewind'

interface SelectOption {
  label: string
  value: string
}

interface SelectDropdownProps {
  label: string
  value: string | null | undefined
  options: SelectOption[]
  onSelect: (value: string | null) => void
  placeholder?: string
}

export default function SelectDropdown({
  label,
  value,
  options,
  onSelect,
  placeholder = 'Select an option',
}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { colorScheme } = useColorScheme()
  const isDark = colorScheme === 'dark'

  const selectedLabel = options.find((opt) => opt.value === value)?.label || placeholder

  const handleSelect = (optionValue: string) => {
    onSelect(optionValue)
    setIsOpen(false)
  }

  return (
    <View className='gap-2'>
      <SemiBold className='text-xs font-bold uppercase tracking-wide text-neutral-900 dark:text-white'>
        {label}
      </SemiBold>

      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        activeOpacity={0.7}
        className={`flex-row items-center justify-between rounded-lg border px-4 py-3 ${
          isDark ? 'border-neutral-700 bg-neutral-800' : 'border-neutral-300 bg-white'
        }`}
      >
        <Medium className={`flex-1 text-base ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
          {selectedLabel}
        </Medium>
        <ArrowDown01Icon size={20} color={isDark ? '#e5e7eb' : '#6b7280'} strokeWidth={2} />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType='none'
        onRequestClose={() => setIsOpen(false)}
        hardwareAccelerated
        statusBarTranslucent
      >
        <TouchableOpacity
          className={`flex-1 items-center justify-center px-5 ${isDark ? 'bg-black/50' : 'bg-black/50'}`}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            className={`w-full max-w-md rounded-3xl p-6 ${isDark ? 'bg-neutral-900' : 'bg-white'}`}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <View className='mb-5 flex-row items-center justify-between'>
              <SemiBold className={`text-xl ${isDark ? 'text-white' : 'text-neutral-900'}`}>Select {label}</SemiBold>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <Cancel01Icon size={22} color={isDark ? '#fff' : '#000'} strokeWidth={2} />
              </TouchableOpacity>
            </View>

            {/* Options List */}
            <ScrollView className='max-h-96' showsVerticalScrollIndicator={false}>
              <View className='gap-2'>
                {options.map((option) => {
                  const isSelected = value === option.value
                  return (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => handleSelect(option.value)}
                      className={`flex-row items-center gap-3 rounded-2xl border p-4 ${
                        isSelected
                          ? isDark
                            ? 'border-blue-600 bg-blue-900/20'
                            : 'border-blue-600 bg-blue-50'
                          : isDark
                            ? 'border-neutral-700 bg-transparent'
                            : 'border-neutral-200 bg-transparent'
                      }`}
                    >
                      <View className='flex-1'>
                        <SemiBold
                          className={`text-base ${
                            isSelected
                              ? 'text-blue-600 dark:text-blue-400'
                              : isDark
                                ? 'text-neutral-100'
                                : 'text-neutral-900'
                          }`}
                        >
                          {option.label}
                        </SemiBold>
                      </View>
                      {isSelected && (
                        <Tick02Icon size={22} color={isSelected ? '#2563eb' : '#6b7280'} strokeWidth={2} />
                      )}
                    </TouchableOpacity>
                  )
                })}
              </View>
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}
