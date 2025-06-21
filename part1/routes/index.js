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



    connection.query('SELECT User.fullname, Book.title, Book.author, ListedBook.sell_price FROM ListedBook INNER JOIN Book ON ListedBook.book_id = Book.book_id INNER JOIN User ON ListedBook.seller_id = User.student_id WHERE ListedBook.listing_status = TRUE');
  })
});


module.exports = router;
