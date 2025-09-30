import { ReactNode } from 'react'
import { View } from 'react-native'
import { SemiBold } from '@utils/fonts'

type InfoCardProps = {
  title: string
  icon: ReactNode
  children: ReactNode
  className?: string
}

export default function InfoCard({ title, icon, children, className = '' }: InfoCardProps) {
  return (
    <View className={`overflow-hidden rounded-3xl bg-white p-6 shadow-sm dark:bg-zinc-900 ${className}`}>
      <View className='mb-4 flex-row items-center'>
        {icon}
        <SemiBold className='text text-lg'>{title}</SemiBold>
      </View>
      {children}
    </View>
  )
}
