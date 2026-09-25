import type { Post, Prisma } from "../../generated/prisma/client.js";
import type { PrismaClient } from "../../generated/prisma/internal/class.js";
import { execute } from "../../utils/queryExecuter.js";
import { CreatePostData, FindAllPostsData } from "./post.type.js";

const POST_SEARCH_FIELDS = [
  "title",
  "excerpt",
] as const satisfies readonly (keyof Post)[];

export default class PostRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll({ skip, take, search }: FindAllPostsData) {
    const where: Prisma.PostWhereInput = {
      deletedAt: null,
    };

    if (search) {
      where.OR = POST_SEARCH_FIELDS.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      }));
    }

    return execute(() =>
      this.prisma.$transaction([
        this.prisma.post.findMany({
          where,
          skip,
          take,
        }),
        this.prisma.post.count({
          where,
        }),
      ])
    );
  }

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

  async findById(id: number) {
    return execute(() =>
      this.prisma.post.findUnique({
        where: {
          id,
        },
        include: {
          author: {
            omit: {
              passwordHash: true,
            },
          },
          category: true,
          location: true,
          type: true,
          media: {
            orderBy: {
              sortOrder: "asc",
            },
          },
        },
      })
    );
  }
}
