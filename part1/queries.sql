INSERT INTO Users (username, email, password_hash, role) VALUES (
    "alice123", "alice@example.com", "hashed123", 'owner'
);
INSERT INTO Users (username, email, password_hash, role) VALUES (
    "bobwalker", "bob@example.com", "hashed456", 'walker'
);

INSERT INTO Users (username, email, password_hash, role) VALUES (
    "carol123", "carol@example.com", "hashed789", 'owner'
);

INSERT INTO Users (username, email, password_hash, role) VALUES (
    "ethanL", "ethan@example.com", "hashed111", 'owner'
);

INSERT INTO Users (username, email, password_hash, role) VALUES (
    "jerry", "jerry@example.com", "hashedJerry", 'walker'
);



INSERT INTO Dogs (owner_id, name, size) (SELECT user_id , "Max", 'medium' FROM Users WHERE username = "alice123");



INSERT INTO Dogs (owner_id, name, size) (SELECT user_id , "Bella", 'small' FROM Users WHERE username = "carol123");



INSERT INTO Dogs (owner_id, name, size) (SELECT user_id , "EthanJnr", 'small' FROM Users WHERE username = "ethanL");



INSERT INTO Dogs (owner_id, name, size) (SELECT user_id , "Ruff", 'small' FROM Users WHERE username = "ethanL");


INSERT INTO Dogs (owner_id, name, size) (SELECT user_id , "Bluey", 'medium' FROM Users WHERE username = "ethanL");


INSERT INTO Dogs (owner_id, name, size) (SELECT user_id , "Fred", 'large' FROM Users WHERE username = "alice123");



INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) (SELECT dog_id, '2025-06-10 08:00:00', 30, 'Parklands', 'open' FROM Dogs WHERE name = 'Max');


INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) (SELECT dog_id, '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted' FROM Dogs WHERE name = 'Bella');


INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) (SELECT dog_id, '2025-07-10 10:50:00', 80, 'Hindmarsh Square', 'accepted' FROM Dogs WHERE name = 'EthanJnr');


INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) (SELECT dog_id, '2025-02-10 07:20:00', 20, 'Adelaide Uni', 'completed' FROM Dogs WHERE name = 'EthanJnr');


INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) (SELECT dog_id, '2025-06-11 08:35:01', 35, 'Rundle Mall Start', 'open' FROM Dogs WHERE name = 'Fred');