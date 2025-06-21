var express = require('express');
var router = express.Router();

router.get('/dogs', async function(req, res) {
  try {
    db.execute(`
      SELECT Dogs.name, Dogs.size, User.username FROM Dogs INNER JOIN Users ON Dogs.owner_id = Users.user_id
    `).then((res) => {
      
    })
  } catch (err) {
    console.error('Error querying', err);
  }
});

module.exports = router;
