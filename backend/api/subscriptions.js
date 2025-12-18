// backend/api/subscriptions/subscribe.js
import { supabase } from '../../../supabase/client.js'; // adjust path if needed

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Parse JSON body
    const body = await new Promise((resolve, reject) => {
      let data = '';
      req.on('data', chunk => data += chunk);
      req.on('end', () => resolve(JSON.parse(data)));
      req.on('error', err => reject(err));
    });

    const { email, location, magnitude } = body;

    if (!email || !location || magnitude == null) {
      return res.status(400).json({ message: 'Email, location, and magnitude are required.' });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('subscriptions')
      .insert([{ email, location, magnitude }]);

    if (error) {
      throw error;
    }

    res.status(200).json({
      message: 'Subscription saved successfully!',
      subscription: data[0] || null
    });

  } catch (err) {
    console.error('❌ Supabase insert error:', err);
    res.status(500).json({
      message: 'Failed to save subscription',
      error: err.message
    });
  }
}
