const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create the original Client Onboarding form (the complex 50+ field form)
  const carrierForm = await prisma.form.upsert({
    where: { slug: 'client-onboarding' },
    update: {
      name: 'Client Onboarding Form',
      formType: 'CARRIER_ONBOARDING',
      description: 'Complete client onboarding form for new partnerships (50+ fields)',
    },
    create: {
      name: 'Client Onboarding Form',
      slug: 'client-onboarding',
      formType: 'CARRIER_ONBOARDING',
      description: 'Complete client onboarding form for new partnerships (50+ fields)',
      isActive: true,
    },
  });

  console.log('✅ Created Client Onboarding form:', carrierForm);

  // Create Axiom Invoicing form
  const axiomInvoicingForm = await prisma.form.upsert({
    where: { slug: 'axiom-invoicing' },
    update: {
      name: 'Axiom Invoicing',
      formType: 'AXIOM_INVOICING',
      description: 'Axiom invoicing form for load billing',
    },
    create: {
      name: 'Axiom Invoicing',
      slug: 'axiom-invoicing',
      formType: 'AXIOM_INVOICING',
      description: 'Axiom invoicing form for load billing',
      isActive: true,
    },
  });
  console.log('✅ Created Axiom Invoicing form:', axiomInvoicingForm);

  // Create Axiom Carrier Onboarding form
  const axiomCarrierForm = await prisma.form.upsert({
    where: { slug: 'axiom-carrier-onboarding' },
    update: {
      name: 'Axiom Carrier Onboarding',
      formType: 'AXIOM_CARRIER_ONBOARDING',
      description: 'Axiom carrier onboarding with company information',
    },
    create: {
      name: 'Axiom Carrier Onboarding',
      slug: 'axiom-carrier-onboarding',
      formType: 'AXIOM_CARRIER_ONBOARDING',
      description: 'Axiom carrier onboarding with company information',
      isActive: true,
    },
  });
  console.log('✅ Created Axiom Carrier Onboarding form:', axiomCarrierForm);

  // Create Bathroom Request form
  const bathroomForm = await prisma.form.upsert({
    where: { slug: 'bathroom-request' },
    update: {
      name: 'Bathroom Request Form',
      formType: 'BATHROOM_REQUEST',
      description: 'Internal bathroom supplies request form',
    },
    create: {
      name: 'Bathroom Request Form',
      slug: 'bathroom-request',
      formType: 'BATHROOM_REQUEST',
      description: 'Internal bathroom supplies request form',
      isActive: true,
    },
  });
  console.log('✅ Created Bathroom Request form:', bathroomForm);

  // Create Warehouse Check-In form
  const warehouseCheckinForm = await prisma.form.upsert({
    where: { slug: 'warehouse-checkin' },
    update: {
      name: 'Warehouse Check-In',
      formType: 'WAREHOUSE_CHECKIN',
      description: 'Driver check-in form for warehouse',
    },
    create: {
      name: 'Warehouse Check-In',
      slug: 'warehouse-checkin',
      formType: 'WAREHOUSE_CHECKIN',
      description: 'Driver check-in form for warehouse',
      isActive: true,
    },
  });
  console.log('✅ Created Warehouse Check-In form:', warehouseCheckinForm);

  // Create Driver Feedback form
  const driverFeedbackForm = await prisma.form.upsert({
    where: { slug: 'driver-feedback' },
    update: {
      name: 'Driver Feedback & Reporting',
      formType: 'DRIVER_FEEDBACK',
      description: 'Driver feedback and reporting system',
    },
    create: {
      name: 'Driver Feedback & Reporting',
      slug: 'driver-feedback',
      formType: 'DRIVER_FEEDBACK',
      description: 'Driver feedback and reporting system',
      isActive: true,
    },
  });
  console.log('✅ Created Driver Feedback form:', driverFeedbackForm);

  // Create Employee Asset Check-In form
  const employeeAssetForm = await prisma.form.upsert({
    where: { slug: 'employee-asset-checkin' },
    update: {
      name: 'Employee Asset Check-In',
      formType: 'EMPLOYEE_ASSET_CHECKIN',
      description: 'Track company-issued equipment and assets',
    },
    create: {
      name: 'Employee Asset Check-In',
      slug: 'employee-asset-checkin',
      formType: 'EMPLOYEE_ASSET_CHECKIN',
      description: 'Track company-issued equipment and assets',
      isActive: true,
    },
  });
  console.log('✅ Created Employee Asset Check-In form:', employeeAssetForm);

  // Create Warehouse Services form
  const warehouseServicesForm = await prisma.form.upsert({
    where: { slug: 'warehouse-services' },
    update: {
      name: 'Warehouse Services Form',
      formType: 'WAREHOUSE_SERVICES',
      description: 'Request warehouse services for shipments',
    },
    create: {
      name: 'Warehouse Services Form',
      slug: 'warehouse-services',
      formType: 'WAREHOUSE_SERVICES',
      description: 'Request warehouse services for shipments',
      isActive: true,
    },
  });
  console.log('✅ Created Warehouse Services form:', warehouseServicesForm);

  // Create Load Creation Request form
  const loadCreationForm = await prisma.form.upsert({
    where: { slug: 'load-creation-request' },
    update: {
      name: 'Load Creation Request',
      formType: 'LOAD_CREATION_REQUEST',
      description: 'Create new load with customer and driver information',
    },
    create: {
      name: 'Load Creation Request',
      slug: 'load-creation-request',
      formType: 'LOAD_CREATION_REQUEST',
      description: 'Create new load with customer and driver information',
      isActive: true,
    },
  });
  console.log('✅ Created Load Creation Request form:', loadCreationForm);

  // Create Forklift Inspection form
  const forkliftInspectionForm = await prisma.form.upsert({
    where: { slug: 'forklift-inspection' },
    update: {
      name: 'Forklift Inspection Checklist',
      formType: 'FORKLIFT_INSPECTION',
      description: 'Pre-operation safety inspection checklist for forklifts',
    },
    create: {
      name: 'Forklift Inspection Checklist',
      slug: 'forklift-inspection',
      formType: 'FORKLIFT_INSPECTION',
      description: 'Pre-operation safety inspection checklist for forklifts',
      isActive: true,
    },
  });
  console.log('✅ Created Forklift Inspection form:', forkliftInspectionForm);

  // Create ULD Inspection form
  const uldInspectionForm = await prisma.form.upsert({
    where: { slug: 'uld-inspection' },
    update: {
      name: 'ULD Inspection Form',
      formType: 'ULD_INSPECTION',
      description: 'Cargo device inspection with photo documentation',
    },
    create: {
      name: 'ULD Inspection Form',
      slug: 'uld-inspection',
      formType: 'ULD_INSPECTION',
      description: 'Cargo device inspection with photo documentation',
      isActive: true,
    },
  });
  console.log('✅ Created ULD Inspection form:', uldInspectionForm);

  // Create Cargo Damage Report form
  const cargoDamageForm = await prisma.form.upsert({
    where: { slug: 'cargo-damage-report' },
    update: {
      name: 'Cargo Irregularity Report - Damage',
      formType: 'CARGO_DAMAGE_REPORT',
      description: 'Report cargo damage with classification and documentation',
    },
    create: {
      name: 'Cargo Irregularity Report - Damage',
      slug: 'cargo-damage-report',
      formType: 'CARGO_DAMAGE_REPORT',
      description: 'Report cargo damage with classification and documentation',
      isActive: true,
    },
  });
  console.log('✅ Created Cargo Damage Report form:', cargoDamageForm);

  // Create Cargo Shortage/Overage form
  const cargoShortageForm = await prisma.form.upsert({
    where: { slug: 'cargo-shortage-overage' },
    update: {
      name: 'Cargo Irregularity Report - Shortage/Overage',
      formType: 'CARGO_SHORTAGE_OVERAGE_REPORT',
      description: 'Report cargo shortage or overage with detailed tracking',
    },
    create: {
      name: 'Cargo Irregularity Report - Shortage/Overage',
      slug: 'cargo-shortage-overage',
      formType: 'CARGO_SHORTAGE_OVERAGE_REPORT',
      description: 'Report cargo shortage or overage with detailed tracking',
      isActive: true,
    },
  });
  console.log('✅ Created Cargo Shortage/Overage form:', cargoShortageForm);

  // Create DoorDash Driver Check-In form
  const doordashDriverCheckinForm = await prisma.form.upsert({
    where: { slug: 'doordash-driver-checkin' },
    update: {
      name: 'DoorDash Driver Check-In',
      formType: 'DOORDASH_DRIVER_CHECKIN',
      description: 'Driver check-in form for DoorDash deliveries with BOL upload',
    },
    create: {
      name: 'DoorDash Driver Check-In',
      slug: 'doordash-driver-checkin',
      formType: 'DOORDASH_DRIVER_CHECKIN',
      description: 'Driver check-in form for DoorDash deliveries with BOL upload',
      isActive: true,
    },
  });
  console.log('✅ Created DoorDash Driver Check-In form:', doordashDriverCheckinForm);

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