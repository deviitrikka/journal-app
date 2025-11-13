const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Journal = require('../models/Journal');

// @route   GET /api/analytics/trends
// @desc    Get emotion trends for the logged-in user
router.get('/trends', auth, async (req, res) => {
  try {
    // 1. Get filter query params (e.g., /trends?filter=month)
    const { filter } = req.query;
    let dateFilter = {};

    if (filter === 'month') {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      dateFilter = { date: { $gte: startOfMonth } };
    } else if (filter === 'week') {
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - 7);
      startOfWeek.setHours(0, 0, 0, 0);
      dateFilter = { date: { $gte: startOfWeek } };
    }
    // Default: 'all' (no date filter)

    // 2. Build the aggregation pipeline
    const emotionCounts = await Journal.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
          ...dateFilter, // Apply date filter
        },
      },
      {
        $group: {
          _id: '$detectedEmotion', // Group by the emotion
          count: { $sum: 1 },    // Count occurrences
        },
      },
      {
        $project: {
          _id: 0,                 // Remove the default _id field
          emotion: '$_id',        // Rename _id to 'emotion'
          count: '$count',
        },
      },
    ]);

    res.json(emotionCounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;