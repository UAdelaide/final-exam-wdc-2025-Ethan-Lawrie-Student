var express = require('express');
var router = express.Router();

router.get('/dogs', async function(req, res) {
  try {
    await db.execute(`
      SELECT name, size, 
    `);
  } catch (err) {
    console.error('Error querying', err);
  }
});

module.exports = router;
