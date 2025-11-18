import authStore from '@/zustand/authStore'
import popupStore from '@/zustand/popupStore'
import Button from '@components/Button'
import InputWithLabel from '@components/InputWithLabel'
import KeyboardAvoid from '@components/KeyboardAvoid'
import Label from '@components/Label'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { TC_and_PP } from '@components/TC_and_PP'
import { useMutation } from '@tanstack/react-query'
import { client, updateClientHeader } from '@utils/client'
import { Black, Bold, Medium, SemiBold } from '@utils/fonts'
import { secureLs } from '@utils/storage'
import { HPNavProp } from '@utils/types'
import { useState } from 'react'
import { View } from 'react-native'

export default function HPLogin({ navigation }: HPNavProp) {
  const { setToken } = authStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const alert = popupStore((state) => state.alert)

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

  function handleLogin() {
    if (!email.trim()) {
      alert('Error', 'Please enter your email address')
      return
    }
    if (!password.trim()) {
      alert('Error', 'Please enter your password')
      return
    }

    loginMutation.mutate({ email: email.trim(), password })
  }

  return (
    <KeyboardAvoid className='bg h-full flex-1'>
      <PaddingTop />
      <View className='h-screen flex-1 items-center justify-between p-5'>
        <View className='w-full flex-1 justify-center gap-10'>
          <View className='gap-16'>
            <View className='items-center justify-center gap-1'>
              <Black className='text text-5xl'>DocBook</Black>
              <Bold className='text text-4xl'>Console</Bold>
              <Medium className='text mt-3 text-sm opacity-70'>Please enter your credentials to login.</Medium>
            </View>
            <View className='gap-5'>
              <InputWithLabel
                label='Email'
                placeholder='Enter your email address'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
              />
              <InputWithLabel
                label='Password'
                placeholder='Enter your password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry={__DEV__ ? false : true}
                autoCapitalize='none'
              />
              <Button
                title={loginMutation.isPending ? 'Logging in...' : 'Login'}
                onPress={handleLogin}
                disabled={loginMutation.isPending}
              />
              <SemiBold className='text text-center text-sm opacity-70' onPress={() => navigation.navigate('HPSignup')}>
                Don't have an account? <SemiBold className='text-accent'>Sign Up</SemiBold>
              </SemiBold>
            </View>
          </View>
          <TC_and_PP />
        </View>
      </View>
      <PaddingBottom />
    </KeyboardAvoid>
  )
}
