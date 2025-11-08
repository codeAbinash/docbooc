import type { HPStackNav, StackNav } from '@utils/types'
import { create } from 'zustand'

type NavigationS = {
  navigation: StackNav | HPStackNav | null
  setNavigation: (navigation: StackNav | HPStackNav | null) => void
}

export const navigationStore = create<NavigationS>((set) => ({
  navigation: null,
  setNavigation: (navigation) => set({ navigation }),
}))
