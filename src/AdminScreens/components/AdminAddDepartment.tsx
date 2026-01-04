import InputWithLabel from '@components/InputWithLabel'
import { PaddingBottom } from '@components/SafePadding'
import Button from '@components/Button'
import HybridHead from '@components/HybridHead'
import { SemiBold } from '@utils/fonts'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { ScrollView, View, TextInput, Alert } from 'react-native'
import { useColorScheme } from 'nativewind'
import colors from 'tailwindcss/colors'

export default function AdminAddDepartment() {
  const navigation = useNavigation()
  const { colorScheme } = useColorScheme()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const isDark = colorScheme === 'dark'

  const handleAddDepartment = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter department name')
      return
    }
    console.log({ name, description })
    navigation.goBack()
  }

  return (
    <View className='flex-1'>
      <HybridHead title='Add Department' showMenu={false} />
      <ScrollView className='flex-1 bg-neutral-100 dark:bg-neutral-900'>
        <View className='gap-6 px-5 py-6'>
          <InputWithLabel
            label='Department Name'
            placeholder='Enter department name'
            value={name}
            onChangeText={setName}
          />

          <View className='gap-2'>
            <SemiBold className='text-xs font-bold uppercase tracking-wide text-neutral-800 dark:text-neutral-200'>
              Description
            </SemiBold>
            <View
              className='rounded-2xl bg-white dark:bg-neutral-900'
              style={{
                borderWidth: 1,
                borderColor: isDark ? '#525252' : '#a3a3a3',
              }}
            >
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder='Enter department description'
                placeholderTextColor={isDark ? colors.neutral[600] : colors.neutral[400]}
                multiline
                numberOfLines={4}
                className='p-4 text-base text-neutral-900 dark:text-neutral-100'
              />
            </View>
          </View>

          <Button title='Add Department' onPress={handleAddDepartment} />
        </View>
        <PaddingBottom />
      </ScrollView>
    </View>
  )
}
