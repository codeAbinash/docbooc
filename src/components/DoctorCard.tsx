import { Medium, SemiBold } from '@utils/fonts'
import { Image, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Colors from '@utils/colors'
import TimeScheduleIcon from '@hugeicons/TimeScheduleIcon'
import Cancel01Icon from '@hugeicons/Cancel01Icon'
import PlusSignIcon from '@hugeicons/PlusSignIcon'
import { HPStackNav } from '@utils/types'

type DoctorCardProps = {
  doctor: any
  selected?: boolean
  isExpanded?: boolean
  showSelector?: boolean
  showBookButton?: boolean
  onDelete?: () => void
  onEdit?: () => void
  onAdd?: () => void
} & TouchableOpacityProps

export function DoctorCard({
  doctor,
  selected,
  isExpanded,
  showSelector = true,
  showBookButton = false,
  onDelete,
  onEdit,
  onAdd,
  onPress,
  ...rest
}: DoctorCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={` overflow-hidden rounded-lg border  bg-white dark:bg-neutral-800 ${selected ? 'border-blue-600' : 'border-neutral-200 dark:border-neutral-700'}`}
      {...rest}
    >
      <DoctorCardInternal
        doctor={doctor}
        selected={!!selected}
        isExpanded={isExpanded}
        showSelector={showSelector}
        showBookButton={showBookButton}
        onDelete={onDelete}
        onEdit={onEdit}
        onAdd={onAdd}
      />
    </TouchableOpacity>
  )
}

function DoctorCardInternal({
  doctor,
  selected,
  isExpanded,
  showSelector = true,
  showBookButton = false,
  onDelete,
  onEdit,
  onAdd,
}: {
  doctor: any
  selected: boolean
  isExpanded?: boolean
  showSelector?: boolean
  showBookButton?: boolean
  onDelete?: () => void
  onEdit?: () => void
  onAdd?: () => void
}) {
  const navigate = useNavigation<HPStackNav>()

  // Extract qualifications from comma-separated string
  const qualifications = doctor.degrees
    ? doctor.degrees
        .split(',')
        .map((deg: string) => deg.trim())
        .filter(Boolean)
    : []

  return (
    <>
      <View className='flex-row items-start gap-3 p-4 dark:bg-neutral-800'>
        <Image
          source={{
            uri: 'https://st4.depositphotos.com/7877830/25337/v/450/depositphotos_253374286-stock-illustration-vector-illustration-male-doctor-avatar.jpg',
          }}
          className='size-16 rounded-xl'
          resizeMode='cover'
        />
        <View className='flex-1'>
          <SemiBold className='text-base text-neutral-900 dark:text-white'>{doctor.name}</SemiBold>
          <Medium className='text-sm text-neutral-600 dark:text-neutral-400'>{doctor.department}</Medium>
        </View>
        {showBookButton ? (
          <TouchableOpacity
            onPress={onAdd}
            className='flex-row items-center gap-2 rounded-xl bg-accent px-5 py-5'
            activeOpacity={0.7}
          >
            <PlusSignIcon color='white' size={20} strokeWidth={2} />
          </TouchableOpacity>
        ) : showSelector ? (
          <View className='w-7 items-center justify-center'>
            <View
              className={` h-6 w-6 items-center justify-center rounded-full border-2 ${
                selected
                  ? 'border-blue-600 bg-blue-600'
                  : 'border-neutral-300 bg-white dark:border-neutral-600 dark:bg-zinc-800'
              }`}
            >
              {selected && <View className='h-2.5 w-2.5 rounded-full bg-white' />}
            </View>
          </View>
        ) : null}
      </View>

      <View className=' border-b border-neutral-200 dark:border-neutral-700' />

      <View className='flex-row items-end gap-3 p-4 dark:bg-neutral-800'>
        <View className='flex-1 gap-1 rounded-lg bg-neutral-100 p-3 dark:bg-neutral-700'>
          <Medium className='text-xs font-semibold text-neutral-600 dark:text-neutral-400'>Qualification</Medium>
          {qualifications.length > 0 ? (
            <View className='flex-row flex-wrap gap-1.5'>
              {qualifications.map((qualification: string, index: number) => (
                <View key={index} className='rounded-md bg-blue-800 px-2 py-1 dark:bg-neutral-800'>
                  <Medium className='text-xs text-white dark:text-neutral-100'>{qualification}</Medium>
                </View>
              ))}
            </View>
          ) : (
            <Medium className='text-sm leading-5 text-neutral-800 dark:text-neutral-100'>N/A</Medium>
          )}
        </View>
        <View className='h-full w-px bg-neutral-200 dark:bg-neutral-600' />
        <View className='gap-1 rounded-lg bg-neutral-100 p-3 dark:bg-neutral-700'>
          <Medium className='text-xs font-semibold text-neutral-600 dark:text-neutral-400'>Experience</Medium>
          <SemiBold className='text-sm text-accent'>
            {doctor.experience ? `${doctor.experience}+ years` : 'N/A'}
          </SemiBold>
        </View>
      </View>

      {isExpanded && (
        <>
          <View className='flex-row gap-4 px-4 pb-4 dark:bg-neutral-800'>
            <TouchableOpacity
              className='flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-accent/10 py-2.5'
              onPress={() => onEdit?.()}
            >
              <TimeScheduleIcon size={22} color={Colors.accent} strokeWidth={2} />
              <SemiBold style={{ color: Colors.accent }} className='text-sm'>
                Edit
              </SemiBold>
            </TouchableOpacity>
            <TouchableOpacity
              className='flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-red-500/10 py-2.5'
              onPress={() => onDelete?.()}
            >
              <Cancel01Icon size={22} color='#ef4444' strokeWidth={2} />
              <SemiBold style={{ color: '#ef4444' }} className='text-sm'>
                Delete
              </SemiBold>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  )
}
