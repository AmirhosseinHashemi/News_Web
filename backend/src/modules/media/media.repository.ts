import { PrismaClient } from "../../generated/prisma/internal/class.js";
import { execute } from "../../utils/queryExecuter.js";
import { CreateMediaData } from "./media.schema.js";

export default class MediaRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateMediaData) {
    return execute(() =>
      this.prisma.media.create({
        data,
      })
    );
  }

  async findById(id: number) {
    return execute(() =>
      this.prisma.media.findUnique({
        where: {
          id,
        },
      })
    );
  }
}
