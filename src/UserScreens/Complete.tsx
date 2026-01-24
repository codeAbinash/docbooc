import Animations from '@assets/animations/animations'
import Button from '@components/Button'
import { Lottie } from '@components/Lottie'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { DarkContentTransparentStatusBar } from '@components/StatusBar'
import { RouteProp } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { api } from '@utils/client'
import Colors from '@utils/colors'
import { W } from '@utils/dimensions'
import { Bold, Regular, SemiBold } from '@utils/fonts'
import { NavProp } from '@utils/types'
import { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Animated, View } from 'react-native'
import { RootStackParamList } from '../../App'

type CompleteScreenProps = NavProp & {
  route: RouteProp<RootStackParamList, 'Complete'>
}

export default function Complete({ navigation, route }: CompleteScreenProps) {
  const [showContent, setShowContent] = useState(false)
  const bookingId = route.params?.bookingId

  const { data: bookingData, isLoading } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: async () => {
      if (!bookingId) return null
      const response = await api.users.booking[':bookingId'].$get({
        param: { bookingId },
      })
      return response.json()
    },
    enabled: !!bookingId,
  })

  const verificationCode = bookingData?.data?.booking?.sharedCode || 'N/A'

  const contentOpacity = useRef(new Animated.Value(0)).current
  const mainContentTransform = useRef(new Animated.Value(0)).current
  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateAnim = useRef(new Animated.Value(50)).current

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(mainContentTransform, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(translateAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start()
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const animatedMainStyle = {
    opacity: mainContentTransform,
    transform: [
      {
        translateY: translateAnim,
      },
    ],
  }

  const animatedContentStyle = {
    opacity: contentOpacity,
  }

  const fadeInUp = (delay: number) => ({
    opacity: fadeAnim,
    transform: [{ translateY: translateAnim }],
  })

  return (
    <View className='flex-1'>
      <DarkContentTransparentStatusBar />

      {/* Close Button */}
      {/* <View className='d absolute right-6 top-12 z-10'>
          <Pressable className='h-8 w-8 items-center justify-center'>
            <Text className='text-lg text-gray-500'>✕</Text>
          </Pressable>
        </View> */}

      {/* Confetti Background Elements */}
      {/* <View className='absolute inset-0 items-center justify-center'>
          <View className='absolute left-12 top-32'>
            <Text className='text-xs' style={{ color: '#FFD700' }}>
              ★
            </Text>
          </View>
          <View className='absolute right-16 top-40'>
            <Text style={{ fontSize: 8, color: '#FF6B6B' }}>●</Text>
          </View>
          <View className='absolute left-20 top-48'>
            <Text style={{ fontSize: 6, color: '#4ECDC4' }}>▲</Text>
          </View>
          <View className='absolute right-24 top-36'>
            <Text className='text-xs' style={{ color: '#45B7D1' }}>
              ◆
            </Text>
          </View>
          <View className='absolute left-32 top-44'>
            <Text style={{ fontSize: 8, color: '#96CEB4' }}>■</Text>
          </View>
          <View className='absolute right-12 top-52'>
            <Text className='text-xs' style={{ color: '#FFEAA7' }}>
              ✦
            </Text>
          </View>
          <View className='absolute bottom-80 left-16'>
            <Text style={{ fontSize: 6, color: '#DDA0DD' }}>♦</Text>
          </View>
          <View className='absolute bottom-72 right-20'>
            <Text style={{ fontSize: 8, color: '#98D8C8' }}>●</Text>
          </View>
        </View> */}

      {/* Main Content */}
      <Animated.View
        className={`flex-1 items-center ${showContent ? 'justify-between' : 'justify-center'} px-6`}
        style={animatedMainStyle}
      >
        <View>
          <PaddingTop />
          <Lottie source={Animations.check} loop={false} style={{ width: 200, height: 200, marginBottom: 20 }} />
          {/* Main Success Message */}
          <View className='mb-8 items-center'>
            <Bold className='mb-3 text-center text-2xl leading-8' style={{ color: Colors.text.DEFAULT }}>
              Thanks, your booking has{'\n'}been confirmed.
            </Bold>
          </View>
        </View>

        {/* Verification Code Section */}
        {showContent && (
          <Animated.View className='mb-6' style={fadeInUp(200)}>
            <Regular className='mb-2 text-center text-xs' style={{ color: Colors.gray.DEFAULT }}>
              Verification Code
            </Regular>
            {isLoading ? (
              <ActivityIndicator size='small' color={Colors.accent} />
            ) : (
              <SemiBold className='text-center text-xl tracking-wider' style={{ color: Colors.accent }}>
                {verificationCode}
              </SemiBold>
            )}
          </Animated.View>
        )}

        {/* Motorcycle Animation */}
        {showContent && (
          <Animated.View className='mb-6 items-center' style={fadeInUp(400)}>
            <Lottie source={Animations.motorcycle} style={{ width: W * 0.9, height: W * 0.6 }} />
          </Animated.View>
        )}

        {/* Agent Visit Notice */}
        {showContent && (
          <Animated.View style={[animatedContentStyle, { width: '100%' }]}>
            <Animated.View
              className='w-full rounded-xl border border-amber-100 bg-amber-50 p-5 dark:bg-amber-900/20'
              style={fadeInUp(600)}
            >
              <SemiBold className='text-center text-sm text-amber-700 dark:text-amber-300'>
                An agent will visit your home to confirm your booking and provide additional assistance.
              </SemiBold>
            </Animated.View>
            <View>
              <Animated.View className='mt-6' style={fadeInUp(800)}>
                <Button
                  title='View Appointment'
                  onPress={() =>
                    navigation.reset({
                      index: 0,
                      routes: [
                        {
                          name: 'Home',
                          state: {
                            routes: [{ name: 'Appointments' }],
                            index: 0,
                          },
                        },
                      ],
                    })
                  }
                />
              </Animated.View>
            </View>
          </Animated.View>
        )}
        <PaddingBottom />
      </Animated.View>
    </View>
  )
}
