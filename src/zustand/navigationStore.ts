import type { AdminStackNav, HPStackNav, StackNav } from '@utils/types'
import { create } from 'zustand'

type NavigationS = {
  navigation: StackNav | HPStackNav | AdminStackNav | null
  setNavigation: (navigation: StackNav | HPStackNav | AdminStackNav | null) => void
}

export const navigationStore = create<NavigationS>((set) => ({
  navigation: null,
  setNavigation: (navigation) => set({ navigation }),
}))
