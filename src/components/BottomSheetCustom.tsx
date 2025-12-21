import React from 'react'
import { Modal, TouchableOpacity, View, ScrollView, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import { H } from '@utils/dimensions'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const BOTTOM_SHEET_HEIGHT = SCREEN_HEIGHT * 0.5

type BottomSheetCustomProps = {
  visible: boolean
  onClose: () => void
  children: React.ReactNode
  height?: number
  backgroundColor?: string
  showHandle?: boolean
  snapPoints?: number[]
}

export default function BottomSheetCustom({
  visible,
  onClose,
  children,
  height = BOTTOM_SHEET_HEIGHT,
  backgroundColor = 'white',
  showHandle = true,
  snapPoints = [],
}: BottomSheetCustomProps) {
  return (
    <Modal visible={visible} transparent animationType='slide' onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={{ flex: 1, justifyContent: 'flex-end' }}
      >
        <View className='flex-1 justify-end bg-black/50'>
          <TouchableOpacity activeOpacity={1} className='flex-1' onPress={onClose} />
          <View style={{ height, backgroundColor }} className='shadow-lg'>
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
      </KeyboardAvoidingView>
    </Modal>
  )
}
