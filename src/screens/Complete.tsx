import Animations from '@assets/animations/animations'
import Button from '@components/Button'
import { Lottie } from '@components/Lottie'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { DarkContentTransparentStatusBar } from '@components/StatusBar'
import Colors from '@utils/colors'
import { W } from '@utils/dimensions'
import { Bold, Regular, SemiBold } from '@utils/fonts'
import { NavProp } from '@utils/types'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import Animated, {
  FadeInDown,
  FadeInUp,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export default function Complete({ navigation }: NavProp) {
  const [showContent, setShowContent] = useState(false)
  const verificationCode = 'MBB-' + Math.random().toString(36).substring(2, 8).toUpperCase()

  const contentOpacity = useSharedValue(0)
  const mainContentTransform = useSharedValue(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
      contentOpacity.value = withTiming(1, { duration: 800 })
      mainContentTransform.value = withTiming(1, { duration: 600 })
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const animatedMainStyle = useAnimatedStyle(() => {
    return {
      opacity: mainContentTransform.value,
      transform: [
        {
          translateY: (1 - mainContentTransform.value) * 50,
        },
      ],
    }
  })

  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,
    }
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
        layout={LinearTransition.springify().damping(15).stiffness(100)}
      >
        <View>
          <PaddingTop />
          <Lottie
            source={Animations.check}
            loop={false}
            // style={{ width: showContent ? 100 : 200, height: showContent ? 100 : 200, marginBottom: 20 }}
            style={{ width: 200, height: 200, marginBottom: 20 }}
          />
          {/* Main Success Message */}
          <View className='mb-8 items-center'>
            <Bold className='mb-3 text-center text-2xl leading-8' style={{ color: Colors.text.DEFAULT }}>
              Thanks, your booking has{'\n'}been confirmed.
            </Bold>
          </View>
        </View>

        {/* Verification Code Section */}
        {showContent && (
          <Animated.View
            className='mb-6'
            entering={FadeInUp.delay(200).duration(600).springify()}
            layout={LinearTransition.springify().damping(15)}
          >
            <Regular className='mb-2 text-center text-xs' style={{ color: Colors.gray.DEFAULT }}>
              Verification Code
            </Regular>
            <SemiBold className='text-center text-xl tracking-wider' style={{ color: Colors.accent }}>
              {verificationCode}
            </SemiBold>
          </Animated.View>
        )}

        {/* Motorcycle Animation */}
        {showContent && (
          <Animated.View
            className='mb-6 items-center'
            entering={FadeInUp.delay(400).duration(700).springify()}
            layout={LinearTransition.springify().damping(15)}
          >
            <Lottie source={Animations.motorcycle} style={{ width: W * 0.9, height: W * 0.6 }} />
          </Animated.View>
        )}

        {/* Agent Visit Notice */}
        {showContent && (
          <Animated.View style={animatedContentStyle} className='w-full'>
            <Animated.View
              className='w-full rounded-xl border border-amber-100 bg-amber-50 p-5 dark:bg-amber-900/20'
              entering={FadeInUp.delay(600).duration(700).springify()}
              layout={LinearTransition.springify().damping(15)}
            >
              <SemiBold className='text-center text-sm text-amber-700 dark:text-amber-300'>
                An agent will visit your home to confirm your booking and provide additional assistance.
              </SemiBold>
            </Animated.View>
            <View>
              <Animated.View
                className='mt-6'
                entering={FadeInDown.delay(800).duration(700).springify()}
                layout={LinearTransition.springify().damping(15)}
              >
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
