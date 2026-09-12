import type { RequestHandler } from "express";
import ForbiddenError from "../errors/ForbiddenError.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";
import { rolePermissionRepository } from "../modules/role-permission/role-permission.module.js";

export default function authorizeMiddleware(
  permissionName: string
): RequestHandler {
  return async (req, _res, next) => {
    console.log(req.user);
    

    if (!req.user) {
      return next(new UnauthorizedError());
    }

    if (req.user.role === "ADMIN") {
      return next();
    }

    const rolePermission = await rolePermissionRepository.findRolePermission(
      req.user.roleId,
      permissionName
    );

    if (!rolePermission) {
      return next(new ForbiddenError());
    }

    next();
  };
}
