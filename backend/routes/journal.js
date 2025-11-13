const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Journal = require('../models/Journal');
const { getEmotion } = require('../utils/sentiment');

// @route   POST /api/journals
// @desc    Create a new journal entry
router.post('/', auth, async (req, res) => {
  const { content, emotionTag, date } = req.body;
  
  try {
    // 1. Detect emotion from content
    const detectedEmotion = getEmotion(content);

    const newEntry = new Journal({
      user: req.user.id,
      content,
      detectedEmotion,
      emotionTag: emotionTag || null,
      date: date || Date.now(),
    });

    const journal = await newEntry.save();
    res.json(journal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/journals
// @desc    Get all journal entries for a user
router.get('/', auth, async (req, res) => {
  try {
    // Find journals by user, sort by most recent
    const journals = await Journal.find({ user: req.user.id }).sort({ date: -1 });
    res.json(journals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;