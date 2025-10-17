import Gradient from '@components/Gradient'
import { gradientColors } from '@utils/colors'
import { Bold, Medium } from '@utils/fonts'
import { useColorScheme } from 'nativewind'
import { TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import colors from 'tailwindcss/colors'

const dates = [
  { date: '21', day: 'Mon', disabled: true },
  { date: '22', day: 'Tue', selected: true },
  { date: '23', day: 'Wed' },
  { date: '24', day: 'Thu' },
  { date: '25', day: 'Fri' },
  { date: '26', day: 'Sat' },
  { date: '27', day: 'Sun' },
]

export function DateCardContainer() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName='px-5 gap-2.5'>
      {dates.map((date) => (
        <DateCard key={date.date} {...date} />
      ))}
    </ScrollView>
  )
}

function DateCard({
  date,
  day,
  selected,
  disabled,
}: {
  date: string
  day: string
  selected?: boolean
  disabled?: boolean
}) {
  const { colorScheme } = useColorScheme()

  return (
    <TouchableOpacity disabled={disabled} style={{ opacity: disabled ? 0.6 : 1 }}>
      <Gradient
        className={`w-16 items-center justify-center gap-0.5 overflow-hidden rounded-2xl px-0 py-4`}
        colors={
          selected ? gradientColors : colorScheme === 'dark' ? [colors.zinc[900], colors.zinc[900]] : ['#fff', '#fff']
        }
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <Medium className={`${selected ? 'text-white' : 'gray'} text-sm`}>{day}</Medium>
        <Bold className={`${selected ? 'text-white' : 'text'} text-lg`}>{date}</Bold>
      </Gradient>
    </TouchableOpacity>
  )
}
