import InputWithLabel from '@components/InputWithLabel'
import { PaddingBottom } from '@components/SafePadding'
import SelectDropdown from '@components/SelectDropdown'
import { Medium, SemiBold } from '@utils/fonts'
import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'

import Button from '@components/Button'
import HybridHead from '@components/HybridHead'
import Press from '@components/Press'

import popupStore from '@/zustand/popupStore'
import Doctor01Icon from '@hugeicons/Doctor01Icon'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useMutation, useQuery } from '@tanstack/react-query'
import { adminApi, api, client } from '@utils/client'
import { AdminStackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { z } from 'zod'

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

type Department = string
type Specialization = (typeof SPECIALIZATIONS)[number] | null
type Gender = (typeof GENDERS)[number]
type Degree = (typeof DEGREES)[number]

const doctorSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  email: z.string().email('Invalid email format').optional().or(z.literal('')),
  contact: z.string().optional(),
  specialization: z.string().optional().or(z.literal('')).nullable(),
  gender: z.enum(['male', 'female', 'other']),
  degrees: z
    .string()
    .trim()
    .refine((val) => val.length > 0, { message: 'At least one degree is required' }),
  department: z.string().min(1, 'Department is required'),
  experience: z.number().min(0, 'Experience must be positive').optional(),
})

export default function AdminAddDoctor() {
  const navigation = useNavigation<AdminStackNav>()
  const route = useRoute()
  const { colorScheme } = useColorScheme()
  const alert = popupStore((state) => state.alert)

  const doctorData = (route.params as any)?.doctor
  const isEditing = !!doctorData

  const { data: departmentsResponse } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => await (await api.public.departments.$get(client)).json(),
  })

  const departments = departmentsResponse?.data || []

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [gender, setGender] = useState<Gender>('Male')
  const [degrees, setDegrees] = useState<Degree[]>([])
  const [department, setDepartment] = useState<Department>('')
  const [specialization, setSpecialization] = useState<Specialization>(null)
  const [experience, setExperience] = useState('')

  const createDoctorMutation = useMutation({
    mutationFn: async (data: {
      name: string
      specialization?: string
      contactNumber?: string
      email: string
      gender: 'male' | 'female' | 'other'
      degrees: string
      department: string
      experience: number
    }) => {
      return await (await adminApi.doctors.$post({ json: data })).json()
    },
    onSuccess: (data) => {
      console.log(data)
      if (!data || !data.success) return alert('Error', 'Failed to save doctor. Please try again.')
      navigation.goBack()
    },
    onError: (error) => {
      console.error('Failed to create doctor:', error)
      alert('Error', 'Failed to save doctor. Please try again.')
    },
  })

  const updateDoctorMutation = useMutation({
    mutationFn: async (data: {
      id: string
      name: string
      specialization?: string
      contactNumber?: string
      email: string
      gender: 'male' | 'female' | 'other'
      degrees: string
      department: string
      experience: number
    }) => {
      const { id, ...json } = data
      return await (await adminApi.doctors[':id'].$put({ param: { id }, json })).json()
    },
    onSuccess: (data) => {
      if (!data || !data.success) return alert('Error', 'Failed to update doctor. Please try again.')
      navigation.goBack()
    },
    onError: (error) => {
      console.error('Failed to update doctor:', error)
      alert('Error', 'Failed to update doctor. Please try again.')
    },
  })

  useEffect(() => {
    if (isEditing && doctorData) {
      setName(doctorData.name || '')
      setEmail(doctorData.email || '')
      setContact(doctorData.contactNumber || '')
      setGender(doctorData.gender?.[0]?.toUpperCase() + doctorData.gender?.slice(1) || 'Male')
      setDepartment(doctorData.department || '')
      setSpecialization(doctorData.specialization || null)
      setExperience(doctorData.experience?.toString() || '')
      if (doctorData.degrees) {
        const degreeArray = doctorData.degrees.split(',').map((d: string) => d.trim()) as Degree[]
        setDegrees(degreeArray)
      }
    } else if (!isEditing && departments.length > 0 && !department) {
      setDepartment(departments[0]?.name || '')
    }
  }, [isEditing, doctorData, departments, department])

  const handleDegreeToggle = (degree: Degree) => {
    if (degrees.includes(degree)) {
      setDegrees(degrees.filter((d) => d !== degree))
    } else {
      setDegrees([...degrees, degree])
    }
  }

  const handleSave = async () => {
    const data = {
      name: name.trim(),
      email: email.trim(),
      contact: contact.trim(),
      specialization: specialization || undefined,
      gender: gender.toLowerCase() as 'male' | 'female' | 'other',
      degrees: degrees.join(','),
      department,
      experience: parseInt(experience) || 0,
    }

    const validation = doctorSchema.safeParse(data)

    if (!validation.success) {
      const firstError = validation.error.issues[0]
      alert('Validation Error', firstError?.message || 'Invalid data')
      return
    }

    alert('Confirm', `Are you sure you want to ${isEditing ? 'update' : 'add'} this doctor?`, [
      { text: 'Cancel' },
      {
        text: isEditing ? 'Update' : 'Add',
        onPress: () => {
          if (isEditing) {
            updateDoctorMutation.mutate({
              id: doctorData.id,
              name: data.name,
              ...(data.specialization && { specialization: data.specialization }),
              ...(data.contact && { contactNumber: data.contact }),
              email: data.email,
              gender: data.gender,
              degrees: data.degrees,
              department: data.department,
              experience: data.experience,
            })
          } else {
            createDoctorMutation.mutate({
              name: data.name,
              ...(data.specialization && { specialization: data.specialization }),
              ...(data.contact && { contactNumber: data.contact }),
              email: data.email,
              gender: data.gender,
              degrees: data.degrees,
              department: data.department,
              experience: data.experience,
            })
          }
        },
      },
    ])
  }

  const isLoading = createDoctorMutation.isPending || updateDoctorMutation.isPending

  const isDark = colorScheme === 'dark'

  return (
    <View className='flex-1 bg-white'>
      <HybridHead
        title={isEditing ? 'Edit Doctor' : 'Add Doctor'}
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
                  options={departments.map((d) => ({ label: d.name, value: d.name }))}
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
          <Button title='Save Doctor' onPress={handleSave} disabled={isLoading} />
        </View>
        <PaddingBottom />
      </View>
    </View>
  )
}
