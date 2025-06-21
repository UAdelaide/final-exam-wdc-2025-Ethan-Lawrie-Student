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



    connection.query('SELECT User.full_name, User.student_id, Book.title, Book.author, ListedBook.listing_id, ListedBook.sell_price FROM ListedBook INNER JOIN Book ON ListedBook.book_id = Book.book_id INNER JOIN User ON ListedBook.seller_id = User.student_id WHERE ListedBook.listing_status = TRUE', function(error2, rows) {
      if(error2) {
          res.status(500).send("Error querying");
        return;
      }
      res.json(rows);
    });
  })
});




router.post('/sendMessage', function(req, res) {

  const {buyer_id, seller_id, message} = req.body;

  req.pool.getConnection(function(error, connection) {
    if(error) {
      res.status(500).send("Error connecting ");
      return;
    }

    connection.query('INSERT INTO Message (potential_buyer_id, potential_seller_id, message), (?,?,?)', [buyer_id,seller_id, message.trim()], function(error2, rows) {
      if(error2) {
          res.status(500).send("Error querying");
        return;
      }
      res.sendStatus(200);
    });
  })
});


module.exports = router;
