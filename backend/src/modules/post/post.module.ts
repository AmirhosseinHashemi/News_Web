import { prisma } from "../../lib/prisma.js";
import { mediaRepository } from "../media/media.module.js";
import PostController from "./post.controller.js";
import PostRepository from "./post.repository.js";
import PostService from "./post.service.js";

const postRepository = new PostRepository(prisma);
const postService = new PostService(postRepository, mediaRepository);
const postController = new PostController(postService);

export { postController, postRepository, postService };
