const express = require('express');
const router = express.Router();
const db = require('../models/db');


router.post('/', async (req, res) => {
    const {username, password} = req.body;

  try {
    const [rows] = await db.query(`
      SELECT user_id, role FROM Users WHERE username = ? AND password_hash = ?
    `, [username, password]);

    if(!rows) {
        res.status(404).json({ error: 'No user' });
    }
    const user = rows[0];
    
    req.session.role = user.role;

    if(user.role === "walker") {

    }

  } catch (error) {
    console.error('SQL Error:', error);
    res.status(500).json({ error: 'Failed to fetch walk requests' });
  }
});