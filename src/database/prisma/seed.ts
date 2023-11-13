import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const hana = await prisma.user.create({
    data: {
      username: 'hana',
      email: 'hana@hana.io',
      full_name: 'Hana Shala',
    },
  });

  console.log(hana);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
