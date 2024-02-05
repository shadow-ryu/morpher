import { string, z } from 'zod'

export const GuildValidation = z.object({
    name: z
      .string()
      .min(3, {
        message: 'Title must be at least 3 characters long',
      })
      .max(128, {
        message: 'Title must be less than 128 characters long',
      }),
    guildHandle: z
      .string()
      .refine((handle) => !/\s/.test(handle), {
        message: 'Guild handle must not contain spaces',
      }),
    ownerId: z.string(),
    info: z.any(),
    guildLogo: z.string(),
    tags: z.string().nullable(), // Allow tags to be null
  });
  
export type GuildCreationRequest = z.infer<typeof GuildValidation>