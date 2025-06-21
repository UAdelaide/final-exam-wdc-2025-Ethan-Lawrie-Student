var express = require('express');
var router = express.Router();

router.get('/dogs', async function(req, res) {
  try {
    req.db.execute(`
      SELECT Dogs.name, Dogs.size, Users.username AS 'owner_username' FROM Dogs INNER JOIN Users ON Dogs.owner_id = Users.user_id
    `).then((result) => {
      res.json(result);
    })
  } catch (err) {
    console.error('Error querying', err);
  }
});





router.get('/walkrequests/open', async function(req, res) {
  try {
    req.db.execute(`
      SELECT WalkRequests.request_id, Dogs.name AS 'dog_name', WalkRequests.requested_time, WalkRequests.duration_minutes, WalkRequests.location, Users.username AS 'owner_username' FROM WalkRequests INNER JOIN Dog ON WalkRequests.dog_id = Dog.dog_id INNER JOIN Users ON Users ON Dogs.owner_id = Users.user_id WHERE WalkRequests.
    `).then((result) => {
      res.json(result);
    })
  } catch (err) {
    console.error('Error querying', err);
  }
});


module.exports = router;
