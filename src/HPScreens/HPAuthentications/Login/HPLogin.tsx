import authStore from '@/zustand/authStore'
import popupStore from '@/zustand/popupStore'
import Button from '@components/Button'
import InputWithLabel from '@components/InputWithLabel'
import BottomSheet from '@components/BottomSheet'
import PageCarousel from '@components/PageCarousel'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { TC_and_PP } from '@components/TC_and_PP'
import { useMutation } from '@tanstack/react-query'
import { client, updateClientHeader } from '@utils/client'
import { Black, Bold, Medium, SemiBold } from '@utils/fonts'
import { secureLs } from '@utils/storage'
import { HPNavProp } from '@utils/types'
import { useState, useMemo, useCallback } from 'react'
import { View } from 'react-native'

export default function HPLogin({ navigation }: HPNavProp) {
  const { setToken } = authStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const alert = popupStore((state) => state.alert)

  const pages = useMemo(
    () => [
      <View key='page1' className='flex-1 items-center justify-center bg-blue-100 dark:bg-blue-900'>
        <Bold className='text-3xl text-blue-900 dark:text-blue-100'>Welcome Back</Bold>
        <Medium className='pt-4 text-center text-blue-800 dark:text-blue-200'>
          Login to manage your health center
        </Medium>
      </View>,
      <View key='page2' className='flex-1 items-center justify-center bg-purple-100 dark:bg-purple-900'>
        <Bold className='text-3xl text-purple-900 dark:text-purple-100'>Easy Access</Bold>
        <Medium className='pt-4 text-center text-purple-800 dark:text-purple-200'>
          Quick and secure authentication
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

  const handleEmailChange = useCallback((text: string) => {
    setEmail(text)
  }, [])

  const handlePasswordChange = useCallback((text: string) => {
    setPassword(text)
  }, [])

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await client.api.v1.hp.auth.login.$post({
        json: { email, password },
      })
      return response.json()
    },
    onSuccess: (data) => {
      if (!data || !data.success || !data.data) return alert('Error', data.message || 'Invalid credentials')
      secureLs.set('token', data.data.token)
      setToken(data.data.token)
      updateClientHeader(data.data.token)
      navigation.reset({
        index: 0,
        routes: [{ name: 'HPHome' }],
      })
    },
    onError: (error) => {
      console.log(error)
      alert('Error', 'Failed to login. Please try again.')
      console.error(error)
    },
  })

  const handleLogin = useCallback(() => {
    if (!email.trim()) {
      alert('Error', 'Please enter your email address')
      return
    }
    if (!password.trim()) {
      alert('Error', 'Please enter your password')
      return
    }

    loginMutation.mutate({ email: email.trim(), password })
  }, [email, password, loginMutation, alert])

  return (
    <View className='flex-1 bg-white dark:bg-black'>
      <PaddingTop />

      <PageCarousel pages={pages} onPageChange={handlePageChange} showDots />

      <BottomSheet visible={true} onClose={() => {}}>
        <View className='gap-6 px-6 py-4'>
          <View className='gap-2'>
            <Bold className='text-2xl text-black dark:text-white'>Login to Console</Bold>
            <Medium className='text-sm text-gray-600 dark:text-gray-400'>
              Enter your credentials to access your dashboard
            </Medium>
          </View>

          <View className='gap-5'>
            <InputWithLabel
              label='Email'
              placeholder='Enter your email address'
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
              secureTextEntry={__DEV__ ? false : true}
              autoCapitalize='none'
            />
          </View>

          <Button
            title={loginMutation.isPending ? 'Logging in...' : 'Login'}
            onPress={handleLogin}
            disabled={loginMutation.isPending}
          />

          <SemiBold className='text-center text-sm text-gray-600 dark:text-gray-400'>
            Don't have an account?{' '}
            <SemiBold className='text-accent' onPress={() => navigation.navigate('HPSignup')}>
              Sign Up
            </SemiBold>
          </SemiBold>

          <TC_and_PP />
        </View>
      </BottomSheet>

      <PaddingBottom />
    </View>
  )
}
