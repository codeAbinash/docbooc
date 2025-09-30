import { View } from 'react-native'
import { Medium, SemiBold } from '@utils/fonts'

type InfoRowProps = {
  label: string
  value: string
  className?: string
}

export default function InfoRow({ label, value, className = '' }: InfoRowProps) {
  return (
    <View className={`flex-row items-center justify-between ${className}`}>
      <Medium className='text-sm text-neutral-500 dark:text-neutral-400'>{label}</Medium>
      <SemiBold className='text text-base'>{value}</SemiBold>
    </View>
  )
}
