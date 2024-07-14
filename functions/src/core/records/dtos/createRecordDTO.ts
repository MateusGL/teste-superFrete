import {z} from "zod";

export const CreateRecordSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type CreateRecordDTO = z.infer<typeof CreateRecordSchema>;
