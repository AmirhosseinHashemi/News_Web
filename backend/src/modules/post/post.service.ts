import ConflictError from "../../errors/ConflictError.js";
import NotFoundError from "../../errors/NotFoundError.js";
import {
  getPagination,
  getPaginationMeta,
} from "../../utils/paginationHelpers.js";
import { generateSlug } from "../../utils/slug.js";
import type PostRepository from "./post.repository.js";
import { CreatePostPayload, FindAllPostQueris } from "./post.type.js";

export default class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async findAll({ page, limit, search }: FindAllPostQueris) {
    const { skip, take } = getPagination(page, limit);

    const [posts, totalItems] = await this.postRepository.findAll({
      skip,
      take,
      search,
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
}
