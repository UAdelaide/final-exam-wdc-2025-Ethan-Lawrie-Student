var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/getListings', function(req, res) {
  req.pool.getConnection(function(error, connection) {
    if(error) {
      res.sendStatus(500);
      return;
    }



    connection.query('SELECT User.fullname, Book.title, Book.author, ListedBook.sell_price FROM ListedBook INNER JOIN ')
  })
});


module.exports = router;
