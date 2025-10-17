import Press from '@components/Press'
import { SemiBold } from '@utils/fonts'
import { useColorScheme } from 'nativewind'
import { View } from 'react-native'


export type TabsProps = {
  tabs: string[]
  activeTab: number
  activeBackground?: string
  inactiveBackground?: string
  activeTextColor?: string
  inactiveTextColor?: string
  onTabChange: (index: number) => void
}



export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  const { colorScheme } = useColorScheme()
  const dark = colorScheme === 'dark'
  return (
    <View className='flex-row rounded-xl bg-neutral-200 p-1 dark:bg-neutral-800'>
      {tabs.map((tab, index) => (
        <Press
          key={index}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            borderRadius: 8,
            backgroundColor: activeTab === index ? (dark ? '#ffffff55' : 'white') : 'transparent',
          }}
          onPress={() => onTabChange(index)}
        >
          <SemiBold
            className={`text-sm ${activeTab === index ? 'text-black dark:text-white' : 'text-neutral-500 dark:text-neutral-300'}`}
          >
            {tab}
          </SemiBold>
        </Press>
      ))}
    </View>
  )
}
