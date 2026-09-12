import { prisma } from "../../lib/prisma.js";
import RolePermissionRepository from "./role-permission.repository.js";

const rolePermissionRepository = new RolePermissionRepository(prisma);

export { rolePermissionRepository };
