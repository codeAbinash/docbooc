import { DepartmentIcon } from '@/AdminScreens/Department/types'
import { HugeIconProps } from '@hugeicons/constants'
import Bone02Icon from '@hugeicons/Bone02Icon'
import Brain01Icon from '@hugeicons/Brain01Icon'
import Cardiogram02Icon from '@hugeicons/Cardiogram02Icon'
import DigestionIcon from '@hugeicons/DigestionIcon'
import FemaleSymbolIcon from '@hugeicons/FemaleSymbolIcon'
import Medicine02Icon from '@hugeicons/Medicine02Icon'
import PatientIcon from '@hugeicons/PatientIcon'
import EyeIcon from '@components/EyeIcon'
import { ComponentType } from 'react'

export type IconType = DepartmentIcon | 'EyeIcon'

export const ICONS: Record<IconType, ComponentType<HugeIconProps>> = {
  Medicine02Icon,
  Cardiogram02Icon,
  Bone02Icon,
  DigestionIcon,
  Brain01Icon,
  PatientIcon,
  FemaleSymbolIcon,
  EyeIcon: EyeIcon as ComponentType<HugeIconProps>,
}

export const iconList = Object.keys(ICONS) as IconType[]
export const iconMap = new Map<IconType, ComponentType<HugeIconProps>>(
  Object.entries(ICONS) as [IconType, ComponentType<HugeIconProps>][],
)

export function getIconByName(name: IconType | null): ComponentType<HugeIconProps> {
  if (!name) return Medicine02Icon
  return iconMap.get(name as IconType) || Medicine02Icon
}
