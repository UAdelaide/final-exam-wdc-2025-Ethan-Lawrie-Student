const express = require('express');
const router = express.Router();
const db = require('../models/db');


router.post('/', async (req, res) => {
    const {username, password} = req.body;

  try {
    await db.query(`
      SELECT 
    `);
  } catch (error) {
    console.error('SQL Error:', error);
    res.status(500).json({ error: 'Failed to fetch walk requests' });
  }
});