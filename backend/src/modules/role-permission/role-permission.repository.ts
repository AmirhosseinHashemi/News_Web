import { PrismaClient } from "../../generated/prisma/client.js";
import { execute } from "../../utils/queryExecuter.js";

export default class RolePermissionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findRolePermission(roleId: number, permissionName: string) {
    return execute(() =>
      this.prisma.rolePermission.findFirst({
        where: {
          roleId,
          permission: {
            name: permissionName,
          },
        },
      })
    );
  }
}
