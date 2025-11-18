import InputWithLabel from '@components/InputWithLabel'
import SelectDropdown from '@components/SelectDropdown'
import { PaddingBottom } from '@components/SafePadding'
import { Medium, SemiBold } from '@utils/fonts'
import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'

import CustomHeader from '@components/CustomHeader'
import Button from '@components/Button'
import Press from '@components/Press'

import Doctor01Icon from '@hugeicons/Doctor01Icon'
import { useNavigation, useRoute } from '@react-navigation/native'
import { adminApi } from '@utils/client'
import { AdminStackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import colors from 'tailwindcss/colors'

const DEPARTMENTS = [
  'General Medicine',
  'General Surgery',
  'Pulmonary Medicine',

  'Cardiology',
  'Cardiothoracic & Vascular Surgery',
  'Neurology',
  'Neurosurgery',
  'Nephrology',
  'Urology',
  'Gastroenterology',
  'Surgical Gastroenterology',
  'Pulmonology',
  'Endocrinology',
  'Rheumatology',
  'Hepatology',
  'Medical Oncology',
  'Surgical Oncology',
  'Radiation Oncology',
  'ENT',
  'Ophthalmology',
  'Dentistry',
  'Oral Medicine',

  'Gynecology',
  'Pediatrics',
  'Pediatric Surgery',
  'Neonatology',
  'Reproductive Medicine',
  'Orthopedics',

  'Physiotherapy',

  'Dermatology',
  'Cosmetology',
  'Nutrition & Dietetics',
  'Psychiatry',
  'Clinical Psychology',
  'Radiology',
  'Pathology',

  'Nuclear Medicine',
  'Hematology',
  'Vascular Surgery',
  'Plastic & Reconstructive Surgery',
  'Immunology',
  'Geriatric Medicine',
  'Interventional Radiology',

  'Anesthesiology',
  'Transfusion Medicine',
] as const

const SPECIALIZATIONS = [
  'General Surgery',
  'Orthopedic Surgery',
  'Cardiac Surgery',
  'Neurosurgery',
  'Pediatric Surgery',
  'Vascular Surgery',
  'Thoracic Surgery',
  'Trauma Surgery',
  'Minimal Invasive Surgery',
  'Laparoscopic Surgery',
] as const

const DEGREES = [
  'MBBS',
  'BDS',
  'BAMS',
  'BHMS',
  'BUMS',
  'BSMS',
  'BNYS',
  'BVSc & AH',
  'MD',
  'MS',
  'DNB',
  'MDS',
  'DM',
  'MCh',
  'DrNB',
] as const

const GENDERS = ['Male', 'Female', 'Other'] as const

type Department = (typeof DEPARTMENTS)[number]
type Specialization = (typeof SPECIALIZATIONS)[number] | null
type Gender = (typeof GENDERS)[number]
type Degree = (typeof DEGREES)[number]

export default function AdminAddDoctor() {
  const navigation = useNavigation<AdminStackNav>()
  const route = useRoute()
  const { colorScheme } = useColorScheme()

  const doctorData = (route.params as any)?.doctor
  const isEditing = !!doctorData

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [gender, setGender] = useState<Gender>('Male')
  const [degrees, setDegrees] = useState<Degree[]>([])
  const [department, setDepartment] = useState<Department>('General Medicine')
  const [specialization, setSpecialization] = useState<Specialization>(null)
  const [experience, setExperience] = useState('')

  useEffect(() => {
    if (isEditing && doctorData) {
      setName(doctorData.name || '')
      setEmail(doctorData.email || '')
      setContact(doctorData.contactNumber || '')
      setGender(doctorData.gender?.[0]?.toUpperCase() + doctorData.gender?.slice(1) || 'Male')
      setDepartment(doctorData.department || 'General Medicine')
      setSpecialization(doctorData.specialization || null)
      setExperience(doctorData.experience?.toString() || '')
      if (doctorData.degrees) {
        const degreeArray = doctorData.degrees.split(',').map((d: string) => d.trim()) as Degree[]
        setDegrees(degreeArray)
      }
    }
  }, [isEditing, doctorData])

  const handleDegreeToggle = (degree: Degree) => {
    if (degrees.includes(degree)) {
      setDegrees(degrees.filter((d) => d !== degree))
    } else {
      setDegrees([...degrees, degree])
    }
  }

  const handleSave = async () => {
    try {
      if (isEditing) {
        await adminApi.doctors[':id'].$put({
          param: { id: doctorData.id },
          json: {
            name,
            specialization: specialization || '',
            contactNumber: contact,
            email,
            gender: gender.toLowerCase() as 'male' | 'female' | 'other',
            degrees: degrees.join(','),
            department,
            experience: parseInt(experience) || 0,
          },
        })
      } else {
        await adminApi.doctors.$post({
          json: {
            name,
            specialization: specialization || '',
            contactNumber: contact,
            email,
            gender: gender.toLowerCase() as 'male' | 'female' | 'other',
            degrees: degrees.join(','),
            department,
            experience: parseInt(experience) || 0,
          },
        })
      }
      navigation.goBack()
    } catch (error) {
      console.error('Failed to save doctor:', error)
    }
  }

  const isDark = colorScheme === 'dark'

  return (
    <View className='bg flex-1'>
      <CustomHeader
        title={isEditing ? 'Edit Doctor' : "Doctor's Information"}
        showBackButton
        onBackPress={() => navigation.goBack()}
        
      />

      <View className='flex-1'>
        <ScrollView className='flex-1' showsVerticalScrollIndicator={false} contentContainerClassName='pb-6'>
          <View className='gap-4 px-5 pt-4'>
            {/* Basic Information Card */}
            <View className='overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-zinc-900'>
              <View className='border-b border-neutral-200 px-4 py-3 dark:border-neutral-700'>
                <View className='flex-row items-center gap-3'>
                  <View className='rounded-md bg-blue-100/50 p-2 dark:bg-blue-900/20'>
                    <Doctor01Icon size={20} color='#3b82f6' strokeWidth={2} />
                  </View>
                  <SemiBold className='text-base text-neutral-900 dark:text-white'>Basic Information</SemiBold>
                </View>
              </View>

              <View className='gap-3 px-4 py-3'>
                <InputWithLabel label='Name' value={name} onChangeText={setName} />
                <InputWithLabel
                  label='Email'
                  value={email}
                  onChangeText={setEmail}
                  keyboardType='email-address'
                  autoCapitalize='none'
                />
                <InputWithLabel
                  label='Contact Number'
                  value={contact}
                  onChangeText={setContact}
                  keyboardType='phone-pad'
                />
                <InputWithLabel
                  label='Experience (years)'
                  value={experience}
                  onChangeText={setExperience}
                  keyboardType='numeric'
                />
                <SelectDropdown
                  label='Gender'
                  value={gender}
                  options={GENDERS.map((g) => ({ label: g, value: g }))}
                  onSelect={(value) => setGender(value as Gender)}
                />
              </View>
            </View>

            {/* Department Card */}
            <View className='overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-zinc-900'>
              <View className='border-b border-neutral-200 px-4 py-3 dark:border-neutral-700'>
                <View className='flex-row items-center gap-3'>
                  <View className='rounded-md bg-blue-100/50 p-2 dark:bg-blue-900/20'>
                    <Doctor01Icon size={20} color='#3b82f6' strokeWidth={2} />
                  </View>
                  <SemiBold className='text-base text-neutral-900 dark:text-white'>Department</SemiBold>
                </View>
              </View>

              <View className='px-4 py-3'>
                <SelectDropdown
                  label='Department'
                  value={department}
                  options={DEPARTMENTS.map((d) => ({ label: d, value: d }))}
                  onSelect={(value) => setDepartment(value as Department)}
                />
              </View>
            </View>

            {/* Specialization Card */}
            <View className='overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-zinc-900'>
              <View className='border-b border-neutral-200 px-4 py-3 dark:border-neutral-700'>
                <View className='flex-row items-center gap-3'>
                  <View className='rounded-md bg-blue-100/50 p-2 dark:bg-blue-900/20'>
                    <Doctor01Icon size={20} color='#3b82f6' strokeWidth={2} />
                  </View>
                  <SemiBold className='text-base text-neutral-900 dark:text-white'>Specialization</SemiBold>
                </View>
              </View>

              <View className='px-4 py-3'>
                <SelectDropdown
                  label='Specialization'
                  value={specialization}
                  options={SPECIALIZATIONS.map((s) => ({ label: s, value: s }))}
                  onSelect={(value) => setSpecialization(value as Specialization)}
                  placeholder='None'
                />
              </View>
            </View>

            {/* Degrees Card */}
            <View className='overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-zinc-900'>
              <View className='border-b border-neutral-200 px-4 py-3 dark:border-neutral-700'>
                <View className='flex-row items-center gap-3'>
                  <View className='rounded-md bg-blue-100/50 p-2 dark:bg-blue-900/20'>
                    <Doctor01Icon size={20} color='#3b82f6' strokeWidth={2} />
                  </View>
                  <SemiBold className='text-base text-neutral-900 dark:text-white'>Degrees</SemiBold>
                </View>
              </View>

              <View className='px-4 py-3'>
                <View className='flex-row flex-wrap gap-2'>
                  {DEGREES.map((degree) => (
                    <Press key={degree} onPress={() => handleDegreeToggle(degree)}>
                      <View
                        className={`rounded-lg border ${
                          degrees.includes(degree)
                            ? 'border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20'
                            : 'border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800'
                        } px-3 py-2`}
                      >
                        <Medium
                          className={`text-sm ${degrees.includes(degree) ? 'text-blue-600 dark:text-blue-400' : 'text-neutral-600 dark:text-neutral-400'}`}
                        >
                          {degree}
                        </Medium>
                      </View>
                    </Press>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View className='gap-3 border-t border-neutral-200 bg-white px-5 py-4 dark:border-neutral-700 dark:bg-neutral-800'>
          <Button title='Save Doctor' onPress={handleSave} />
        </View>
        <PaddingBottom />
      </View>
    </View>
  )
}
