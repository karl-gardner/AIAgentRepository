/**
 * Data Migration Script
 *
 * This script migrates data from the old JSON files to the SQL Server database.
 * Run this script once after setting up your database to import existing customer data.
 *
 * Usage: npm run dev -- src/scripts/migrate-json-data.ts
 */

import 'reflect-metadata';
import * as fs from 'fs';
import * as path from 'path';
import { AppDataSource } from '../config/data-source';
import { Customer } from '../entities/Customer';
import { DashboardData } from '../entities/DashboardData';

interface JsonCustomer {
  Id: string;
  Name: string;
  Email: string;
  CreatedAt: string;
}

interface JsonDashboardData {
  [customerId: string]: {
    TextContent: string;
    UpdatedAt: string;
  };
}

async function migrateData() {
  console.log('Starting data migration...');

  try {
    // Initialize database connection
    await AppDataSource.initialize();
    console.log('✓ Database connection established');

    const customerRepo = AppDataSource.getRepository(Customer);
    const dashboardRepo = AppDataSource.getRepository(DashboardData);

    // Path to the old JSON files (relative to project root)
    // Place your old customers.json and dashboard.json files in a 'data/' folder at the project root
    const customersPath = path.join(__dirname, '../../../data/customers.json');
    const dashboardPath = path.join(__dirname, '../../../data/dashboard.json');

    // Check if files exist
    if (!fs.existsSync(customersPath)) {
      console.warn('⚠ customers.json not found at:', customersPath);
      console.log('Skipping customer migration');
    } else {
      // Read customers.json
      const customersJson = fs.readFileSync(customersPath, 'utf-8');
      const jsonCustomers: JsonCustomer[] = JSON.parse(customersJson);

      console.log(`\nMigrating ${jsonCustomers.length} customers...`);

      for (const jsonCustomer of jsonCustomers) {
        // Check if customer already exists
        const existingCustomer = await customerRepo.findOne({
          where: { email: jsonCustomer.Email },
        });

        if (existingCustomer) {
          console.log(`  - Skipping ${jsonCustomer.Name} (${jsonCustomer.Email}) - already exists`);
          continue;
        }

        // Create new customer
        const customer = new Customer();
        customer.id = jsonCustomer.Id;
        customer.name = jsonCustomer.Name;
        customer.email = jsonCustomer.Email;
        customer.createdAt = new Date(jsonCustomer.CreatedAt);

        await customerRepo.save(customer);
        console.log(`  ✓ Migrated customer: ${customer.name} (${customer.email})`);
      }

      console.log('\n✓ Customer migration completed');
    }

    // Check if dashboard.json exists
    if (!fs.existsSync(dashboardPath)) {
      console.warn('\n⚠ dashboard.json not found at:', dashboardPath);
      console.log('Skipping dashboard data migration');
    } else {
      // Read dashboard.json
      const dashboardJson = fs.readFileSync(dashboardPath, 'utf-8');
      const jsonDashboard: JsonDashboardData = JSON.parse(dashboardJson);

      const dashboardKeys = Object.keys(jsonDashboard);
      console.log(`\nMigrating dashboard data for ${dashboardKeys.length} customers...`);

      for (const customerId of dashboardKeys) {
        // Check if customer exists
        const customer = await customerRepo.findOne({ where: { id: customerId } });

        if (!customer) {
          console.log(`  ⚠ Skipping dashboard data for unknown customer ID: ${customerId.substring(0, 8)}...`);
          continue;
        }

        // Check if dashboard data already exists
        const existingDashboard = await dashboardRepo.findOne({
          where: { customerId },
        });

        if (existingDashboard) {
          console.log(`  - Skipping dashboard data for ${customer.name} - already exists`);
          continue;
        }

        // Create dashboard data
        const dashboardData = new DashboardData();
        dashboardData.customerId = customerId;
        dashboardData.textContent = jsonDashboard[customerId].TextContent;
        dashboardData.updatedAt = new Date(jsonDashboard[customerId].UpdatedAt);

        await dashboardRepo.save(dashboardData);
        console.log(`  ✓ Migrated dashboard data for: ${customer.name}`);
      }

      console.log('\n✓ Dashboard data migration completed');
    }

    console.log('\n✅ All data migration completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Verify the data in your SQL Server database');
    console.log('2. Start the backend server: npm run dev');
    console.log('3. Start the frontend: cd ../frontend && npm run dev');

  } catch (error) {
    console.error('✗ Migration failed:', error);
    process.exit(1);
  } finally {
    // Close database connection
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('\n✓ Database connection closed');
    }
  }
}

// Run migration
migrateData();
