import ConflictError from "../../errors/ConflictError.js";
import {
  getPagination,
  getPaginationMeta,
} from "../../utils/paginationHelpers.js";
import { generateSlug } from "../../utils/slug.js";
import CategoryRepository from "./category.repository.js";
import type {
  CreateCategoryPayload,
  FindAllCategoriesServiceParams,
} from "./category.type.js";

export default class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create({ name, description }: CreateCategoryPayload) {
    const existCategory = await this.categoryRepository.findByName(name);
    if (existCategory)
      throw new ConflictError({ message: "Category name already exist" });

    const slug = generateSlug(name);
    const existingSlug = await this.categoryRepository.findBySlug(slug);
    if (existingSlug)
      throw new ConflictError({ message: "Category slug already exist" });

    return this.categoryRepository.create({ name, slug, description });
  }

  async findAll({ page, limit, search }: FindAllCategoriesServiceParams) {
    const { skip, take } = getPagination(page, limit);
    const [categories, totalItems] = await this.categoryRepository.findAll({
      skip,
      take,
      search,
    });

    const paginationMeta = getPaginationMeta({ page, limit, totalItems });

    return { categories, paginationMeta };
  }
}
