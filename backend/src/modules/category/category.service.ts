import ConflictError from "../../errors/ConflictError.js";
import NotFoundError from "../../errors/NotFoundError.js";
import ValidationError from "../../errors/ValidationError.js";
import {
  getPagination,
  getPaginationMeta,
} from "../../utils/paginationHelpers.js";
import { generateSlug } from "../../utils/slug.js";
import CategoryRepository from "./category.repository.js";
import type {
  CreateCategoryPayload,
  FindAllCategoriesServiceParams,
  UpdateCategoryData,
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

  async findById(id: number) {
    const category = await this.categoryRepository.findById(id);

    if (!category) throw new NotFoundError("Category not found");

    return category;
  }

  async update(id: number, payload: UpdateCategoryData) {
    if (Object.entries(payload).length === 0)
      throw new ValidationError({ message: "There is nothing to update" });

    const category = await this.categoryRepository.findById(id);

    if (!category) throw new NotFoundError("Category not found");

    let slug: string | undefined;

    if (payload.name && payload.name !== category.name) {
      const existingName = await this.categoryRepository.findByName(
        payload.name
      );

      if (existingName && existingName.id !== id) {
        throw new ConflictError({ message: "Category name already exists" });
      }

      slug = generateSlug(payload.name);
      const existingSlug = await this.categoryRepository.findBySlug(slug);
      if (existingSlug && existingSlug.id !== id) {
        throw new ConflictError({ message: "Category slug already exists" });
      }
    }

    return this.categoryRepository.update(id, {
      ...payload,
      ...(slug && { slug }),
    });
  }
}
