import { PrismaClient } from "../../generated/prisma/internal/class.js";
import { execute } from "../../utils/queryExecuter.js";
import { CreateCategoryRepositoryData } from "./category.type.js";

export default class CategoryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByName(name: string) {
    return execute(() =>
      this.prisma.category.findUnique({
        where: {
          name,
        },
      })
    );
  }

  async findBySlug(slug: string) {
    return execute(() =>
      this.prisma.category.findUnique({
        where: {
          slug,
        },
      })
    );
  }

  async create({ name, slug, description }: CreateCategoryRepositoryData) {
    return execute(() =>
      this.prisma.category.create({
        data: {
          name,
          slug,
          description,
        },
      })
    );
  }
}
