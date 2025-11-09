import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create the Carrier Onboarding form
  const carrierForm = await prisma.form.upsert({
    where: { slug: 'carrier-onboarding' },
    update: {},
    create: {
      name: 'Axiom Carrier Onboarding',
      slug: 'carrier-onboarding',
      formType: 'CARRIER_ONBOARDING',
      description: 'Complete carrier onboarding form for new partnerships',
      isActive: true,
    },
  });

  console.log('✅ Created Carrier Onboarding form:', carrierForm);

  console.log('🌱 Database seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
