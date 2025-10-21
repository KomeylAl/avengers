import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const email = "admin@example.com";
    const password = "123456";

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingAdmin = await prisma.admin.findUnique({
        where: { email },
    });

    if (existingAdmin) {
        console.log("✅ Admin already exists:", existingAdmin.email);
        return;
    }

    const admin = await prisma.admin.create({
        data: {
            email,
            password: hashedPassword,
        },
    });

    console.log("🎉 Admin created:", admin.email);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
