import popupStore from '@/zustand/popupStore'
import { H } from '@utils/dimensions'
import { Medium, SemiBold, Regular } from '@utils/fonts'
import React from 'react'
import { Modal, ScrollView, TouchableOpacity, View } from 'react-native'

type PopupT = {
  index: number
  text?: string
  title?: string
  buttons: {
    text: string
    onPress?: () => void
  }[]
  noClose?: boolean
}

const Popup = React.memo<PopupT>(({ text, title, buttons, index, noClose }) => {
  const removePopup = popupStore((store) => store.removePopup)

  return (
    <View>
      <Modal
        animationType='fade'
        transparent={true}
        visible={true}
        hardwareAccelerated
        statusBarTranslucent
        onRequestClose={() => {
          if (!noClose) removePopup(index)
        }}
      >
        <View className='flex-1 items-center justify-center bg-black/40 dark:bg-black/50'>
          <View className='w-[85%] overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800'>
            <View className='px-5 pb-4 pt-5'>
              <SemiBold className='text-base text-black dark:text-white'>{title}</SemiBold>
              <ScrollView style={{ maxHeight: H * 0.45, marginTop: 10 }} showsVerticalScrollIndicator={false}>
                <Regular className='text-sm text-gray-600 dark:text-gray-400'>{text}</Regular>
              </ScrollView>
            </View>

            <View className='flex-row items-center justify-between gap-2 border-t border-neutral-200 px-4 py-4 dark:border-neutral-700'>
              {buttons && buttons.length > 0 && buttons[0] && (
                <>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      buttons[0]?.onPress?.()
                      removePopup(index)
                    }}
                    className='rounded-lg bg-red-50 px-5 py-3 dark:bg-red-950/30'
                  >
                    <Medium className='text-sm text-red-600 dark:text-red-500'>{buttons[0].text}</Medium>
                  </TouchableOpacity>
                  <View className='flex-1' />
                  <View className='flex-row gap-2'>
                    {buttons.slice(1).map((button, i) => (
                      <TouchableOpacity
                        key={i}
                        activeOpacity={0.7}
                        onPress={() => {
                          button.onPress?.()
                          removePopup(index)
                        }}
                        className={`rounded-lg px-5 py-3 ${
                          i === 0 ? 'bg-gray-100 dark:bg-gray-700' : 'bg-blue-600 dark:bg-blue-700'
                        }`}
                      >
                        <Medium className={`text-sm ${i === 0 ? 'text-gray-700 dark:text-gray-300' : 'text-white'}`}>
                          {button.text}
                        </Medium>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
})

export default Popup

export const Popups = React.memo((props) => {
  const popups = popupStore((store) => store.popups)
  return (
    <>
      {popups.map((popup, index) => (
        <Popup
          key={index}
          index={index}
          text={popup.text}
          title={popup.title}
          noClose={popup.noClose}
          buttons={popup.buttons || [{ text: 'OK' }]}
        />
      ))}
    </>
  )
})
