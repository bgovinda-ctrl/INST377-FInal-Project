import express from 'express';
import { supabase } from '../supabase/client.js';

const router = express.Router();

// POST /api/subscriptions/subscribe
router.post('/subscribe', async (req, res) => {
  const { email, location, magnitude } = req.body;

  console.log("📩 New subscription request received:");
  console.log("Email:", email);
  console.log("Location:", location);
  console.log("Magnitude threshold:", magnitude);

  if (!email || !location || magnitude == null) {
    return res.status(400).json({ message: "Email, location, and magnitude are required." });
  }

  try {
    // Insert into Supabase
    const { data, error } = await supabase
      .from('subscriptions')  // Make sure table exists and RLS is off
      .insert([{ email, location, magnitude }]);

    // Log Supabase response
    console.log("Supabase insert response:", { data, error });

    if (error) {
      throw error;
    }

    res.json({
      message: "Subscription saved successfully!",
      subscription: data[0] || null
    });

  } catch (err) {
    console.error("❌ Supabase insert error:", err);
    res.status(500).json({
      message: "Failed to save subscription",
      error: err.message
    });
  }
});

export default router;



