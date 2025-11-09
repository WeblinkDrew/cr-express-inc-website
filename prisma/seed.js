const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create the original Carrier Onboarding form (the complex 50+ field form)
  const carrierForm = await prisma.form.upsert({
    where: { slug: 'carrier-onboarding' },
    update: {
      name: 'Carrier Onboarding',
      formType: 'CARRIER_ONBOARDING',
      description: 'Complete carrier onboarding form for new partnerships (50+ fields)',
    },
    create: {
      name: 'Carrier Onboarding',
      slug: 'carrier-onboarding',
      formType: 'CARRIER_ONBOARDING',
      description: 'Complete carrier onboarding form for new partnerships (50+ fields)',
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