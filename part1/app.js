var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql2/promise');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


let db;

(async () => {
  try {
    // Connect to MySQL without specifying a database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      multipleStatements: true
    });

    // Create the database if it doesn't exist
    await connection.query('DROP DATABASE IF EXISTS DogWalkService; CREATE DATABASE DogWalkService;');

    await connection.end();

    // Now connect to the created database
    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'DogWalkService',
      multipleStatements: true
    });

    // Create a table if it doesn't exist
    await db.query(`
        CREATE TABLE Users (
            user_id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            role ENUM('owner', 'walker') NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE Dogs (
            dog_id INT AUTO_INCREMENT PRIMARY KEY,
            owner_id INT NOT NULL,
            name VARCHAR(50) NOT NULL,
            size ENUM('small', 'medium', 'large') NOT NULL,
            FOREIGN KEY (owner_id) REFERENCES Users(user_id)
        );

        CREATE TABLE WalkRequests (
            request_id INT AUTO_INCREMENT PRIMARY KEY,
            dog_id INT NOT NULL,
            requested_time DATETIME NOT NULL,
            duration_minutes INT NOT NULL,
            location VARCHAR(255) NOT NULL,
            status ENUM('open', 'accepted', 'completed', 'cancelled') DEFAULT 'open',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (dog_id) REFERENCES Dogs(dog_id)
        );

        CREATE TABLE WalkApplications (
            application_id INT AUTO_INCREMENT PRIMARY KEY,
            request_id INT NOT NULL,
            walker_id INT NOT NULL,
            applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
            FOREIGN KEY (request_id) REFERENCES WalkRequests(request_id),
            FOREIGN KEY (walker_id) REFERENCES Users(user_id),
            CONSTRAINT unique_application UNIQUE (request_id, walker_id)
        );

        CREATE TABLE WalkRatings (
            rating_id INT AUTO_INCREMENT PRIMARY KEY,
            request_id INT NOT NULL,
            walker_id INT NOT NULL,
            owner_id INT NOT NULL,
            rating INT CHECK (rating BETWEEN 1 AND 5),
            comments TEXT,
            rated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (request_id) REFERENCES WalkRequests(request_id),
            FOREIGN KEY (walker_id) REFERENCES Users(user_id),
            FOREIGN KEY (owner_id) REFERENCES Users(user_id),
            CONSTRAINT unique_rating_per_walk UNIQUE (request_id)
        );
    `);

    // Insert data if table is empty
    // const [rows] = await db.execute('SELECT COUNT(*) AS count FROM books');
    await db.query(`
        INSERT INTO Users (username, email, password_hash, role) VALUES (
            'alice123', 'alice@example.com', 'hashed123', 'owner'
        );
        INSERT INTO Users (username, email, password_hash, role) VALUES (
            'bobwalker', 'bob@example.com', 'hashed456', 'walker'
        );

        INSERT INTO Users (username, email, password_hash, role) VALUES (
            'carol123', 'carol@example.com', 'hashed789', 'owner'
        );

        INSERT INTO Users (username, email, password_hash, role) VALUES (
            'ethanL', 'ethan@example.com', 'hashed111', 'owner'
        );

        INSERT INTO Users (username, email, password_hash, role) VALUES (
            'jerry', 'jerry@example.com', 'hashedJerry', 'walker'
        );



        INSERT INTO Dogs (owner_id, name, size) (SELECT user_id , 'Max', 'medium' FROM Users WHERE username = 'alice123');



        INSERT INTO Dogs (owner_id, name, size) (SELECT user_id , 'Bella', 'small' FROM Users WHERE username = 'carol123');



        INSERT INTO Dogs (owner_id, name, size) (SELECT user_id , 'EthanJnr', 'small' FROM Users WHERE username = 'ethanL');



        INSERT INTO Dogs (owner_id, name, size) (SELECT user_id , 'Ruff', 'small' FROM Users WHERE username = 'ethanL');


        INSERT INTO Dogs (owner_id, name, size) (SELECT user_id , 'Bluey', 'medium' FROM Users WHERE username = 'ethanL');


        INSERT INTO Dogs (owner_id, name, size) (SELECT user_id , 'Fred', 'large' FROM Users WHERE username = 'alice123');



        INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) (SELECT dog_id, '2025-06-10 08:00:00', 30, 'Parklands', 'open' FROM Dogs WHERE name = 'Max');


        INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) (SELECT dog_id, '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted' FROM Dogs WHERE name = 'Bella');


        INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) (SELECT dog_id, '2025-07-10 10:50:00', 80, 'Hindmarsh Square', 'accepted' FROM Dogs WHERE name = 'EthanJnr');


        INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) (SELECT dog_id, '2025-02-10 07:20:00', 20, 'Adelaide Uni', 'completed' FROM Dogs WHERE name = 'EthanJnr');


        INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) (SELECT dog_id, '2025-06-11 08:35:01', 35, 'Rundle Mall Start', 'open' FROM Dogs WHERE name = 'Fred');

        INSERT INTO WalkRatings (request_id, walker_id, owner_id, rating, comments, rated_at) VALUES (4, 2, 4, 5, 'was a good walk', '2025-06-23 04:06:25');
        INSERT INTO WalkRatings (request_id, walker_id, owner_id, rating, comments, rated_at) VALUES (5, 2, 4, 3, 'was a good walk', '2025-06-23 04:06:25');
        `);

  } catch (err) {
    console.error('Error setting up database. Ensure Mysql is running: service mysql start', err);
  }
})();


app.use(function(req, res, next) {
    req.db = db;
    next();
});

app.use(express.static(path.join(__dirname, 'public')));


const apiRoutes = require('./routes/apis');

app.use('/api', apiRoutes);

app.use('/', indexRouter);
// app.use('/users', usersRouter);

module.exports = app;
