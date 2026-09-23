import { prisma } from "../../lib/prisma.js";
import PostController from "./post.controller.js";
import PostRepository from "./post.repository.js";
import PostService from "./post.service.js";

const postRepository = new PostRepository(prisma);
const postService = new PostService(postRepository);
const postController = new PostController(postService);

export { postRepository, postService, postController };
