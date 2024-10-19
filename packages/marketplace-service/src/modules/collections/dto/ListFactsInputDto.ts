import {LimitOffsetDto} from "../../../common/dto/LimitOffsetDto";
import {z} from "zod";

export const ListFactsInputDto = z.object({
  ...LimitOffsetDto.shape,
  collectionId: z.string(),
});

export type ListFactsInput = z.infer<typeof ListFactsInputDto>;
