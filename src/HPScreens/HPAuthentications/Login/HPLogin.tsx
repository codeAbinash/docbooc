import { useCallback, useMemo, useState } from 'react'
import { Dimensions, Image, Pressable, Text, ToastAndroid, View } from 'react-native'
import { useMutation } from '@tanstack/react-query'

import authStore from '@/zustand/authStore'
import popupStore from '@/zustand/popupStore'
import Button from '@components/Button'
import InputWithLabel from '@components/InputWithLabel'
import PageCarousel from '@components/PageCarousel'
import { PaddingBottom } from '@components/SafePadding'
import KeyboardAvoid from '@components/KeyboardAvoid'
import { client } from '@utils/client'
import { Medium, SemiBold } from '@utils/fonts'
import { secureLs } from '@utils/storage'
import { HPNavProp } from '@utils/types'

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')

// Carousel images configuration - extracted for better maintainability
const CAROUSEL_IMAGES = [
  'https://i.pinimg.com/1200x/61/dc/b5/61dcb5ceec9718a23d4cac21a594e8be.jpg',
  'https://i.pinimg.com/736x/86/0f/2c/860f2c6be081c2f1b0fc46bc01655664.jpg',
  'https://i.pinimg.com/736x/2c/9c/c3/2c9cc35f2c3366fb392e5e5842d94742.jpg',
] as const

// Memoized carousel page component to prevent unnecessary re-renders
const CarouselPage = ({ uri, bgColor }: { uri: string; bgColor: string }) => (
  <View className={`flex-1 items-center justify-center ${bgColor}`}>
    <Image
      source={{ uri }}
      height={SCREEN_HEIGHT}
      width={SCREEN_WIDTH}
      className='absolute top-0'
      resizeMode='cover'
    />
  </View>
)

export default function HPLogin({ navigation }: HPNavProp) {
  const { setToken } = authStore()
  const alert = popupStore((state) => state.alert)
  
  const [currentPage, setCurrentPage] = useState(0)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Memoize carousel pages to prevent recreation on every render
  const carouselPages = useMemo(
    () => [
      <CarouselPage key='page1' uri={CAROUSEL_IMAGES[0]} bgColor='bg-blue-100 dark:bg-blue-900' />,
      <CarouselPage key='page2' uri={CAROUSEL_IMAGES[1]} bgColor='bg-purple-100 dark:bg-purple-900' />,
      <CarouselPage key='page3' uri={CAROUSEL_IMAGES[2]} bgColor='bg-green-100 dark:bg-green-900' />,
    ],
    []
  )

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await client.api.v1.hp.auth.login.$post({
        json: { email, password },
      })
      return response.json()
    },
    onSuccess: (data) => {
      if (!data?.success || !data?.data) {
        return alert('Error', data?.message || 'Invalid credentials')
      }
      
      secureLs.set('token', data.data.token)
      setToken(data.data.token)
      navigation.reset({
        index: 0,
        routes: [{ name: 'HPHome' }],
      })
    },
    onError: (error) => {
      console.error('Login error:', error)
      alert('Error', 'Failed to login. Please try again.')
    },
  })

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const handleSkip = useCallback(() => {
    navigation.reset({ index: 0, routes: [{ name: 'HPHome' }] })
  }, [navigation])

  const handleLogin = useCallback(() => {
    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    if (!trimmedEmail) {
      ToastAndroid.show('Please enter your email address', ToastAndroid.SHORT)
      return
    }
    if (!trimmedPassword) {
      ToastAndroid.show('Please enter your password', ToastAndroid.SHORT)
      return
    }

    loginMutation.mutate({ email: trimmedEmail, password: trimmedPassword })
  }, [email, password, loginMutation])

  const handleNavigateToSignup = useCallback(() => {
    navigation.navigate('HPSignup')
  }, [navigation])

  const handleTermsPress = useCallback(() => {
    // TODO: Navigate to Terms & Conditions
  }, [])

  return (
    <View className='flex-1 bg-white dark:bg-black'>
      <KeyboardAvoid>
        <View className='flex-1 justify-between'>
          {/* Carousel Background */}
          <View 
            className='absolute top-0 h-full flex-1 bg-white' 
            style={{ height: SCREEN_HEIGHT, width: '100%' }}
          >
            <PageCarousel
              pages={carouselPages}
              onPageChange={handlePageChange}
              showDots
              carouselHeightRatio={1}
              onSkip={handleSkip}
            />
          </View>

          {/* Spacer */}
          <View />

          {/* Login Form Card */}
          <View className='rounded-t-[30px] bg-white px-6 pb-4 pt-2.5'>
            {/* Handle Indicator */}
            <View className='items-center pb-3 pt-2'>
              <View className='h-1 w-12 rounded-full bg-gray-300' />
            </View>

            {/* Title */}
            <SemiBold className='pb-4 text-xl text-black dark:text-white'>
              Login to Health Center Console
            </SemiBold>

            {/* Input Fields */}
            <View className='gap-3'>
              <InputWithLabel
                label='Email'
                placeholder='Enter your email address'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
                autoComplete='email'
                textContentType='emailAddress'
              />
              <InputWithLabel
                label='Password'
                placeholder='Enter your password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!__DEV__}
                autoCapitalize='none'
                autoComplete='password'
                textContentType='password'
              />
            </View>

            {/* Login Button */}
            <View className='pt-4'>
              <Button
                title={loginMutation.isPending ? 'Logging in...' : 'Login'}
                onPress={handleLogin}
                disabled={loginMutation.isPending}
              />
            </View>

            {/* Footer Links */}
            <View className='items-center justify-center gap-2 pt-5'>
              <Medium className='text-center text-xs text-zinc-600 dark:text-zinc-400'>
                Don't have an account?{' '}
                <SemiBold className='text-accent' onPress={handleNavigateToSignup}>
                  Register here
                </SemiBold>
              </Medium>

              <View className='flex-row items-center justify-center gap-8 pt-3'>
                <Pressable onPress={handleTermsPress}>
                  <Medium className='text-sm font-semibold text-blue-600 underline'>
                    Terms & Conditions
                  </Medium>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <PaddingBottom />
      </KeyboardAvoid>
    </View>
  )
}