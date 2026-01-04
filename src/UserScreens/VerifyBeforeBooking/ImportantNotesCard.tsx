import Calendar01Icon from '@hugeicons/Calendar01Icon'
import { Medium, SemiBold } from '@utils/fonts'
import { View } from 'react-native'

const notes = [
  'Arrive 15 minutes before appointment',
  'Confirmed instantly upon doorstep verification',
  'Queue numbers may change',
  '24/7 Call support available',
]

export const ImportantNotesCard = () => {
  return (
    <View className='overflow-hidden rounded-3xl border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-zinc-900'>
      <View className='border-b border-neutral-300 px-4 py-3 dark:border-neutral-700'>
        <View className='flex-row items-center gap-3'>
          <View className='rounded-md bg-blue-100/50 p-2 dark:bg-blue-900/20'>
            <Calendar01Icon size={20} color='#3b82f6' strokeWidth={2} />
          </View>
          <SemiBold className='text-lg text-neutral-900 dark:text-white'>Important notes</SemiBold>
        </View>
      </View>

      <View className='px-4 py-3'>
        <View className='gap-2'>
          {notes.map((note, index) => (
            <View key={index} className='flex-row items-start gap-2'>
              <Medium className='text-base text-neutral-600 dark:text-neutral-400'>•</Medium>
              <Medium className='flex-1 text-base text-neutral-700 dark:text-neutral-300'>{note}</Medium>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}
