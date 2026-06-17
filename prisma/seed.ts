import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create a default Tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: 'EffectiveBuzz Platform',
      domain: 'effectivebuzz.online',
      plan: 'Enterprise',
      status: 'active',
    },
  });
  console.log(`Created Tenant: ${tenant.name}`);

  // Create an Owner User
  const ownerUser = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: 'admin@effectivebuzz.online',
      passwordHash: 'dummy_hash', // replace with bcrypt in real logic
      name: 'Super Admin',
      role: 'Owner',
      isVerified: true,
    },
  });
  console.log(`Created User: ${ownerUser.email}`);

  // Create a Workspace
  const workspace = await prisma.workspace.create({
    data: {
      tenantId: tenant.id,
      name: 'HQ Workspace',
      slug: 'hq-workspace',
    },
  });
  console.log(`Created Workspace: ${workspace.slug}`);

  // Link User to Workspace
  await prisma.workspaceMembership.create({
    data: {
      workspaceId: workspace.id,
      userId: ownerUser.id,
      role: 'Owner',
    },
  });

  // Create some CRM Data
  const company = await prisma.company.create({
    data: {
      workspaceId: workspace.id,
      name: 'Acme Corp',
      domain: 'acme.com',
      industry: 'Software',
    },
  });

  const contact = await prisma.contact.create({
    data: {
      workspaceId: workspace.id,
      companyId: company.id,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@acme.com',
      status: 'NEW',
    },
  });
  
  await prisma.lead.create({
    data: {
      workspaceId: workspace.id,
      contactId: contact.id,
      companyId: company.id,
      score: 50,
      source: 'Inbound',
    },
  });
  console.log('Created Mock CRM data');

  // Create an AI Agent
  await prisma.aiAgent.create({
    data: {
      workspaceId: workspace.id,
      name: 'Alex (SDR)',
      persona: 'You are a professional and friendly sales development representative.',
      model: 'claude-3-5-sonnet',
    },
  });
  console.log('Created Mock AI Agent');

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
