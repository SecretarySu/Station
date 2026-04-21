// ===== Vercel Serverless Function - Feishu Bitable Integration =====
// Handles form submission and writes to Feishu Bitable

// ===== Configuration =====
function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

function getConfig() {
  return {
    feishu: {
      appId: requiredEnv('FEISHU_APP_ID'),
      appSecret: requiredEnv('FEISHU_APP_SECRET'),
      appToken: requiredEnv('FEISHU_APP_TOKEN'),
      tableId: requiredEnv('FEISHU_TABLE_ID'),
    },
  };
}

// ===== Feishu Token Cache (module-level, shared across invocations in same serverless instance) =====
let cachedToken = null;
let tokenExpireAt = 0;

async function getTenantAccessToken(config) {
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
    throw new Error(`Failed to get token: code=${data.code}, msg=${data.msg}`);
  }

  cachedToken = data.tenant_access_token;
  tokenExpireAt = Date.now() + data.expire * 1000;
  return cachedToken;
}

async function createBitableRecord(config, fields) {
  const token = await getTenantAccessToken(config);
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
    throw new Error(`Feishu API error: code=${data.code}, msg=${data.msg}`);
  }
  return data.data.record;
}

// ===== Vercel Handler =====
module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Health check
  if (req.method === 'GET') {
    return res.status(200).json({ status: 'ok', time: new Date().toISOString() });
  }

  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const config = getConfig();
    const { name, phone, email, company, type, requirement } = req.body;

    // Validate
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ success: false, message: 'Phone is required' });
    }

    // Map to Feishu fields
    const fields = {
      '姓名': name.trim(),
      '联系电话': phone.trim(),
    };
    if (email && email.trim()) fields['邮箱/微信'] = email.trim();
    if (company && company.trim()) fields['公司名称'] = company.trim();
    if (type && type.length > 0) fields['合作类型'] = type;
    if (requirement && requirement.trim()) fields['需求描述'] = requirement.trim();

    const record = await createBitableRecord(config, fields);

    return res.status(200).json({
      success: true,
      message: 'Inquiry submitted successfully',
      recordId: record.record_id,
    });
  } catch (err) {
    console.error('Inquiry error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to save inquiry. Please try again later.',
    });
  }
};
