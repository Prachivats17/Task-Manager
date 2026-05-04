import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import User from './models/User.js';
import Project from './models/Project.js';
import Task from './models/Task.js';

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ MongoDB connected');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create test users
    const users = await User.create([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
      },
      {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'member',
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'john123',
        role: 'member',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'jane123',
        role: 'member',
      },
    ]);
    console.log('👥 Created 4 test users');

    // Create test projects
    const projects = await Project.create([
      {
        name: 'Website Redesign',
        description: 'Complete redesign of company website',
        owner: users[0]._id,
        members: [
          { user: users[0]._id, role: 'admin' },
          { user: users[1]._id, role: 'member' },
          { user: users[2]._id, role: 'member' },
        ],
        status: 'active',
      },
      {
        name: 'Mobile App Development',
        description: 'Develop iOS and Android mobile applications',
        owner: users[1]._id,
        members: [
          { user: users[1]._id, role: 'admin' },
          { user: users[3]._id, role: 'member' },
        ],
        status: 'active',
      },
      {
        name: 'Database Migration',
        description: 'Migrate data from old to new database',
        owner: users[2]._id,
        members: [
          { user: users[2]._id, role: 'admin' },
          { user: users[0]._id, role: 'member' },
        ],
        status: 'active',
      },
    ]);
    console.log('📁 Created 3 test projects');

    // Create test tasks
    const tasks = await Task.create([
      {
        title: 'Design homepage mockup',
        description: 'Create high-fidelity mockup for the new homepage',
        project: projects[0]._id,
        assignedTo: users[1]._id,
        createdBy: users[0]._id,
        status: 'in-progress',
        priority: 'high',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      {
        title: 'Set up development environment',
        description: 'Configure all necessary tools and dependencies',
        project: projects[0]._id,
        assignedTo: users[2]._id,
        createdBy: users[0]._id,
        status: 'completed',
        priority: 'high',
      },
      {
        title: 'Review UI components',
        description: 'Review and approve all UI components',
        project: projects[0]._id,
        assignedTo: users[0]._id,
        createdBy: users[0]._id,
        status: 'todo',
        priority: 'medium',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },
      {
        title: 'iOS app development',
        description: 'Develop core features for iOS app',
        project: projects[1]._id,
        assignedTo: users[1]._id,
        createdBy: users[1]._id,
        status: 'in-progress',
        priority: 'high',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      },
      {
        title: 'Android app development',
        description: 'Develop core features for Android app',
        project: projects[1]._id,
        assignedTo: users[3]._id,
        createdBy: users[1]._id,
        status: 'todo',
        priority: 'high',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      },
      {
        title: 'Backup current database',
        description: 'Create backup of current database before migration',
        project: projects[2]._id,
        assignedTo: users[2]._id,
        createdBy: users[2]._id,
        status: 'todo',
        priority: 'high',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      },
    ]);
    console.log('✓ Created 6 test tasks');

    console.log('\n✨ Database seeding completed successfully!');
    console.log('\n📝 Test Accounts:');
    console.log('  Admin: admin@example.com / admin123');
    console.log('  User1: test@example.com / password123');
    console.log('  User2: john@example.com / john123');
    console.log('  User3: jane@example.com / jane123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
