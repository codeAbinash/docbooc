import React, { useState, useEffect } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, ViewProps } from 'react-native'

interface KeyboardAvoidingContainerProps extends ViewProps {}

export default function KeyboardAvoid({ children, style, ...props }: KeyboardAvoidingContainerProps) {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true)
    })
    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false)
    })

    return () => {
      showListener.remove()
      hideListener.remove()
    }
  }, [])

  return (
    <KeyboardAvoidingView
      style={[{ flex: 1 }, style]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 10}
      enabled={isKeyboardVisible}
      {...props}
    >
      {children}
    </KeyboardAvoidingView>
  )
}