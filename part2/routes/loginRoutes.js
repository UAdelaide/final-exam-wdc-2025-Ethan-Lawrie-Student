const express = require('express');
const router = express.Router();
const db = require('../models/db');


router.post('/', async (req, res) => {
    const {username, password} = req.body;

  try {
    const [rows] = await db.query(`
      SELECT user_id, role FROM Users WHERE
    `);
    if(!rows) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
    const user = rows[0];

  } catch (error) {
    console.error('SQL Error:', error);
    res.status(500).json({ error: 'Failed to fetch walk requests' });
  }
});