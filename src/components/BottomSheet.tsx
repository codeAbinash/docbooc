import React from 'react'
import { Modal, TouchableOpacity, View, ScrollView, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import { H } from '@utils/dimensions'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

type BottomSheetProps = {
  visible: boolean
  onClose: () => void
  children: React.ReactNode
  height?: number
  heightRatio?: number
  backgroundColor?: string
  showHandle?: boolean
  snapPoints?: number[]
}

export default function BottomSheet({
  visible,
  onClose,
  children,
  height,
  heightRatio = 0.5,
  backgroundColor = 'white',
  showHandle = true,
  snapPoints = [],
}: BottomSheetProps) {
  const sheetHeight = height ?? SCREEN_HEIGHT * heightRatio
  return (
    
      <View className='flex-1 justify-end bg-black/50'>
        <TouchableOpacity activeOpacity={1} className='flex-1' onPress={onClose} />
        <View style={{ height: sheetHeight, backgroundColor }} className='shadow-lg'>
          {showHandle && (
            <View className='items-center py-2'>
              <View className='h-1 w-12 rounded-full bg-gray-300' />
            </View>
          )}

          <ScrollView scrollEnabled={false} keyboardShouldPersistTaps='always' className='flex-1'>
            {children}
          </ScrollView>
        </View>
      </View>
    
  )
}
