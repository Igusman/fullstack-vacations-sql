-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 10, 2024 at 02:03 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations_store`
--
CREATE DATABASE IF NOT EXISTS `vacations_store` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `vacations_store`;

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `userId` varchar(40) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `follows`
--

INSERT INTO `follows` (`userId`, `vacationId`) VALUES
('72579452-e97f-11ee-9cec-2c3b70b07622', 1),
('72579452-e97f-11ee-9cec-2c3b70b07622', 2),
('1511b25a-10c4-11ef-8ad3-2c3b70b07622', 1),
('1511b25a-10c4-11ef-8ad3-2c3b70b07622', 26),
('e4e1a35c-19e7-4f6d-8fdc-d072d16f2739', 1),
('e4e1a35c-19e7-4f6d-8fdc-d072d16f2739', 41),
('6806e21b-83f7-4faa-a35d-78d0d5272fc1', 36),
('e4e1a35c-19e7-4f6d-8fdc-d072d16f2739', 37),
('e4e1a35c-19e7-4f6d-8fdc-d072d16f2739', 18),
('e4e1a35c-19e7-4f6d-8fdc-d072d16f2739', 36),
('e4e1a35c-19e7-4f6d-8fdc-d072d16f2739', 42);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` varchar(36) NOT NULL DEFAULT uuid(),
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role` varchar(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
('0ce81f27-afcb-4039-870b-24f0c104034f', 'string', 'string', 'ig018@gmail.com', 'e71bb5a80ddcfc6e18b087db3fac1b5e40d2de791947ab8cf884b19de11e09c1', 'admin'),
('1511b25a-10c4-11ef-8ad3-2c3b70b07622', 'dudu', 'ahron', 'ahronD@gmail.com', '12345', 'user'),
('24424b89-90a3-4a95-9eb1-9066fb8515df', 'qqq', 'qqqq', 'qwer@gmail.com', 'e71bb5a80ddcfc6e18b087db3fac1b5e40d2de791947ab8cf884b19de11e09c1', 'user'),
('563bfd25-fdab-4ac2-b9ea-c788847e72b9', 'qwq', 'qwq', 'qwe@gmail.com', '9d62984eaafd5fcba6e2e5ff69fe5b327a6b7c92cd90b1ab4a1d37f8e9dec69e', 'admin'),
('6806e21b-83f7-4faa-a35d-78d0d5272fc1', 'qweq', 'ewqq', 'qwe11@gmail.com', '9d62984eaafd5fcba6e2e5ff69fe5b327a6b7c92cd90b1ab4a1d37f8e9dec69e', 'user'),
('72579452-e97f-11ee-9cec-2c3b70b07622', 'israel', 'gusman', 'igusman018@gmail.com', '12345', 'admin'),
('c395caea-8173-4591-87e0-bb973b324a65', 'string2', 'string2', 'ig2018@gmail.com', 'e71bb5a80ddcfc6e18b087db3fac1b5e40d2de791947ab8cf884b19de11e09c1', 'user'),
('cd4dd2f4-ab37-44df-bc5a-333e59d812a1', 'asaf2', 'asaf2', 'asaf2@gmail.com', 'e71bb5a80ddcfc6e18b087db3fac1b5e40d2de791947ab8cf884b19de11e09c1', 'user'),
('d922a212-30b1-4731-ae6e-7b4c6811576d', 'blab', 'blab', 'bla1@gmail.com', '9d62984eaafd5fcba6e2e5ff69fe5b327a6b7c92cd90b1ab4a1d37f8e9dec69e', 'user'),
('da2f2655-5986-441c-aa58-920191425e43', 'asdasd', 'asdd', 'asaf3@gmail.com', 'e71bb5a80ddcfc6e18b087db3fac1b5e40d2de791947ab8cf884b19de11e09c1', 'user'),
('e4e1a35c-19e7-4f6d-8fdc-d072d16f2739', 'asaf', 'asaf', 'asaf@gmail.com', 'e71bb5a80ddcfc6e18b087db3fac1b5e40d2de791947ab8cf884b19de11e09c1', 'user'),
('e96f0fac-fd51-4147-bb28-0602972eae99', '', '', '', '6bb99cc55958d4880e937d7b9469252d2c5d9f9d0002205e8696fbf3323f8379', 'user'),
('fcdf0807-9839-404e-920b-dc6609a38054', 'string', 'string', 'igus@gmail.com', 'e282e5e9e8069cc032114050df4930853d38f030616f0656e0e6793b2c0b964e', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(40) NOT NULL,
  `description` varchar(200) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `image`) VALUES
(1, 'israel', '1234', '2024-06-07', '2024-06-14', 1111, '3c3c7d16-4896-42a9-bcef-7455af509283.jpg'),
(2, 'eilat', 'city of sea', '2024-06-07', '2024-06-14', 1555, '176c1a25-c457-4a51-8333-cbb4d1ba455a.jpg'),
(15, 'Prague', ' Lying at the heart of Europe', '2024-06-14', '2024-06-21', 1255, 'bd2a14b1-a570-4712-bf17-1b62b032b326.jpg'),
(18, 'spiti valley', 'ski site', '2024-06-05', '2024-06-26', 1234, '90661598-13b8-449d-a2d7-69b40e9fb4ce.jpg'),
(19, 'paris', 'city of lights', '2024-06-09', '2024-06-16', 2997, 'a575eb18-a22f-4c51-8844-babae049b23b.jpg'),
(21, 'Coonoor, Tamil Nadu', 'ski site', '2024-12-22', '2025-12-22', 1234, '4043d5e6-9050-414c-a8cd-6164e3ce5e04.jpg'),
(25, 'russia', 'is super is man', '2024-06-20', '0000-00-00', 1111, '9b5b0b7e-2797-4d51-8120-e1644a246ba3.jpg'),
(26, 'miami', 'is super is man', '2024-06-19', '0000-00-00', 1111, '3ca00b9f-7120-46f1-8bff-352755c1e98b.jpg'),
(27, 'haifa', 'ski site', '2024-06-11', '0000-00-00', 1234, 'a0465354-86ea-401c-9122-c6a0065aa571.jpg'),
(28, 'Tel Aviv', 'land of p', '2024-06-21', '0000-00-00', 1234, '44d6281d-eaf9-406d-8360-bc8f021dade5.jpg'),
(36, 'china', 'land of rice', '2024-05-04', '2024-06-05', 1234, '51d46a0b-e82d-48fb-873f-4716d9b32e39.jpg'),
(37, 'spain', 'matadors', '1111-11-11', '2222-02-22', 1456, 'b53f17cb-ec26-400c-b9c1-b52c8a8783c4.jpg'),
(38, 'india', 'land of indians', '2024-06-21', '2024-06-26', 1111, 'ec06c224-64d5-485f-a89f-31c77d404bf7.jpg'),
(41, 'portugal', 'winee', '2005-05-04', '2006-06-05', 1111, 'cfcbfa08-1e07-4d5a-8636-21bc6a171df3.jpg'),
(42, 'Albania', 'landd', '2024-06-04', '2024-06-18', 1111, '30dc50bd-a7af-43b6-862d-58aea3b5b244.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD KEY `userId` (`userId`),
  ADD KEY `vactionId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`),
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
