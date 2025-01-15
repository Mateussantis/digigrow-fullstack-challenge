import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  ENDPOINT_URL: z.string().url(),
  PORT: z.coerce.number(),
});

export const env = envSchema.parse(process.env);

export type Enviroment = z.infer<typeof envSchema>;
