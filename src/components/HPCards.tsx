import { ReactNode } from 'react'
import { Image, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { Medium, SemiBold } from '@utils/fonts'

type HPCardsProps = {
  title: string
  startTime?: string
  endTime?: string
  q?: string
  time?: string
  subtitle?: string
  icon?: ReactNode
  image?: string
  address?: string
  distance?: string
  leftContent?: ReactNode
  rightContent?: ReactNode
  selected?: boolean
  showSelector?: boolean
} & TouchableOpacityProps

export function HPCards({
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
  leftContent,
  rightContent,
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
        leftContent={leftContent}
        rightContent={rightContent}
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
  leftContent,
  rightContent,
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
  address?: string
  distance?: string
  leftContent?: ReactNode
  rightContent?: ReactNode
  selected: boolean
  showSelector: boolean
}) {
  return (
    <>
      {/* Header Section */}
      <View className='flex-row items-start gap-3 p-4 dark:bg-neutral-800'>
        {icon && <View className='pt-0.5'>{icon}</View>}
        {image && <Image source={{ uri: image }} className='size-20 rounded-xl' resizeMode='cover' />}

        <View className='flex-1'>
          <View className='flex-1 flex-row items-start justify-between'>
            <SemiBold className='text-base text-neutral-900 dark:text-white'> {title}</SemiBold>
            <View className='items-center justify-center gap-1'>
              {showSelector && (
                <View className='w-7 items-center justify-center'>
                  <View
                    className={`h-6 w-6 items-center justify-center rounded-full border-2 ${
                      selected
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-neutral-300 bg-white dark:border-neutral-600 dark:bg-zinc-800'
                    }`}
                  >
                    {selected && <View className='h-2.5 w-2.5 rounded-full bg-white' />}
                  </View>
                </View>
              )}
            </View>
          </View>

          <View className='flex-1 flex-row items-start justify-between'>
            {time && (
              <View className='gap-1 rounded-sm bg-neutral-100 p-2 dark:bg-neutral-700'>
                <Medium className='text-sm text-black'>{time}</Medium>
              </View>
            )}
            {q && <SemiBold className='text-lg text-neutral-900 dark:text-white'>Q{q}</SemiBold>}
          </View>
        </View>
      </View>

      {/* Content Section - 3 Box Design */}
      {(leftContent || rightContent || address || distance) && (
        <>
          <View className='border-b border-neutral-200 dark:border-neutral-700' />
          <View className='flex-row items-end gap-3 p-4 dark:bg-neutral-800'>
            {leftContent ? (
              <View className='flex-1 gap-1 rounded-lg bg-neutral-100 p-3 dark:bg-neutral-700'>{leftContent}</View>
            ) : address ? (
              <View className='flex-1 gap-1 rounded-lg bg-neutral-100 p-3 dark:bg-neutral-700'>
                <Medium className='text-xs font-semibold text-neutral-600 dark:text-neutral-400'>Address</Medium>
                <Medium className='text-sm text-neutral-800 dark:text-neutral-100' numberOfLines={1}>
                  {address}
                </Medium>
              </View>
            ) : null}
            {(leftContent || address) && (rightContent || distance) && (
              <View className='h-full w-px bg-neutral-200 dark:bg-neutral-600' />
            )}
            {rightContent ? (
              <View className='gap-1 rounded-lg bg-neutral-100 p-3 dark:bg-neutral-700'>{rightContent}</View>
            ) : distance ? (
              <View className='gap-1 rounded-lg bg-neutral-100 p-3 dark:bg-neutral-700'>
                <Medium className='text-xs font-semibold text-neutral-600 dark:text-neutral-400'>Distance</Medium>
                <SemiBold className='text-sm text-accent'>{distance}</SemiBold>
              </View>
            ) : null}
          </View>
        </>
      )}
    </>
  )
}
