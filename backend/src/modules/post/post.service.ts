import BadRequestError from "../../errors/BadRequestError.js";
import ConflictError from "../../errors/ConflictError.js";
import NotFoundError from "../../errors/NotFoundError.js";
import {
  getPagination,
  getPaginationMeta,
} from "../../utils/paginationHelpers.js";
import { generateSlug } from "../../utils/slug.js";
import type PostRepository from "./post.repository.js";
import {
  CreatePostPayload,
  FindAllPostQueries,
  UpdatePostPayload,
} from "./post.type.js";

export default class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async findAll({
    page,
    limit,
    search,
    categoryId,
    locationId,
    typeId,
  }: FindAllPostQueries) {
    const { skip, take } = getPagination(page, limit);

    const [posts, totalItems] = await this.postRepository.findAll({
      skip,
      take,
      search,
      categoryId,
      locationId,
      typeId,
    });

    const paginationMeta = getPaginationMeta({ page, limit, totalItems });

    return { posts, paginationMeta };
  }

  async createDraft(authorId: number, payload: CreatePostPayload) {
    const slug = generateSlug(payload.title);

    const existingPost = await this.postRepository.findBySlug(slug);
    if (existingPost)
      throw new ConflictError({ message: "یک پست با این اسلاگ وجود دارد" });

    return this.postRepository.create({
      ...payload,
      slug,
      authorId,
    });
  }

  async findById(id: number) {
    const post = await this.postRepository.findById(id);

    if (!post || post.deletedAt) throw new NotFoundError("پست یافت نشد");

    return post;
  }

  async update(id: number, payload: UpdatePostPayload) {
    const existingPost = await this.postRepository.findById(id);

    if (!existingPost || existingPost.deletedAt)
      throw new NotFoundError("پست پیدا نشد");

    return this.postRepository.update(id, payload);
  }

  async publish(id: number) {
    const existingPost = await this.postRepository.findById(id);

    if (!existingPost || existingPost.deletedAt)
      throw new NotFoundError("پستی برای انتشار وجود ندارد");

    if (existingPost.status === "PUBLISHED")
      throw new BadRequestError("این پست قبلا منتشر شده");

    return this.postRepository.publish(id);
  }

  async softDelete(id: number) {
    const existingPost = await this.postRepository.findById(id);

    if (!existingPost || existingPost.deletedAt)
      throw new NotFoundError("پست یافت نشد");

    return this.postRepository.softDelete(id);
  }
}
