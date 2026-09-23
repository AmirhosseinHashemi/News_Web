import ConflictError from "../../errors/ConflictError.js";
import { generateSlug } from "../../utils/slug.js";
import type PostRepository from "./post.repository.js";
import { CreatePostPayload } from "./post.type.js";

export default class PostService {
  constructor(private readonly postRepository: PostRepository) {}

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
}
