import popupStore from '@/zustand/popupStore'
import Button from '@components/Button'
import InputWithLabel from '@components/InputWithLabel'

import { PaddingBottom, PaddingTop } from '@components/SafePadding'

import { useMutation } from '@tanstack/react-query'
import { client } from '@utils/client'
import { Bold, Medium, SemiBold } from '@utils/fonts'
import { HPNavProp } from '@utils/types'
import { useState, useMemo, useCallback } from 'react'
import { Pressable, Text, View } from 'react-native'

export default function HPSignup({ navigation }: HPNavProp) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const alert = popupStore((state) => state.alert)

  const pages = useMemo(
    () => [
      <View key='page1' className='flex-1 items-center justify-center bg-blue-100 dark:bg-blue-900'>
        <Bold className='text-3xl text-blue-900 dark:text-blue-100'>Welcome to DocBook</Bold>
        <Medium className='pt-4 text-center text-blue-800 dark:text-blue-200'>Create your health center account</Medium>
      </View>,
      <View key='page2' className='flex-1 items-center justify-center bg-purple-100 dark:bg-purple-900'>
        <Bold className='text-3xl text-purple-900 dark:text-purple-100'>Easy Setup</Bold>
        <Medium className='pt-4 text-center text-purple-800 dark:text-purple-200'>
          Get started in just a few steps
        </Medium>
      </View>,
      <View key='page3' className='flex-1 items-center justify-center bg-green-100 dark:bg-green-900'>
        <Bold className='text-3xl text-green-900 dark:text-green-100'>DocBook Console</Bold>
        <Medium className='pt-4 text-center text-green-800 dark:text-green-200'>
          Manage your practice efficiently
        </Medium>
      </View>,
    ],
    [],
  )

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const handleNameChange = useCallback((text: string) => {
    setName(text)
  }, [])

  const handleEmailChange = useCallback((text: string) => {
    setEmail(text)
  }, [])

  const handlePasswordChange = useCallback((text: string) => {
    setPassword(text)
  }, [])

  const sendOtpMutation = useMutation({
    mutationFn: async (email: string) => {
      console.log(email)
      const response = await client.api.v1.hp.auth['verify-email'].$post({
        json: { email },
      })
      return response.json()
    },
    onSuccess: (data) => {
      console.log(data)
      if (data.success) {
        navigation.navigate('HPOTP', { email, password, name, isSignup: true })
      } else {
        alert('Error', data.message || 'Failed to send OTP')
      }
    },
    onError: (error) => {
      console.log(error)
      alert('Error', 'Failed to send OTP. Please try again.')
      console.error(error)
    },
  })

  const handleSendOTP = useCallback(() => {
    if (!name.trim()) {
      alert('Error', 'Please enter your name')
      return
    }
    if (!email.trim()) {
      alert('Error', 'Please enter your email address')
      return
    }
    if (!password.trim()) {
      alert('Error', 'Please enter a password')
      return
    }
    if (password.length < 6) {
      alert('Error', 'Password must be at least 6 characters')
      return
    }

    sendOtpMutation.mutate(email.trim())
  }, [name, email, password, sendOtpMutation, alert])

  return (
    <View className='flex-1  bg-white dark:bg-black'>
      <PaddingTop />

      <View className='flex-1 justify-between px-8 '>
        <View className='flex-1 justify-center gap-4 '>
          <View className=''>
            <Bold className='text-2xl text-black dark:text-white'>Create Account</Bold>
            <Medium className='text-sm text-gray-600 dark:text-gray-400'>
              Sign up to get started with DocBook Console
            </Medium>
          </View>

          <View className='gap-3'>
            <InputWithLabel
              label='Full Name'
              placeholder='Enter your full name'
              value={name}
              onChangeText={handleNameChange}
              autoCapitalize='words'
            />
            <InputWithLabel
              label='Email Address'
              placeholder='Email Address'
              value={email}
              onChangeText={handleEmailChange}
              keyboardType='email-address'
              autoCapitalize='none'
            />
            <InputWithLabel
              label='Password'
              placeholder='Enter your password'
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry
              autoCapitalize='none'
            />
          </View>
          <View className='gap-2 pt-4'>
            <Button
            title={sendOtpMutation.isPending ? 'Sending...' : 'Send OTP'}
            onPress={handleSendOTP}
            disabled={sendOtpMutation.isPending}
          />

          <Medium className='text-center text-base text-gray-600 dark:text-gray-400'>
            Already have an account?{' '}
            <SemiBold className='text-accent' onPress={() => navigation.navigate('HPLogin')}>
              Login
            </SemiBold>
          </Medium>
        </View>
          </View>
          

        <View className='flex items-center justify-center pt-3 pb-3'>
        <Medium className='text-center text-xs text-zinc-600 dark:text-zinc-400'>By 'logging in' I agree to the</Medium>

        <View className='flex-row items-center justify-center gap-8'>
          <Pressable onPress={() => {}}>
            <Text className='font-semibold text-blue-600 underline'>Terms of Service & Privacy Policy</Text>
          </Pressable>
        </View>
      </View>
      </View>

      <PaddingBottom />
    </View>
  )
}
