var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/getListings', function(req, res) {
  req.pool.getConnection(function(error, connection) {
    if(error) {
      res.status(500).send("Error connecting ");
      return;
    }



    connection.query('SELECT User.full_name, Book.title, Book.author, ListedBook.sell_price FROM ListedBook INNER JOIN Book ON ListedBook.book_id = Book.book_id INNER JOIN User ON ListedBook.seller_id = User.student_id WHERE ListedBook.listing_status = TRUE', function(errror2, rows) {
      if(error) {
          res.status(500).send("Error querying");
        return;
      }
      res.json(rows);
    });
  })
});


module.exports = router;
