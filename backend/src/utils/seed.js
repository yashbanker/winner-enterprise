import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Banner from '../models/Banner.js';
import Gallery from '../models/Gallery.js';
import { slugify } from './slugify.js';

const seed = async () => {
  await connectDB();
  console.log('🌱 Seeding database...');

  // Admin user
  const email = process.env.ADMIN_EMAIL || 'admin@winnerenterprise.com';
  const existing = await User.findOne({ email });
  if (!existing) {
    await User.create({
      name: process.env.ADMIN_NAME || 'Winner Admin',
      email,
      password: process.env.ADMIN_PASSWORD || 'Winner@2026',
      role: 'admin',
    });
    console.log(`✅ Admin user created: ${email}`);
  } else {
    console.log(`↪ Admin user already exists: ${email}`);
  }

  // Categories
  const categoryData = [
    { name: 'White Glass Beads', description: 'Pure crystal-clear white glass beads for industrial, decorative and reflective applications.', icon: 'sparkles', order: 1 },
    { name: 'Golden Glass Beads', description: 'Premium golden / amber colored beads with luxurious metallic sheen.', icon: 'sun', order: 2 },
    { name: 'Reflective Glass Beads', description: 'High-refractive index beads engineered for road marking and traffic safety paints.', icon: 'zap', order: 3 },
    { name: 'Decorative Glass Beads', description: 'Vibrant colored beads for interior, jewelry and decorative applications.', icon: 'gem', order: 4 },
    { name: 'Industrial Glass Beads', description: 'High-purity, abrasive-grade glass beads for sandblasting and surface finishing.', icon: 'cog', order: 5 },
  ];
  for (const c of categoryData) {
    const slug = slugify(c.name);
    await Category.updateOne({ slug }, { ...c, slug }, { upsert: true });
  }
  console.log(`✅ ${categoryData.length} categories seeded`);

  // Sample placeholder products (minimal)
  const cats = await Category.find();
  const sample = [
    {
      name: 'Crystal White Beads – Grade A',
      code: 'WGB-001',
      category: cats.find((c) => c.slug === 'white-glass-beads')._id,
      color: 'Crystal White',
      size: '0.3 - 0.6 mm',
      shortDescription: 'High-purity colorless beads with excellent sphericity.',
      description: 'Premium quality crystal white glass beads with excellent roundness, transparency and chemical stability. Suitable for blasting, filtration and decorative use.',
      images: ['/assets/product-white.png'],
      primaryImage: '/assets/product-white.png',
      packaging: '25 kg HDPE bags',
      minOrderQty: '500 kg',
      isFeatured: true,
    },
    {
      name: 'Royal Golden Beads',
      code: 'GGB-001',
      category: cats.find((c) => c.slug === 'golden-glass-beads')._id,
      color: 'Royal Gold',
      size: '0.6 - 1.0 mm',
      shortDescription: 'Luxurious golden glass beads with metallic sheen.',
      description: 'Premium amber/golden tone glass beads ideal for decorative applications, designer flooring, and luxury interior projects.',
      images: ['/assets/product-golden.png'],
      primaryImage: '/assets/product-golden.png',
      packaging: '25 kg bags',
      minOrderQty: '300 kg',
      isFeatured: true,
    },
    {
      name: 'Road Marking Reflective Beads',
      code: 'RGB-001',
      category: cats.find((c) => c.slug === 'reflective-glass-beads')._id,
      color: 'Silver Reflective',
      size: '125 - 850 micron',
      shortDescription: 'Highly reflective beads compliant with BS / AASHTO standards.',
      description: 'Engineered for thermoplastic and cold-applied road marking paints. High retro-reflective index, excellent roundness and durability.',
      images: ['/assets/product-reflective.png'],
      primaryImage: '/assets/product-reflective.png',
      packaging: '25 kg bags / bulk',
      minOrderQty: '1000 kg',
      isFeatured: true,
    },
    {
      name: 'Designer Color Beads',
      code: 'DGB-001',
      category: cats.find((c) => c.slug === 'decorative-glass-beads')._id,
      color: 'Multi-color',
      size: '1 - 3 mm',
      shortDescription: 'Vibrant decorative beads in multiple colors.',
      description: 'Beautiful decorative glass beads available in emerald, ruby, sapphire and pearl tones. Perfect for resin art, vase fillers and luxury décor.',
      images: ['/assets/product-decorative.png'],
      primaryImage: '/assets/product-decorative.png',
      packaging: '5 / 10 / 25 kg packs',
      minOrderQty: '100 kg',
      isFeatured: false,
    },
    {
      name: 'Industrial Blasting Beads',
      code: 'IGB-001',
      category: cats.find((c) => c.slug === 'industrial-glass-beads')._id,
      color: 'Industrial White',
      size: '100 - 200 micron',
      shortDescription: 'Premium abrasive-grade for sandblasting and finishing.',
      description: 'High-purity industrial glass beads for shot peening, sandblasting, surface cleaning and finishing of metal components.',
      images: ['/assets/product-industrial.png'],
      primaryImage: '/assets/product-industrial.png',
      packaging: '25 kg bags',
      minOrderQty: '500 kg',
      isFeatured: true,
    },
  ];
  for (const p of sample) {
    const slug = slugify(`${p.name}-${p.code}`);
    await Product.updateOne({ slug }, { ...p, slug, availability: 'in_stock', isActive: true }, { upsert: true });
  }
  console.log(`✅ ${sample.length} sample products seeded`);

  // Gallery
  const galleryData = [
    { title: 'Warehouse Facility', image: '/assets/warehouse.png', category: 'warehouse', order: 1 },
    { title: 'Crystal White Beads', image: '/assets/product-white.png', category: 'products', order: 2 },
    { title: 'Royal Golden Beads', image: '/assets/product-golden.png', category: 'products', order: 3 },
    { title: 'Reflective Beads', image: '/assets/product-reflective.png', category: 'products', order: 4 },
    { title: 'Decorative Beads', image: '/assets/product-decorative.png', category: 'products', order: 5 },
    { title: 'Industrial Grade', image: '/assets/product-industrial.png', category: 'products', order: 6 },
  ];
  for (const g of galleryData) {
    await Gallery.updateOne({ image: g.image }, { ...g, isActive: true }, { upsert: true });
  }
  console.log(`✅ ${galleryData.length} gallery items seeded`);

  // Banner
  await Banner.updateOne(
    { title: 'Leading Supplier of Premium Glass Beads' },
    {
      title: 'Leading Supplier of Premium Glass Beads',
      subtitle: 'Providing high-quality glass beads with trusted service, bulk availability, and reliable delivery.',
      image: '/assets/hero.png',
      ctaText: 'View Products',
      ctaLink: '/products',
      order: 1,
      isActive: true,
    },
    { upsert: true }
  );
  console.log('✅ Default hero banner seeded');

  console.log('🎉 Seed complete!');
  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
