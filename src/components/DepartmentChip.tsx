import { specialties } from '@/constants'
import Colors from '@utils/colors'
import { Medium } from '@utils/fonts'
import { TouchableOpacity, View } from 'react-native'

export function DepartmentChip({
  specialty,
  selected,
  setSelected,
  onLayout,
}: {
  specialty: (typeof specialties)[0] | { id: number; name: string; icon: any }
  selected: number | null
  setSelected: (id: number) => void
  onLayout: (specialtyId: number, width: number) => void
}) {
  return (
    <TouchableOpacity
      key={specialty.id}
      className={`flex flex-row items-center rounded-full px-2 py-2 pr-4 ${selected === specialty.id ? 'bg-accent' : 'bg-white dark:bg-neutral-800'}`}
      onPress={() => setSelected(specialty.id)}
      activeOpacity={0.8}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout
        onLayout(specialty.id, width)
      }}
    >
      <View className={`rounded-full ${selected === specialty.id ? 'bg-white' : 'bg-accent'} p-1.5`}>
        <specialty.icon size={20} strokeWidth={1.7} color={selected === specialty.id ? Colors.accent : 'white'} />
      </View>
      <Medium className={`ml-2 text-sm ${selected === specialty.id ? 'text-white' : 'text'}`}>{specialty.name}</Medium>
    </TouchableOpacity>
  )
}
