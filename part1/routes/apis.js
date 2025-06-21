var express = require('express');
var router = express.Router();

router.get('/dogs', async function(req, res) {
  try {
    await db.execute(`
      SELECT Dog.name, Dog.size, User.username FROM 
    `);
  } catch (err) {
    console.error('Error querying', err);
  }
});

module.exports = router;
