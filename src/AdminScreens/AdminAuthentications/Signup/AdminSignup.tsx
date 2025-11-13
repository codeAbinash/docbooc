import popupStore from '@/zustand/popupStore'
import Button from '@components/Button'
import Input from '@components/Input'
import KeyboardAvoid from '@components/KeyboardAvoid'
import Label from '@components/Label'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { TC_and_PP } from '@components/TC_and_PP'
import { useMutation } from '@tanstack/react-query'
import { adminApi } from '@utils/client'
import { Black, Medium, SemiBold } from '@utils/fonts'
import { AdminNavProp } from '@utils/types'
import { useState } from 'react'
import { View } from 'react-native'

export default function AdminSignup({ navigation }: AdminNavProp) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const alert = popupStore((state) => state.alert)

  const sendOtpMutation = useMutation({
    mutationFn: async (email: string) => {
      console.log(email)
      const response = await adminApi.auth['verify-email'].$post({
        json: { email },
      })
      return response.json()
    },
    onSuccess: (data) => {
      console.log(data)
      if (data.success) {
        navigation.navigate('AdminOTP', { email, password, name, isSignup: true })
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

  function handleSendOTP() {
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
  }

  return (
    <KeyboardAvoid className='bg h-full flex-1'>
      <PaddingTop />
      <View className='h-screen flex-1 items-center justify-between p-5'>
        <View className='w-full flex-1 justify-center gap-10'>
          <View className='gap-16'>
            <View className='items-center justify-center gap-1'>
              <Black className='text text-5xl'>Create Account</Black>
              <Medium className='text mt-3 text-center text-sm opacity-70'>
                Sign up to get started with DocBook Admin
              </Medium>
            </View>
            <View className='gap-2'>
              <Label>Full Name</Label>
              <Input placeholder='Enter your full name' value={name} onChangeText={setName} autoCapitalize='words' />
              <Label>Email Address</Label>
              <Input
                placeholder='Email Address'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
              />
              <Label>Password</Label>
              <Input
                placeholder='Enter your password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize='none'
              />
              <View className='mt-5'>
                <Button
                  title={sendOtpMutation.isPending ? 'Sending...' : 'Send OTP'}
                  onPress={handleSendOTP}
                  disabled={sendOtpMutation.isPending}
                />
              </View>
              <SemiBold
                className='text text-center text-sm opacity-70'
                onPress={() => navigation.navigate('AdminLogin')}
              >
                Already have an account? <SemiBold className='text-accent'>Login</SemiBold>
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
