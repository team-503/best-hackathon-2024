import { EventStatusEnum } from "@/__generated__/graphql";
import { z } from "zod";

export const formSchema = z.object({
    status: z.nativeEnum(EventStatusEnum),
    direction: z.string().min(2, {
      message: "Мінімально 4 символи",
    }),
    date: z.date(),
    latitude:z.string().min(2),
    longitude:z.string().min(2),
})