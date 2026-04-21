// ===== Veinashe Bags - Backend Server =====
// Express server that forwards form submissions to Feishu Bitable

require('dotenv').config();

const express = require('express');
const cors = require('cors');

// ===== Configuration (fail-fast) =====
function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}. Check server/.env`);
  return value;
}

const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  feishu: {
    appId: requiredEnv('FEISHU_APP_ID'),
    appSecret: requiredEnv('FEISHU_APP_SECRET'),
    appToken: requiredEnv('FEISHU_APP_TOKEN'),
    tableId: requiredEnv('FEISHU_TABLE_ID'),
  },
  apiKey: process.env.API_KEY || null,
};

// ===== Feishu API Client =====
let cachedToken = null;
let tokenExpireAt = 0;

async function getTenantAccessToken() {
  // Reuse cached token if still valid (with 5min buffer)
  if (cachedToken && Date.now() < tokenExpireAt - 300000) {
    return cachedToken;
  }

  const res = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      app_id: config.feishu.appId,
      app_secret: config.feishu.appSecret,
    }),
  });

  const data = await res.json();
  if (data.code !== 0) {
    throw new Error(`Failed to get tenant_access_token: code=${data.code}, msg=${data.msg}`);
  }

  cachedToken = data.tenant_access_token;
  tokenExpireAt = Date.now() + data.expire * 1000;
  return cachedToken;
}

async function createBitableRecord(fields) {
  const token = await getTenantAccessToken();
  const url = `https://open.feishu.cn/open-apis/bitable/v1/apps/${config.feishu.appToken}/tables/${config.feishu.tableId}/records`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ fields }),
  });

  const data = await res.json();

  if (data.code !== 0) {
    console.error('Feishu API error:', JSON.stringify(data, null, 2));
    throw new Error(`Feishu API error: code=${data.code}, msg=${data.msg}`);
  }

  return data.data.record;
}

// ===== Express App =====
const app = express();

// CORS - allow the Veinashe website to call this API
app.use(cors({
  origin: ['http://localhost:*', 'http://127.0.0.1:*'],
  // In production, set to your actual domain:
  // origin: 'https://www.veinashe.com',
}));
app.use(express.json());

// Optional API key middleware
if (config.apiKey) {
  app.use((req, res, next) => {
    const key = req.headers['x-api-key'];
    if (key !== config.apiKey) {
      return res.status(401).json({ success: false, message: 'Invalid API key' });
    }
    next();
  });
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Form submission endpoint
app.post('/api/inquiry', async (req, res) => {
  const { name, phone, email, company, type, requirement } = req.body;

  // Validate required fields
  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, message: 'Name is required' });
  }
  if (!phone || !phone.trim()) {
    return res.status(400).json({ success: false, message: 'Phone is required' });
  }

  try {
    // Map form data to Feishu Bitable fields
    // ⚠️ The field names below must EXACTLY match your Bitable column names
    const fields = {
      '姓名': name.trim(),
      '联系电话': phone.trim(),
    };

    // Optional fields - only include if provided
    if (email && email.trim()) fields['邮箱/微信'] = email.trim();
    if (company && company.trim()) fields['公司名称'] = company.trim();
    if (type && type.length > 0) fields['合作类型'] = type;
    if (requirement && requirement.trim()) fields['需求描述'] = requirement.trim();

    const record = await createBitableRecord(fields);

    console.log(`✅ New inquiry saved: record_id=${record.record_id}, name=${name}`);
    res.json({ success: true, message: 'Inquiry submitted successfully', recordId: record.record_id });
  } catch (err) {
    console.error('❌ Failed to save inquiry:', err.message);
    res.status(500).json({ success: false, message: 'Failed to save inquiry. Please try again later.' });
  }
});

// ===== Start Server =====
app.listen(config.port, () => {
  console.log(`🚀 Veinashe server running at http://localhost:${config.port}`);
  console.log(`📋 Health check: http://localhost:${config.port}/health`);
  console.log(`📡 Inquiry endpoint: POST http://localhost:${config.port}/api/inquiry`);
});
