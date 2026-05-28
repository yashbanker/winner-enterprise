import Inquiry from '../models/Inquiry.js';
import Product from '../models/Product.js';
import nodemailer from 'nodemailer';

const sendMail = async (inquiry) => {
  if (!process.env.SMTP_HOST) return;
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      subject: `New ${inquiry.type} inquiry — ${inquiry.name}`,
      html: `
        <h2>New Inquiry from WINNER ENTERPRISE Website</h2>
        <p><b>Type:</b> ${inquiry.type}</p>
        <p><b>Name:</b> ${inquiry.name}</p>
        <p><b>Email:</b> ${inquiry.email}</p>
        <p><b>Phone:</b> ${inquiry.phone}</p>
        <p><b>Company:</b> ${inquiry.company || '-'}</p>
        <p><b>Product:</b> ${inquiry.productName || '-'}</p>
        <p><b>Quantity:</b> ${inquiry.quantity || '-'}</p>
        <p><b>Message:</b><br/>${inquiry.message}</p>
      `,
    });
  } catch (e) {
    console.error('Mail error:', e.message);
  }
};

export const createInquiry = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.product) {
      const p = await Product.findById(data.product);
      if (p) data.productName = p.name;
    }
    const inquiry = await Inquiry.create(data);
    sendMail(inquiry); // fire and forget
    res.status(201).json({ message: 'Inquiry received. We will contact you shortly.', inquiry });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const listInquiries = async (req, res) => {
  const { status, type, page = 1, limit = 50 } = req.query;
  const query = {};
  if (status) query.status = status;
  if (type) query.type = type;
  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Inquiry.find(query).populate('product', 'name code').sort('-createdAt').skip(skip).limit(Number(limit)),
    Inquiry.countDocuments(query),
  ]);
  res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
};

export const updateInquiry = async (req, res) => {
  const inq = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!inq) return res.status(404).json({ message: 'Inquiry not found' });
  res.json(inq);
};

export const deleteInquiry = async (req, res) => {
  await Inquiry.findByIdAndDelete(req.params.id);
  res.json({ message: 'Inquiry deleted' });
};

export const exportInquiries = async (req, res) => {
  const inquiries = await Inquiry.find().populate('product', 'name code').sort('-createdAt');
  const headers = [
    'Date',
    'Type',
    'Name',
    'Email',
    'Phone',
    'Company',
    'Country',
    'Product',
    'Quantity',
    'Status',
    'Message',
  ];
  const rows = inquiries.map((i) => [
    new Date(i.createdAt).toISOString(),
    i.type,
    i.name,
    i.email,
    i.phone,
    i.company,
    i.country,
    i.productName || i.product?.name || '',
    i.quantity,
    i.status,
    (i.message || '').replace(/\n/g, ' ').replace(/"/g, '""'),
  ]);
  const csv =
    headers.join(',') +
    '\n' +
    rows.map((r) => r.map((v) => `"${v ?? ''}"`).join(',')).join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="inquiries.csv"');
  res.send(csv);
};

export const inquiryStats = async (req, res) => {
  const [total, newCount, byType, recent] = await Promise.all([
    Inquiry.countDocuments(),
    Inquiry.countDocuments({ status: 'new' }),
    Inquiry.aggregate([{ $group: { _id: '$type', count: { $sum: 1 } } }]),
    Inquiry.find().sort('-createdAt').limit(5).select('name email type status createdAt'),
  ]);
  res.json({ total, newCount, byType, recent });
};
