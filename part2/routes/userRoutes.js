const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET all users (for admin/testing)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT user_id, username, email, role FROM Users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});


router.get('/getAllDogs', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT Dogs.dog_id, Dogs.name FROM Dogs INNER JOIN Users ON Dogs.owner_id = Users.user_id WHERE Dogs.owner_id = ?', [req.session.user_id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});


router.get('/dogs', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Dogs');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});





// POST a new user (simple signup)
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const [result] = await db.query(`
      INSERT INTO Users (username, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `, [username, email, password, role]);

    res.status(201).json({ message: 'User registered', user_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.get('/me', (req, res) => {
  if (!req.session.user_id) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  // console.log("sending: ",)
  res.json({user_id:req.session.user_id});
});

// POST login (dummy version)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query(`
      SELECT user_id, username, role FROM Users
      WHERE username = ? AND password_hash = ?
    `, [username, password]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.session.user_id = rows[0].user_id;

    res.json({ message: 'Login successful', user: rows[0] });
  } catch (error) {
    console.log("Not working: ", username, ", ", password);
    res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/logout', async (req, res) => {

  req.session.destroy((error) => {
    if(error) {
      return res.status(500).json({error:"logout error"});
    }
    res.clearCookie('connect.sid');

    return res.json({message:"logged out"});
  });


});

module.exports = router;