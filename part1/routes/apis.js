var express = require('express');
var router = express.Router();

router.get('/dogs', async function(req, res) {
  try {
    req.db.execute(`
      SELECT Dogs.name, Dogs.size, Users.username FROM Dogs INNER JOIN Users ON Dogs.owner_id = Users.user_id
    `).then((result) => {
      res.json(result);
    })
  } catch (err) {
    console.error('Error querying', err);
  }
});

module.exports = router;
