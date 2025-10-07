import Cancel01Icon from '@hugeicons/Cancel01Icon'
import TickDouble02Icon from '@hugeicons/TickDouble02Icon'
import Colors from '@utils/colors'
import { Medium, SemiBold } from '@utils/fonts'
import { memo, useCallback, useEffect } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

type Patient = {
  id: string
  name: string
  age: number
  gender: 'Male' | 'Female' | 'Other'
  queuePosition: number
}

type PatientCardProps = {
  patient: Patient
  isExpanded: boolean
  onToggle: (patientId: string) => void
}

const PatientCard = memo(({ patient, isExpanded, onToggle }: PatientCardProps) => {
  const animatedHeight = useSharedValue(0)

  useEffect(() => {
    animatedHeight.value = withTiming(isExpanded ? 54 : 0, {
      duration: 150,
    })
  }, [isExpanded, animatedHeight])

  const animatedStyle = useAnimatedStyle(
    () => ({
      height: animatedHeight.value,
      opacity: animatedHeight.value / 60,
    }),
    [],
  )

  const toggleExpand = useCallback(() => {
    onToggle(patient.id)
  }, [onToggle, patient.id])

  return (
    <View className='mb-3 overflow-hidden rounded-[19px] bg-white shadow-sm dark:bg-zinc-900'>
      <TouchableOpacity onPress={toggleExpand} className='p-3.5' activeOpacity={0.7}>
        <View className='flex-row items-center'>
          <View className='mr-4'>
            <Medium>
              <View className='size-[65px] items-center justify-center rounded-xl bg-accent/10'>
                <SemiBold className={`text-center text-3xl text-accent`}>
                  {patient.queuePosition.toString().padStart(2, '0')}
                </SemiBold>
              </View>
            </Medium>
          </View>

          <View className='flex-1'>
            <SemiBold className='text text-lg'>{patient.name}</SemiBold>
            <Medium className='mt-1 text-sm text-neutral-600 dark:text-neutral-400'>
              {patient.gender} •{patient.age} years
            </Medium>
          </View>
        </View>
      </TouchableOpacity>

      <Animated.View style={animatedStyle} className='overflow-hidden px-1'>
        <View className='flex-row justify-around gap-3 pb-3'>
          <TouchableOpacity
            className='ml-2 flex-1 flex-row items-center justify-center rounded-xl bg-red-500/15 py-3.5'
            activeOpacity={0.7}
          >
            <Cancel01Icon size={18} color='#ef4444' strokeWidth={2.5} />
            <SemiBold className='ml-2 text-red-600 dark:text-red-400'>Cancel</SemiBold>
          </TouchableOpacity>
          <TouchableOpacity
            className='mr-2 flex-1 flex-row items-center justify-center rounded-xl bg-green-500/15 py-3.5'
            activeOpacity={0.7}
          >
            <TickDouble02Icon size={18} color={Colors.success} strokeWidth={2.5} />
            <SemiBold className='ml-2 text-green-600 dark:text-green-400'>Complete</SemiBold>
          </TouchableOpacity>
          {/* <TouchableOpacity
            className='ml-2 flex-1 flex-row items-center justify-center rounded-2xl border bg-red-500/30 py-3.5'
            activeOpacity={0.7}
          >
            <Cancel01Icon size={18} color='black' variant='solid-rounded' />
            <Medium className='ml-2 text-black'>Cancel</Medium>
          </TouchableOpacity>
          <TouchableOpacity
            className='mr-2 flex-1 flex-row items-center justify-center rounded-2xl bg-green-500/30 py-3.5'
            activeOpacity={0.7}
          >
            <Tick01Icon size={18} color='black' variant='solid-rounded' />
            <Medium className='ml-2 text-black'>Complete</Medium>
          </TouchableOpacity> */}
        </View>
      </Animated.View>
    </View>
  )
})

PatientCard.displayName = 'PatientCard'

export default PatientCard
