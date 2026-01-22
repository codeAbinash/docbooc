import { api } from '@utils/client'
import { InferApiResponse } from '@utils/types'

export type Department = NonNullable<InferApiResponse<typeof api.public.departments.$get>['data']>[number]
export type DepartmentIcon = NonNullable<Department['icon']>
