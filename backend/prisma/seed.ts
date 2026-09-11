import bcrypt from "bcrypt";
import { BCRYPT_SALT_ROUNDS } from "../src/config/constants.js";
import { prisma } from "../src/lib/prisma.js";

const permissions = [
  // Users
  {
    name: "users.read",
    description: "مشاهده کاربران",
  },
  {
    name: "users.create",
    description: "ایجاد کاربر",
  },
  {
    name: "users.update",
    description: "ویرایش کاربر",
  },
  {
    name: "users.delete",
    description: "حذف کاربر",
  },
  {
    name: "users.toggle-status",
    description: "فعال یا غیرفعال کردن کاربر",
  },

  // Roles
  {
    name: "roles.read",
    description: "مشاهده نقش‌ها",
  },
  {
    name: "roles.create",
    description: "ایجاد نقش",
  },
  {
    name: "roles.update",
    description: "ویرایش نقش",
  },
  {
    name: "roles.delete",
    description: "حذف نقش",
  },

  // Permissions
  {
    name: "permissions.read",
    description: "مشاهده دسترسی‌ها",
  },

  // Categories
  {
    name: "categories.read",
    description: "مشاهده دسته‌بندی‌ها",
  },
  {
    name: "categories.create",
    description: "ایجاد دسته‌بندی",
  },
  {
    name: "categories.update",
    description: "ویرایش دسته‌بندی",
  },
  {
    name: "categories.delete",
    description: "حذف دسته‌بندی",
  },

  // Posts
  {
    name: "posts.read",
    description: "مشاهده اخبار",
  },
  {
    name: "posts.create",
    description: "ایجاد خبر",
  },
  {
    name: "posts.update",
    description: "ویرایش خبر",
  },
  {
    name: "posts.delete",
    description: "حذف خبر",
  },
  {
    name: "posts.publish",
    description: "انتشار خبر",
  },
  {
    name: "posts.unpublish",
    description: "لغو انتشار خبر",
  },

  // Media
  {
    name: "media.read",
    description: "مشاهده رسانه‌ها",
  },
  {
    name: "media.upload",
    description: "آپلود رسانه",
  },
  {
    name: "media.update",
    description: "ویرایش رسانه",
  },
  {
    name: "media.delete",
    description: "حذف رسانه",
  },
  {
    name: "media.reorder",
    description: "تغییر ترتیب رسانه‌ها",
  },
];

const editorPermissionNames = [
  "posts.read",
  "posts.create",
  "posts.update",
  "posts.publish",
  "posts.unpublish",

  "media.read",
  "media.upload",
  "media.update",
  "media.delete",
  "media.reorder",

  "categories.read",
  "categories.create",
];

async function seedPermissions() {
  const permissionMap = new Map<string, { id: number; name: string }>();

  for (const permission of permissions) {
    const createdPermission = await prisma.permission.upsert({
      where: {
        name: permission.name,
      },
      update: {
        description: permission.description,
      },
      create: permission,
    });

    permissionMap.set(permission.name, createdPermission);
  }

  return permissionMap;
}

async function seedRoles() {
  const adminRole = await prisma.role.upsert({
    where: {
      name: "ADMIN",
    },
    update: {
      description: "مدیر سیستم",
      isSystem: true,
    },
    create: {
      name: "ADMIN",
      description: "مدیر سیستم",
      isSystem: true,
    },
  });

  const editorRole = await prisma.role.upsert({
    where: {
      name: "EDITOR",
    },
    update: {
      description: "ویرایشگر محتوا",
      isSystem: false,
    },
    create: {
      name: "EDITOR",
      description: "ویرایشگر محتوا",
      isSystem: false,
    },
  });

  return {
    adminRole,
    editorRole,
  };
}

export async function seedAdminUser(adminRoleId: number) {
  const passwordHash = await bcrypt.hash(
    process.env.ADMIN_PASSWORD!,
    BCRYPT_SALT_ROUNDS
  );

  return await prisma.user.upsert({
    where: {
      email: process.env.ADMIN_EMAIL!,
    },
    update: {
      roleId: adminRoleId,
      isActive: true,
    },
    create: {
      name: process.env.ADMIN_NAME!,
      email: process.env.ADMIN_EMAIL!,
      phone: process.env.ADMIN_PHONE!,
      passwordHash,
      roleId: adminRoleId,
      isActive: true,
    },
  });
}

export async function seedRolePermissions(
  editorRoleId: number,
  permissionMap: Map<string, { id: number; name: string }>
) {
  for (const permissionName of editorPermissionNames) {
    const permission = permissionMap.get(permissionName);

    if (!permission) {
      throw new Error(`Permission "${permissionName}" was not found.`);
    }

    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: editorRoleId,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: editorRoleId,
        permissionId: permission.id,
      },
    });
  }
}

async function main() {
  console.log("🌱 Starting seed...");

  const permissionMap = await seedPermissions();
  console.log(`✅ ${permissionMap.size} permissions seeded.`);

  const { editorRole, adminRole } = await seedRoles();
  console.log("✅ Roles seeded.");

  await seedRolePermissions(editorRole.id, permissionMap);
  console.log("✅ Role permissions seeded.");

  const admin = await seedAdminUser(adminRole.id);

  console.log(`✅ Admin user ready: ${admin.email}`);

  console.log("🌱 Seed completed successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
