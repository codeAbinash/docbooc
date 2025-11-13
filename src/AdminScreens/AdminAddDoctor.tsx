import InputWithLabel from '@components/InputWithLabel'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { Medium, SemiBold } from '@utils/fonts'
import { useState } from 'react'
import { ScrollView, View } from 'react-native'

import { Header } from '@/UserScreens/BookAppointment/components/Header'
import Button from '@components/Button'
import Press from '@components/Press'
import Tick02Icon from '@hugeicons/Tick02Icon'
import { useNavigation } from '@react-navigation/native'
import { adminApi } from '@utils/client'
import { HPStackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import colors from 'tailwindcss/colors'

const DEPARTMENTS = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'General Medicine',
  'Dermatology',
  'Oncology',
  'ENT',
  'Ophthalmology',
  'Dentistry',
] as const

const DEGREES = ['MBBS', 'MD', 'MS', 'DNB', 'DM', 'MCh', 'BDS', 'MDS', 'BAMS', 'BHMS'] as const
const GENDERS = ['Male', 'Female', 'Other'] as const

type Department = (typeof DEPARTMENTS)[number]
type Gender = (typeof GENDERS)[number]
type Degree = (typeof DEGREES)[number]

export default function AdminAddDoctor() {
  const navigation = useNavigation<HPStackNav>()
  const { colorScheme } = useColorScheme()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [gender, setGender] = useState<Gender>('Male')
  const [degrees, setDegrees] = useState<Degree[]>([])
  const [department, setDepartment] = useState<Department>('General Medicine')
  const [experience, setExperience] = useState('')

  const handleDegreeToggle = (degree: Degree) => {
    if (degrees.includes(degree)) {
      setDegrees(degrees.filter((d) => d !== degree))
    } else {
      setDegrees([...degrees, degree])
    }
  }

  const handleSave = async () => {
    try {
      await adminApi.doctors.$post({
        json: {
          name,
          specialization: department,
          contactNumber: contact,
          email,
          gender: gender.toLowerCase() as 'male' | 'female' | 'other',
          degrees: degrees.join(','),
          department,
          experience: parseInt(experience) || 0,
        },
      })
      navigation.goBack()
    } catch (error) {
      console.error('Failed to add doctor:', error)
    }
  }

  const isDark = colorScheme === 'dark'

  return (
    <View className='bg flex-1'>
      <PaddingTop />
      <Header
        title='Add Doctor'
        RightComponent={
          <Press className='size-12 items-center justify-center rounded-xl bg-green-500/15' onPress={handleSave}>
            <Tick02Icon size={25} strokeWidth={2} color={colors.green[600]} />
          </Press>
        }
      />

      <View className='flex-1'>
        <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
          <View className='flex-1 gap-4 p-5'>
            {/* Basic Info Card */}
            <View className='overflow-hidden rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800'>
              <View className='border-b border-neutral-100 pb-4 dark:border-neutral-700'>
                <View className='flex-row items-center gap-3'>
                  <View className='rounded-lg bg-blue-100/50 p-2.5 dark:bg-blue-900/20'>
                    <SemiBold className='text-lg text-blue-600'>Basic Info</SemiBold>
                  </View>
                </View>
              </View>

              <View className='gap-4'>
                <InputWithLabel label='Name' placeholder="Enter doctor's name" value={name} onChangeText={setName} />
                <InputWithLabel
                  label='Email'
                  placeholder='Enter email address'
                  value={email}
                  onChangeText={setEmail}
                  keyboardType='email-address'
                  autoCapitalize='none'
                />
                <InputWithLabel
                  label='Contact Number'
                  placeholder='Enter contact number'
                  value={contact}
                  onChangeText={setContact}
                  keyboardType='phone-pad'
                />
                <InputWithLabel
                  label='Experience (years)'
                  placeholder='Enter years of experience'
                  value={experience}
                  onChangeText={setExperience}
                  keyboardType='numeric'
                />
              </View>
            </View>

            {/* Gender Card */}
            <View className='overflow-hidden rounded-2xl bg-white p-5 dark:bg-neutral-800'>
              <View className='border-b border-neutral-100 pb-4 dark:border-neutral-700'>
                <View className='flex-row items-center gap-3'>
                  <View className='rounded-lg bg-blue-100/50 p-2.5 dark:bg-blue-900/20'>
                    <SemiBold className='text-lg text-blue-600'>Gender</SemiBold>
                  </View>
                </View>
              </View>

              <View className='flex-row gap-3'>
                {GENDERS.map((g) => (
                  <Press key={g} onPress={() => setGender(g)} className='flex-1'>
                    <View
                      className={`items-center rounded-xl border ${
                        gender === g
                          ? 'border-accent bg-accent/10'
                          : 'border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800'
                      } px-4 py-3`}
                    >
                      <SemiBold
                        className={`text-base ${gender === g ? 'text-accent' : 'text-neutral-600 dark:text-neutral-400'}`}
                      >
                        {g}
                      </SemiBold>
                    </View>
                  </Press>
                ))}
              </View>
            </View>

            {/* Department Card */}
            <View className='overflow-hidden rounded-2xl bg-white p-5 dark:bg-neutral-800'>
              <View className='border-b border-neutral-100 pb-4 dark:border-neutral-700'>
                <View className='flex-row items-center gap-3'>
                  <View className='rounded-lg bg-blue-100/50 p-2.5 dark:bg-blue-900/20'>
                    <SemiBold className='text-lg text-blue-600'>Department</SemiBold>
                  </View>
                </View>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8, paddingBottom: 4 }}
              >
                {DEPARTMENTS.map((dept) => (
                  <Press key={dept} onPress={() => setDepartment(dept)}>
                    <View
                      className={`rounded-xl border ${
                        department === dept
                          ? 'border-accent bg-accent/10'
                          : 'border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800'
                      } px-6 py-3`}
                    >
                      <SemiBold
                        className={`${department === dept ? 'text-accent' : 'text-neutral-600 dark:text-neutral-400'}`}
                      >
                        {dept}
                      </SemiBold>
                    </View>
                  </Press>
                ))}
              </ScrollView>
            </View>

            {/* Degrees Card */}
            <View className='overflow-hidden rounded-2xl bg-white p-5 dark:bg-neutral-800'>
              <View className='border-b border-neutral-100 pb-4 dark:border-neutral-700'>
                <View className='flex-row items-center gap-3'>
                  <View className='rounded-lg bg-blue-100/50 p-2.5 dark:bg-blue-900/20'>
                    <SemiBold className='text-lg text-blue-600'>Degrees</SemiBold>
                  </View>
                </View>
              </View>

              <View className='flex-row flex-wrap gap-2'>
                {DEGREES.map((degree) => (
                  <Press key={degree} onPress={() => handleDegreeToggle(degree)}>
                    <View
                      className={`rounded-xl border ${
                        degrees.includes(degree)
                          ? 'border-accent bg-accent/10'
                          : 'border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800'
                      } px-4 py-2.5`}
                    >
                      <Medium className={`text-sm ${degrees.includes(degree) ? 'text-blue-600' : 'text'}`}>
                        {degree}
                      </Medium>
                    </View>
                  </Press>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        <View className='px-6 pb-2 pt-2'>
          <Button title='Save Doctor' onPress={handleSave} />
        </View>
        <PaddingBottom />
      </View>
    </View>
  )
}
