export const formatDateParts = (dateString: string) => {
  if (!dateString) return { day: 'N/A', date: 'N/A' }
  try {
    const date = new Date(dateString)
    const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' })
    const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    return { day: dayFormatter.format(date), date: dateFormatter.format(date) }
  } catch {
    return { day: 'N/A', date: dateString }
  }
}

export const formatLocationAddress = (
  houseNumber?: string | null,
  roadName?: string | null,
  city?: string | null,
  state?: string | null,
  pin?: string | null,
) => {
  return `${houseNumber || ''} ${roadName || ''}, ${city || ''}, ${state || ''}, ${pin || ''}`.trim() || 'N/A'
}

export const formatTimeSlot = (startTime?: string) => {
  if (!startTime) return 'N/A'
  return startTime.slice(0, 5)
}
