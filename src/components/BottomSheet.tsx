import React from 'react'
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

type BottomSheetProps = {
  visible: boolean
  onClose: () => void
  children: React.ReactNode
  heightRatio?: number
  backgroundColor?: string
  showHandle?: boolean
  snapPoints?: number[]
}

export default function BottomSheet({
  visible,
  onClose,
  children,
  heightRatio = 0.5,
  backgroundColor = 'white',
  showHandle = true,
  snapPoints = [],
}: BottomSheetProps) {
  const insets = useSafeAreaInsets()
  const sheetHeight = (SCREEN_HEIGHT - insets.bottom) * heightRatio
  return (
    <View className='fixed bottom-0 flex-1 justify-end bg-blue-500'>
      <TouchableOpacity activeOpacity={1} className='d flex-1 rounded-lg' onPress={onClose} />
      <View style={{ height: sheetHeight }} className='border-t border-neutral-300 dark:border-zinc-700'>
        {showHandle && (
          <View className='items-center py-2'>
            <View className='h-1 w-12 rounded-full bg-gray-300' />
          </View>
        )}
        <ScrollView scrollEnabled={false} keyboardShouldPersistTaps='always' className='flex-1 bg-green-500'>
          {children}
        </ScrollView>
      </View>
    </View>
  )
}
