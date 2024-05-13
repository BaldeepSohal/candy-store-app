# ************************************************************
# Sequel Ace SQL dump
# Version 20067
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: localhost (MySQL 8.3.0)
# Database: candystore
# Generation Time: 2024-05-13 15:59:53 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table customers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customers`;

CREATE TABLE `customers` (
  `customer_id` int unsigned NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;

INSERT INTO `customers` (`customer_id`, `customer_name`, `created_at`, `updated_at`)
VALUES
	(1,'Mark','2024-05-09 19:02:35','2024-05-09 19:02:35'),
	(2,'Justin','2024-05-09 20:09:51','2024-05-09 20:09:51'),
	(3,'Phil','2024-05-09 22:05:14','2024-05-09 22:05:14'),
	(4,'Tim','2024-05-09 22:08:37','2024-05-09 22:08:37'),
	(5,'Max','2024-05-09 22:09:14','2024-05-09 22:09:14'),
	(25,'Mark','2024-05-13 15:05:56','2024-05-13 15:05:56');

/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table inventory
# ------------------------------------------------------------

DROP TABLE IF EXISTS `inventory`;

CREATE TABLE `inventory` (
  `inventory_id` int unsigned NOT NULL AUTO_INCREMENT,
  `inventory_name` varchar(255) NOT NULL,
  `manufacture_date` date NOT NULL,
  `available_quantity` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`inventory_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;

INSERT INTO `inventory` (`inventory_id`, `inventory_name`, `manufacture_date`, `available_quantity`, `created_at`, `updated_at`)
VALUES
	(1,'SmartiesBoxTruck','2022-01-01',10,'2024-05-10 00:52:48','2024-05-10 00:52:48'),
	(2,'CandyCornRv','2022-01-01',10,'2024-05-11 01:11:30','2024-05-11 01:11:30'),
	(3,'LollipopCycle','2022-01-01',10,'2024-05-11 01:11:50','2024-05-11 01:11:50');

/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table knex_migrations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `knex_migrations`;

CREATE TABLE `knex_migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `knex_migrations` WRITE;
/*!40000 ALTER TABLE `knex_migrations` DISABLE KEYS */;

INSERT INTO `knex_migrations` (`id`, `name`, `batch`, `migration_time`)
VALUES
	(1,'20240509151936_inventory.ts',1,'2024-05-09 14:57:38'),
	(2,'20240509155212_customers.ts',1,'2024-05-09 14:57:38'),
	(3,'20240509182625_store.ts',1,'2024-05-09 14:57:38');

/*!40000 ALTER TABLE `knex_migrations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table knex_migrations_lock
# ------------------------------------------------------------

DROP TABLE IF EXISTS `knex_migrations_lock`;

CREATE TABLE `knex_migrations_lock` (
  `index` int unsigned NOT NULL AUTO_INCREMENT,
  `is_locked` int DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `knex_migrations_lock` WRITE;
/*!40000 ALTER TABLE `knex_migrations_lock` DISABLE KEYS */;

INSERT INTO `knex_migrations_lock` (`index`, `is_locked`)
VALUES
	(1,0);

/*!40000 ALTER TABLE `knex_migrations_lock` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table order
# ------------------------------------------------------------

DROP TABLE IF EXISTS `order`;

CREATE TABLE `order` (
  `order_id` int unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `inventory_id` int NOT NULL,
  `store_id` int NOT NULL,
  `quantity` int NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;

INSERT INTO `order` (`order_id`, `customer_id`, `inventory_id`, `store_id`, `quantity`, `status`, `created_at`, `updated_at`)
VALUES
	(1,1,1,1,7,'received','2024-05-10 02:40:10','2024-05-10 02:40:10'),
	(2,2,1,2,2,'received','2024-05-10 02:40:21','2024-05-10 02:40:21'),
	(3,1,1,1,7,'received','2024-05-11 00:35:56','2024-05-11 00:35:56'),
	(4,1,1,4,2,'processed','2024-05-11 00:36:01','2024-05-11 00:36:01'),
	(5,5,2,5,2,'in progress','2024-05-11 00:36:06','2024-05-11 00:36:06'),
	(6,1,1,5,1,'processed','2024-05-11 00:37:48','2024-05-11 00:37:48'),
	(7,3,3,2,2,'received','2024-05-11 00:42:17','2024-05-11 00:42:17'),
	(8,3,1,1,2,'in progress','2024-05-11 00:46:34','2024-05-11 00:46:34'),
	(9,4,3,1,3,'in progress','2024-05-11 00:59:55','2024-05-11 00:59:55'),
	(10,1,1,3,2,'processed','2024-05-11 01:01:15','2024-05-11 01:01:15');

/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table store
# ------------------------------------------------------------

DROP TABLE IF EXISTS `store`;

CREATE TABLE `store` (
  `store_id` int unsigned NOT NULL AUTO_INCREMENT,
  `store_address` varchar(255) NOT NULL,
  `store_manager_name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;

INSERT INTO `store` (`store_id`, `store_address`, `store_manager_name`, `created_at`, `updated_at`)
VALUES
	(1,'Toronto','Baldeep Kaur','2024-05-10 02:07:16','2024-05-10 02:07:16'),
	(2,'New York','Baldeep Kaur','2024-05-10 02:07:48','2024-05-10 02:07:48'),
	(3,'Montreal','Baldeep Kaur','2024-05-12 01:46:10','2024-05-12 01:46:10'),
	(4,'England','Baldeep Kaur','2024-05-12 01:46:57','2024-05-12 01:46:57'),
	(5,'Vancouver','Baldeep Kaur','2024-05-12 01:47:42','2024-05-12 01:47:42');

/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
