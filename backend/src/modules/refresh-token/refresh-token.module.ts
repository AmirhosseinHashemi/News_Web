import { prisma } from "../../lib/prisma.js";
import RefreshTokenRepository from "./refresh-token.repository.js";
import RefreshTokenService from "./refresh-token.service.js";

const refreshTokenRepository = new RefreshTokenRepository(prisma);
const refreshTokenService = new RefreshTokenService(refreshTokenRepository);

export { refreshTokenRepository, refreshTokenService };
