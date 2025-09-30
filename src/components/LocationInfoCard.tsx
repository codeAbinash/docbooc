import Location06Icon from '@assets/icons/hugeicons/Location06Icon'
import InfoCard from '@components/InfoCard'
import Colors from '@utils/colors'
import { Bold, Medium } from '@utils/fonts'
import { Image, View } from 'react-native'

type Location = {
  name: string
  address: string
  distance?: string
  image: string
}

type LocationInfoCardProps = {
  location: Location
}

export default function LocationInfoCard({ location }: LocationInfoCardProps) {
  const icon = (
    <View className='mr-3 rounded-full bg-red-50 p-2 dark:bg-red-900/20'>
      <Location06Icon size={24} color='#ef4444' />
    </View>
  )

  return (
    <InfoCard title='Location Details' icon={icon}>
      <View className='flex-row'>
        <Image source={{ uri: location.image }} className='mr-4 size-20 rounded-2xl' resizeMode='cover' />
        <View className='flex-1'>
          <Bold className='text text-base'>{location.name}</Bold>
          <Medium className='text mt-1 text-sm opacity-70' numberOfLines={2}>
            {location.address}
          </Medium>
          {location.distance && (
            <View className='mt-2 flex-row items-center'>
              <Location06Icon size={14} color={Colors.accent} />
              <Medium className='ml-1 text-xs text-accent'>{location.distance} away</Medium>
            </View>
          )}
        </View>
      </View>
    </InfoCard>
  )
}
