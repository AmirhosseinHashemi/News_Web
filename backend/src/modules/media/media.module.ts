import { prisma } from "../../lib/prisma.js";
import MediaController from "./media.controller.js";
import MediaRepository from "./media.repository.js";
import MediaService from "./media.service.js";

const mediaRepository = new MediaRepository(prisma);
const mediaService = new MediaService(mediaRepository);
const mediaController = new MediaController(mediaService);

export { mediaController, mediaRepository, mediaService };
