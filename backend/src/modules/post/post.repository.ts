import type { PrismaClient } from "../../generated/prisma/internal/class.js";
import { execute } from "../../utils/queryExecuter.js";
import { CreatePostData } from "./post.type.js";

export default class PostRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreatePostData) {
    return execute(() =>
      this.prisma.post.create({
        data,
      })
    );
  }

  async findBySlug(slug: string) {
    return execute(() =>
      this.prisma.post.findUnique({
        where: {
          slug,
        },
      })
    );
  }
}
