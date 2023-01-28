import { z } from 'zod'

const ThemeSchema = z.object({
  id: z.bigint(),
  name: z.string(),
  description: z.string().optional().nullable()
})

type ThemeType = z.infer<typeof ThemeSchema>

export class Theme {
  value: ThemeType

  constructor(data: ThemeType) {
    this.value = ThemeSchema.parse(data)
  }
}