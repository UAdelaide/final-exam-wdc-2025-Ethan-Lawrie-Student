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
      SELECT WalkRequests.request_id, Dogs.name AS 'dog_name', WalkRequests.requested_time, WalkRequests.duration_minutes, WalkRequests.location, Users.username AS 'owner_username' FROM WalkRequests INNER JOIN Dogs ON WalkRequests.dog_id = Dogs.dog_id INNER JOIN Users ON Dogs.owner_id = Users.user_id WHERE WalkRequests.status = 'open'
    `).then((result) => {
      res.json(result);
    })
  } catch (err) {
    console.error('Error querying', err);
  }
});


router.get('/walkers/summary', async function(req, res) {
  try {
    req.db.execute(`
      SELECT Users.username AS 'walker_username', COUNT(*) AS 'total_ratings', AVG(WalkRatings.rating) AS average_rating, COUNT(WalkRequests.status = ')
    `).then((result) => {
      res.json(result);
    })
  } catch (err) {
    console.error('Error querying', err);
  }
});


module.exports = router;
