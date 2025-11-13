import { Medium, SemiBold } from '@utils/fonts'
import { Image, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import Gradient from '@components/Gradient'
import { useNavigation } from '@react-navigation/native'
import Colors from '@utils/colors'
import TimeScheduleIcon from '@hugeicons/TimeScheduleIcon'
import PatientIcon from '@hugeicons/PatientIcon'
import { HPStackNav } from '@utils/types'

type DoctorCardProps = {
  doctor: any
  selected?: boolean
  isExpanded?: boolean
} & TouchableOpacityProps

export function DoctorCard({ doctor, selected, ...rest }: DoctorCardProps) {
  if (selected) {
    return (
      <Gradient className='overflow-hidden rounded-2xl p-5'>
        <DoctorCardInternal doctor={doctor} selected={true} isExpanded={rest.isExpanded} onPress={rest.onPress} />
      </Gradient>
    )
  }
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      {...rest}
      className='overflow-hidden rounded-2xl bg-white p-5 dark:bg-neutral-800'
    >
      <DoctorCardInternal doctor={doctor} selected={false} isExpanded={rest.isExpanded} onPress={rest.onPress} />
    </TouchableOpacity>
  )
}

function DoctorCardInternal({
  doctor,
  selected,
  isExpanded,
  onPress,
}: {
  doctor: DoctorCardProps['doctor']
  selected: boolean
  isExpanded?: boolean
  onPress?: TouchableOpacityProps['onPress']
}) {
  const navigate = useNavigation<HPStackNav>()

  return (
    <>
      <View className='flex-row gap-3 pb-3'>
        <View className='flex-1 flex-row items-center gap-3'>
          <Image
            source={{
              uri: 'https://st4.depositphotos.com/7877830/25337/v/450/depositphotos_253374286-stock-illustration-vector-illustration-male-doctor-avatar.jpg',
            }}
            className='size-14 rounded-lg'
            resizeMode='cover'
          />
          <View className='flex-1'>
            <SemiBold className={selected ? 'text-white' : 'text'}>{doctor.name}</SemiBold>
            <Medium className={`text-sm ${selected ? 'text-white' : 'text'} opacity-70`}>{doctor.department}</Medium>
          </View>
        </View>
      </View>
      <View
        className={`flex-row items-end justify-between gap-5 rounded-lg p-3 dark:bg-neutral-900 ${selected ? 'bg-black/15' : 'bg-black/5'}`}
      >
        <View className='flex-1'>
          <Medium className={`text-xs ${selected ? 'text-white' : 'text'} opacity-70`}>Qualification</Medium>
          <Medium className={`text-sm ${selected ? 'text-white' : 'text'}`} numberOfLines={2}>
            {doctor.degrees || 'N/A'}
          </Medium>
        </View>
        <View className='items-end'>
          <Medium className={`text-xs ${selected ? 'text-white' : 'text'} opacity-70`}>Experience</Medium>
          <SemiBold className={`pt-1 text-xs ${selected ? 'text-white' : 'text'}`}>
            {doctor.experience ? `${doctor.experience}+ years` : 'N/A'}
          </SemiBold>
        </View>
      </View>
      {isExpanded && (
        <View className='pt-4'>
          <View className='flex-row gap-4'>
            <TouchableOpacity
              className='flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-accent/10'
              onPress={() => navigate.navigate('HPDoctorScheduleDetails')}
            >
              <TimeScheduleIcon size={20} color={Colors.accent} strokeWidth={2} />
              <SemiBold style={{ color: Colors.accent }} className='text-md'>
                Edit
              </SemiBold>
            </TouchableOpacity>
            <TouchableOpacity
              className='flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-red-500/10 py-2.5'
              onPress={() => {}}
            >
              <PatientIcon size={20} color='#ef4444' strokeWidth={2} />
              <SemiBold style={{ color: '#ef4444' }} className='text-md'>
                Delete
              </SemiBold>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  )
}
