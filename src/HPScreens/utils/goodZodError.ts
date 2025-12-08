type Err = { name: 'ZodError' | string; message: string } | null | undefined

export function goodZodErrorMessage(error: Err): string | undefined {
  if (!error) return
  if (error.name !== 'ZodError') return error.message
  const issues = JSON.parse(error.message) as { message: string }[]
  return issues[0]?.message
}

export function goodZodErrorMessages(error: Err): string | undefined {
  if (!error) return
  if (error.name !== 'ZodError') return error.message
  const issues = JSON.parse(error.message) as { message: string }[]
  return issues.map((issue) => issue.message).join(', ')
}
