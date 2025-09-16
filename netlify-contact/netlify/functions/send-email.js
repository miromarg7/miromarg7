const nodemailer = require('nodemailer');

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let data;
  try { data = JSON.parse(event.body); }
  catch { return { statusCode: 400, body: 'Invalid JSON' }; }

  const { name, email, message } = data;

  // Вставь сюда свои данные
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: 'miromarg7@gmail.com',
      pass: 'xewizorcvgrbdbor',
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Form" <miromarg7@gmail.com>`, // можно такой же, как MAIL_USER
      to: 'miromarg7@gmail.com',                       // куда придёт письмо
      subject: 'New contact form submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    });

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('sendMail error:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};
