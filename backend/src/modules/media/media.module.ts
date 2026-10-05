import { prisma } from "../../lib/prisma.js";
import MediaRepository from "./media.repository.js";

const mediaRepository = new MediaRepository(prisma);

export { mediaRepository };
