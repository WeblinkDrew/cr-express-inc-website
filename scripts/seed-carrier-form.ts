import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Carrier Onboarding form...");

  // Check if form already exists
  const existing = await prisma.form.findFirst({
    where: {
      slug: {
        startsWith: "carrier-onboarding-",
      },
    },
  });

  if (existing) {
    console.log("✅ Carrier Onboarding form already exists:");
    console.log(`   ID: ${existing.id}`);
    console.log(`   Slug: ${existing.slug}`);
    console.log(`   URL: /form/${existing.slug}`);
    return;
  }

  // Create the form
  const form = await prisma.form.create({
    data: {
      name: "Carrier Onboarding",
      slug: "carrier-onboarding-3f8a2e1b",
      formType: "CARRIER_ONBOARDING",
      description: "Primary carrier onboarding form for new partners",
      isActive: true,
    },
  });

  console.log("✅ Created Carrier Onboarding form:");
  console.log(`   ID: ${form.id}`);
  console.log(`   Name: ${form.name}`);
  console.log(`   Slug: ${form.slug}`);
  console.log(`   URL: /form/${form.slug}`);
  console.log(`\n📋 Copy this URL to share with carriers:`);
  console.log(`   http://localhost:3000/form/${form.slug}`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
