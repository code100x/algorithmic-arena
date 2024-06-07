import { z } from "zod";

export const CredentialsSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8),
});
