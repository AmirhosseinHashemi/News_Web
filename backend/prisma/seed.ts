import bcrypt from "bcrypt";
import { BCRYPT_SALT_ROUNDS } from "../src/config/constants.js";
import { prisma } from "../src/lib/prisma.js";

async function main() {
  const passwordHash = await bcrypt.hash(
    process.env.ADMIN_PASSWORD!,
    BCRYPT_SALT_ROUNDS
  );

  const admin = await prisma.user.upsert({
    where: {
      email: process.env.ADMIN_EMAIL!,
    },
    update: {},
    create: {
      name: process.env.ADMIN_NAME!,
      email: process.env.ADMIN_EMAIL!,
      phone: process.env.ADMIN_PHONE!,
      passwordHash,
      role: "ADMIN",
      isActive: true,
    },
  });

  console.log(`Admin seeded: ${admin.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
