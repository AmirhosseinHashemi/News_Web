import { prisma } from "../../lib/prisma.js";
import CategoryController from "./category.controller.js";
import CategoryRepository from "./category.repository.js";
import CategoryService from "./category.service.js";

const categoryRepository = new CategoryRepository(prisma);
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

export { categoryRepository, categoryService, categoryController };
