import { ReactNode } from 'react'
import { Image, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { Medium, SemiBold } from '@utils/fonts'
import { DEFAULT_LP_IMAGE } from '@/constants'

type HPCardsProps = {
  title: string
  startTime?: string
  endTime?: string
  q?: string
  time?: string
  subtitle?: string
  icon?: ReactNode
  image?: string
  address: string
  distance: string
  selected?: boolean
  showSelector?: boolean
} & TouchableOpacityProps

export function HPCards({
  title,
  startTime,
  endTime,
  q = 'N/A',
  time,
  subtitle,
  icon,
  image,
  address = 'N/A',
  distance = 'N/A',
  selected,
  showSelector = true,
  onPress,
  ...rest
}: HPCardsProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={`overflow-hidden rounded-2xl border bg-white dark:bg-neutral-800 ${selected ? 'border-blue-600' : 'border-neutral-200 dark:border-neutral-700'}`}
      {...rest}
    >
      <HPCardsInternal
        title={title}
        startTime={startTime}
        endTime={endTime}
        q={q}
        time={time}
        subtitle={subtitle}
        icon={icon}
        image={image}
        address={address}
        distance={distance}
        selected={!!selected}
        showSelector={showSelector}
      />
    </TouchableOpacity>
  )
}

function HPCardsInternal({
  title,
  startTime,
  endTime,
  q,
  time,
  subtitle,
  icon,
  image,
  address,
  distance,
  selected,
  showSelector,
}: {
  title: string
  startTime?: string
  endTime?: string
  q?: string
  time?: string
  subtitle?: string
  icon?: ReactNode
  image?: string
  address: string
  distance: string
  selected: boolean
  showSelector: boolean
}) {
  return (
    <View className='gap-3 p-3 dark:bg-neutral-800'>
      <View className='flex-1 gap-1 rounded-lg  bg-neutral-100 p-2 dark:bg-amber-900/20'>
        <View className='flex-1  flex-row items-center gap-3'>
          <View>
            {/* {icon && <View className='py-1 d'>{icon}</View>} */}
            <Image source={{ uri: image || DEFAULT_LP_IMAGE }} className='size-12 rounded-xl' resizeMode='cover' />
          </View>

          <View className='flex-1 gap-1'>
            <View className='flex-1 flex-row  items-start'>
              <View className='flex-1 gap-1 '>
                <SemiBold className='text-base  text-neutral-900 dark:text-white'>{title}</SemiBold>
                {/* {subtitle && <Medium className='text-xs text-neutral-600 dark:text-neutral-400'>{subtitle}</Medium>} */}
              </View>

              {showSelector && (
                <View className='w-7 items-center justify-center'>
                  <View
                    className={`h-6 w-6 items-center justify-center rounded-full ${
                      selected
                        ? 'border-blue-600  bg-blue-600'
                        : 'border-neutral-300  bg-neutral-100 dark:border-neutral-600 dark:bg-zinc-800'
                    }`}
                  >
                    {selected && <View className='h-2.5 w-2.5 rounded-full bg-white ' />}
                  </View>
                </View>
              )}
            </View>

            <Medium className='text-sm text-neutral-800 dark:text-amber-100' numberOfLines={1} ellipsizeMode='clip'>
              {address}
            </Medium>
          </View>
        </View>
      </View>

      {/* Info Grid - 3 Columns */}
      <View className='flex-1 flex-row gap-2'>
        {time && (
          <View className='flex-1 gap-1 rounded-lg bg-blue-50 p-2 dark:bg-blue-900/20'>
            <Medium className='text-xs font-semibold text-blue-700 dark:text-blue-400'>Time Slot</Medium>
            <SemiBold className='text-sm text-blue-900 dark:text-blue-200'>{time}</SemiBold>
          </View>
        )}

        <View className='flex-1 flex-row gap-2'>
          <View className='flex-1 gap-1 rounded-lg bg-blue-50 p-2 dark:bg-blue-900/20'>
            <Medium className='text-xs font-semibold text-blue-700 dark:text-blue-400'>Distance</Medium>
            <SemiBold className='text-sm text-blue-900 dark:text-blue-200'>{distance}</SemiBold>
          </View>
          <View className='flex-1 gap-1 rounded-lg bg-blue-50 p-2 dark:bg-blue-900/20'>
            <Medium className='text-xs font-semibold text-blue-700 dark:text-blue-400'>Queue</Medium>
            <SemiBold className='text-sm text-blue-900 dark:text-blue-200'>Q{q}</SemiBold>
          </View>
        </View>
      </View>
    </View>
  )
}
