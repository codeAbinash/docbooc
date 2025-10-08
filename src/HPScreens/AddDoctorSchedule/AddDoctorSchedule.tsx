import Press from '@components/Press'
import { PaddingTop } from '@components/SafePadding'
import { Tabs } from '@components/Tabs'
import Tick02Icon from '@hugeicons/Tick02Icon'
import { Header } from '@screens/BookAppointment/components/Header'
import { useState } from 'react'
import { View } from 'react-native'
import colors from 'tailwindcss/colors'
import Daily from './components/Daily'
import Monthly from './components/Monthly'
import Weekly from './components/Weekly'

const tabLabels = ['Daily', 'Weekly', 'Monthly']
const ContentMap = [Daily, Weekly, Monthly] as const

const AddDoctorSchedule = () => {
  const [activeTab, setActiveTab] = useState(1)

  return (
    <View className='bg flex-1'>
      <PaddingTop />
      <Header
        title='Schedule Visits'
        RightComponent={
          <Press className='size-12 items-center justify-center rounded-xl bg-green-500/15'>
            <Tick02Icon size={25} strokeWidth={2} color={colors.green[600]} />
          </Press>
        }
      />
      <View className='flex-1'>
        <View className='px-5'>
          <Tabs tabs={tabLabels} activeTab={activeTab} onTabChange={setActiveTab} />
        </View>
        <View className='mt-3 flex-1'>
          {ContentMap.map((Component, index) => activeTab === index && <Component key={index} />)}
        </View>
      </View>
    </View>
  )
}

export default AddDoctorSchedule
