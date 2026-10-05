import { PrismaClient } from "../../generated/prisma/internal/class.js";
import { execute } from "../../utils/queryExecuter.js";

export default class MediaRepository {
  constructor(private readonly prisma: PrismaClient) {}

  findById(id: number) {
    return execute(() =>
      this.prisma.media.findUnique({
        where: {
          id,
        },
      })
    );
  }
}
