-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2014 at 10:40 AM
-- Server version: 5.5.32
-- PHP Version: 5.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `pop`
--
CREATE DATABASE IF NOT EXISTS `pop` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `pop`;

--
-- Dumping data for table `categorys`
--

INSERT INTO `categorys` (`id`, `createdAt`, `updatedAt`, `title`, `count`) VALUES
(0, NULL, NULL, 'test', NULL);

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `color`, `title`, `createdAt`, `updatedAt`, `count`) VALUES
(0, '#f00', 'red', NULL, NULL, NULL),
(0, '#0f0', 'green', NULL, NULL, NULL),
(0, '#00f', 'blue', NULL, NULL, NULL),
(0, '#000', 'black', NULL, NULL, NULL),
(0, '#fff', 'white', NULL, NULL, NULL),
(0, '#aaa', 'gray', NULL, NULL, NULL);

--
-- Dumping data for table `templates`
--

INSERT INTO `templates` (`id`, `createdAt`, `updatedAt`, `title`, `svg`, `price`, `count`) VALUES
(2, '2014-04-22 06:48:10', '2014-04-22 06:48:10', 'axia', 'axia', NULL, NULL),
(3, '2014-04-22 06:48:18', '2014-04-22 06:48:18', 'demo', 'demo', NULL, NULL),
(4, '2014-04-22 06:48:25', '2014-04-22 06:48:25', 'pink', 'pink', NULL, NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
