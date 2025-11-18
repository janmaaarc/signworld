const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sign-company-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = require('./models/User');

const resetAdmin = async () => {
  try {
    // Delete existing admin
    await User.deleteOne({ email: 'admin@signcompany.com' });
    console.log('Existing admin deleted (if any)');

    // Create admin user (password will be hashed automatically by pre-save hook)
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@signcompany.com',
      password: 'admin123',
      role: 'admin',
      phone: '555-555-0100',
      company: 'Sign Company HQ',
      address: {
        city: 'New York',
        state: 'NY',
        country: 'USA',
      },
      isActive: true,
    });

    console.log('✓ Admin user created successfully!');
    console.log('==========================================');
    console.log('Email:    admin@signcompany.com');
    console.log('Password: admin123');
    console.log('==========================================');
    console.log('Please change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Error resetting admin:', error);
    process.exit(1);
  }
};

resetAdmin();
