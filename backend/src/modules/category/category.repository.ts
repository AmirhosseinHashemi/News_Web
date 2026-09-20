import type { Category, Prisma } from "../../generated/prisma/client.js";
import type { PrismaClient } from "../../generated/prisma/internal/class.js";
import { execute } from "../../utils/queryExecuter.js";
import {
  CreateCategoryRepositoryData,
  FindAllCategoriesRepositoryParams,
} from "./category.type.js";

const CATEGORY_SEARCH_FIELDS = [
  "name",
  "description",
  "slug",
] as const satisfies readonly (keyof Category)[];

export default class CategoryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll({ skip, take, search }: FindAllCategoriesRepositoryParams) {
    const where: Prisma.CategoryWhereInput = {};

    if (search) {
      where.OR = CATEGORY_SEARCH_FIELDS.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      }));
    }

    return execute(() =>
      this.prisma.$transaction([
        this.prisma.category.findMany({
          where,
          skip,
          take,
        }),
        this.prisma.category.count(),
      ])
    );
  }

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
