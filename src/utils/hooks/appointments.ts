import { useQuery } from '@tanstack/react-query'
import { client } from '@utils/client'

function useAppointmentsDate(doctorId: string, date: string) {
  return useQuery({
    queryKey: ['appointments', doctorId, date],
    queryFn: async () => {
      const response = await (
        await client.api.v1.hp.bookings.patients.$get({
          query: {
            date,
            doctorId,
          },
        })
      ).json()
      return response.data || []
    },
  })
}

export default useAppointmentsDate
