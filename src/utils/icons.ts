import { DepartmentIcon } from '@/AdminScreens/Department/types'
import { HugeIconProps } from '@hugeicons/constants'
import Bone02Icon from '@hugeicons/Bone02Icon'
import Brain01Icon from '@hugeicons/Brain01Icon'
import Cardiogram02Icon from '@hugeicons/Cardiogram02Icon'
import DigestionIcon from '@hugeicons/DigestionIcon'
import FemaleSymbolIcon from '@hugeicons/FemaleSymbolIcon'
import Medicine02Icon from '@hugeicons/Medicine02Icon'
import PatientIcon from '@hugeicons/PatientIcon'
import { ComponentType } from 'react'

export const ICONS: Record<DepartmentIcon, ComponentType<HugeIconProps>> = {
  Medicine02Icon,
  Cardiogram02Icon,
  Bone02Icon,
  DigestionIcon,
  Brain01Icon,
  PatientIcon,
  FemaleSymbolIcon,
}

export const iconList = Object.keys(ICONS) as DepartmentIcon[]
export const iconMap = new Map<DepartmentIcon, ComponentType<HugeIconProps>>(
  Object.entries(ICONS) as [DepartmentIcon, ComponentType<HugeIconProps>][],
)

export function getIconByName(name: DepartmentIcon | null): ComponentType<HugeIconProps> {
  if (!name) return Medicine02Icon
  return iconMap.get(name) || Medicine02Icon
}
