-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: localhost    Database: TextbookSelling
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Book`
--

DROP TABLE IF EXISTS `Book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Book` (
  `book_id` int NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `author` varchar(50) DEFAULT NULL,
  `ISBN` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Book`
--

LOCK TABLES `Book` WRITE;
/*!40000 ALTER TABLE `Book` DISABLE KEYS */;
INSERT INTO `Book` VALUES (1,'1984','George Orwell','123-456');
/*!40000 ALTER TABLE `Book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListedBook`
--

DROP TABLE IF EXISTS `ListedBook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListedBook` (
  `listing_id` int NOT NULL AUTO_INCREMENT,
  `listing_status` tinyint(1) DEFAULT NULL,
  `seller_id` varchar(50) DEFAULT NULL,
  `book_id` int DEFAULT NULL,
  `sell_price` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`listing_id`),
  KEY `seller_id` (`seller_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `ListedBook_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `User` (`student_id`),
  CONSTRAINT `ListedBook_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `Book` (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListedBook`
--

LOCK TABLES `ListedBook` WRITE;
/*!40000 ALTER TABLE `ListedBook` DISABLE KEYS */;
INSERT INTO `ListedBook` VALUES (1,1,'a1923045',1,20.50),(2,0,'a1923045',1,30.50);
/*!40000 ALTER TABLE `ListedBook` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Message`
--

DROP TABLE IF EXISTS `Message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Message` (
  `message_id` int NOT NULL,
  `potential_buyer_id` varchar(50) DEFAULT NULL,
  `potential_seller_id` varchar(50) DEFAULT NULL,
  `message` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  KEY `potential_buyer_id` (`potential_buyer_id`),
  KEY `potential_seller_id` (`potential_seller_id`),
  CONSTRAINT `Message_ibfk_1` FOREIGN KEY (`potential_buyer_id`) REFERENCES `User` (`student_id`),
  CONSTRAINT `Message_ibfk_2` FOREIGN KEY (`potential_seller_id`) REFERENCES `User` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Message`
--

LOCK TABLES `Message` WRITE;
/*!40000 ALTER TABLE `Message` DISABLE KEYS */;
INSERT INTO `Message` VALUES (1,'a01','a1923045','Hello there, I was wondering if I could buy a book off you, or maybe just keep in contact for the future');
/*!40000 ALTER TABLE `Message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TransactionHistory`
--

DROP TABLE IF EXISTS `TransactionHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TransactionHistory` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `listing_id` int DEFAULT NULL,
  `buyer_id` varchar(50) DEFAULT NULL,
  `transaction_date` datetime DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `buyer_id` (`buyer_id`),
  KEY `listing_id` (`listing_id`),
  CONSTRAINT `TransactionHistory_ibfk_1` FOREIGN KEY (`buyer_id`) REFERENCES `User` (`student_id`),
  CONSTRAINT `TransactionHistory_ibfk_2` FOREIGN KEY (`listing_id`) REFERENCES `ListedBook` (`listing_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TransactionHistory`
--

LOCK TABLES `TransactionHistory` WRITE;
/*!40000 ALTER TABLE `TransactionHistory` DISABLE KEYS */;
INSERT INTO `TransactionHistory` VALUES (1,2,'a01','2025-06-21 02:14:12');
/*!40000 ALTER TABLE `TransactionHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `student_id` varchar(50) NOT NULL,
  `location` varchar(200) DEFAULT NULL,
  `password` varchar(50) NOT NULL,
  `full_name` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('a01','20 test road','test','John Doe'),('a1923045','123 abc street, test suburb','abc','Ethan Lawrie');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-21  2:59:00
