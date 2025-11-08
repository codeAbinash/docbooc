import Button from '@components/Button'
import InputWithLabel from '@components/InputWithLabel'
import KeyboardAvoid from '@components/KeyboardAvoid'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { TC_and_PP } from '@components/TC_and_PP'
import { useMutation } from '@tanstack/react-query'
import { client } from '@utils/client'
import { Black, Medium, SemiBold } from '@utils/fonts'
import { HPNavProp } from '@utils/types'
import { useState } from 'react'
import { Alert, View } from 'react-native'

export default function HPSignup({ navigation }: HPNavProp) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
        Alert.alert('Error', data.message || 'Failed to send OTP')
      }
    },
    onError: (error) => {
      console.log(error)
      Alert.alert('Error', 'Failed to send OTP. Please try again.')
      console.error(error)
    },
  })

  function handleSendOTP() {
    // navigation.navigate('HPOTP', { email, password, name, isSignup: true })
    // return
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name')
      return
    }
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address')
      return
    }
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter a password')
      return
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters')
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
                Sign up to get started with DocBook Console
              </Medium>
            </View>
            <View className='gap-5'>
              <InputWithLabel
                label='Full Name'
                placeholder='Enter your full name'
                value={name}
                onChangeText={setName}
                autoCapitalize='words'
              />
              <InputWithLabel
                label='Email Address'
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
                secureTextEntry
                autoCapitalize='none'
              />
              <Button
                title={sendOtpMutation.isPending ? 'Sending...' : 'Send OTP'}
                onPress={handleSendOTP}
                disabled={sendOtpMutation.isPending}
              />
              <SemiBold className='text text-center text-sm opacity-70' onPress={() => navigation.navigate('HPLogin')}>
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
