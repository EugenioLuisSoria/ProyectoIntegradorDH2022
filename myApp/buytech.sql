-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-05-2022 a las 21:58:25
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

DROP DATABASE IF EXISTS buytech;
CREATE DATABASE buytech;
USE buytech;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `buytech`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `items`
--
DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `items`
--

INSERT INTO `items` (`id`, `product_id`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4), 
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10),
(11, 11),
(12, 12),
(13, 13),
(14, 14),
(15, 15),
(16, 16);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `stock` int(10) UNSIGNED NOT NULL,
  `weight` tinyint(3) UNSIGNED DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `price` int(10) UNSIGNED NOT NULL,
  `discount` tinyint(3) UNSIGNED DEFAULT 0,
  `picture` varchar(255) NOT NULL,
  `product_category_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `stock`, `weight`, `color`, `size`, `price`, `discount`, `picture`, `product_category_id`) VALUES
(1, 'Mouse Inalambrico Logitech M350 Pebble Blue Grey Bluetooth', 'no vas a poder creer lo que hace ', 50, 72, 'black', '12', 1200, 5, 'accesorios_01.jpg', 4),
(2, 'Mouse Inalambrico Logitech M185 Black', 'El mejor de los mejores en su rango y nivel.', 60, 70, 'black', '11', 1150, 5, 'accesorios_02.jpg', 4),
(3, 'Mouse Inalambrico Logitech M185 Black+A36:A41', 'Con un diseño de vanguardia, Il Topo!', 60, 70, 'grey', '11', 1150, 5, 'accesorios_03.jpg', 4),
(4, 'Auriculares Inalámbricos Haylou Gt1 Pro', 'no vas a poder creer lo que escuchas ', 10, 270, 'black', '11', 7500, 5, 'auriculares_01.jpg', 4),
(5, 'Auriculares In Ear JBL T110 Negro', 'Escucha el mundo en HD459plus', 102, 270, 'black', '11', 1500, 5, 'auriculares_02.jpg', 4),
(6, 'Notebook HP Pavilion 15,6” AMD Ryzen 3 8GB 256GB SSD 15-EH0004LA', 'Con un diseño de vanguardia, renocado', 9, 228, 'Verde', 'XL', 254999, 0, 'notebook_hp_02.jpg', 1),
(7, 'Notebook HP Gamer Pavilion AMD Ryzen 5 8GB 256 GB SSD 15-ec1035la', 'no vas a poder creer lo que hace ', 9, 228, 'black', 'XSL', 254999, 0, 'notebook_hp_03.jpg', 1),
(8, 'Notebook HP 14-dk1016la AMD Athlon Silver 3050U 4GB 256GB SSD 14"', 'la mejor lapto, hecha por y para uno', 19, 228, 'black', 'XSL', 354999, 0, 'notebook_hp_04.jpg', 1),
(9, 'Celular Motorola E20 32GB Azul', 'the best of the best, cell by cell', 91, 228, 'blue', 'XSL', 150214, 0, 'smartphone_motorola_05.jpg', 2),
(10, 'Celular Motorola E40 64 GB Rosa', 'recuerdos de un futuro que está llegando', 25, 518, 'pink', 'GXSL', 100000, 0, 'smartphone_motorola_06.jpg', 2),
(11, 'Celular Motorola G51 128GB Azul Tornasol', 'describirlo es limitarlo; nacido para correr', 9, 228, 'blue', 'XSL', 99570, 0, 'smartphone_motorola_07.jpg', 2),
(12, 'Celular Samsung Galaxy S20FE 128 GB Azul', 'Ni Lorem ipsum supo que hacer', 109, 228, 'blue', 'XsdfSL', 45000, 0, 'smartphone_samsung_01.jpg', 2),
(13, 'Tablet Amazon 8" 32GB Fire HD con Alexa Plum', 'Con un diseño de vanguardia, la tabla del futuro ', 9, 228, 'red', '77.9 x 163.3 x 8.9mm', 120000, 0, 'tablet_amazon_06.jpg', 3),
(14, 'Tablet Samsung Galaxy Tab A7 Silver', 'Vanguardia y futuro al alcance del tacto ', 15, 228, 'grey', '77.9 x 163.3 x 8.9mm', 150000, 0, 'tablet_samsung_01.jpg', 3),
(15, 'Tablet Samsung S7 FE SMT733 128GB 6GB Negro', 'Innovación al y rendimiento, son la meta', 1, 228, 'black', '77.9 x 163.3 x 8.9mm', 57500, 0, 'tablet_samsung_02.jpg', 3),
(16, 'Tablet Samsung Galaxy A7 Lite 32/3GB Silver', 'Una nube tactil de ingenio y ligereza', 753, 228, 'gray', '77.9 x 163.3 x 8.9mm', 55000, 0, 'tablet_samsung_03.jpg', 3);


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_categories`
--
DROP TABLE IF EXISTS `product_categories`;
CREATE TABLE `product_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `product_categories`
--

INSERT INTO `product_categories` (`id`, `type`) VALUES
(1, 'laptops'),
(2, 'smartphones'),
(3, 'tablets'),
(4, 'accesories');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `user_category_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `avatar`, `user_category_id`) VALUES
(1, 'Admin', 'Admin', 'admin@admin.com', '$2b$10$6U6ZeFLhiEB5/maFnor4HuHuRK0n7WMBd67XeI.3yhSIsdIdL3O2O', 'user-solid.svg', 2),
(2, 'Timmie', 'Twyford', 'email2@example.com', '$2b$10$6U6ZeFLhiEB5/maFnor4HuHuRK0n7WMBd67XeI.3yhSIsdIdL3O2O', 'user-solid.svg', 1),
(3, 'Emmalynne', 'Videneev', 'email3@example.com', '$2b$10$6U6ZeFLhiEB5/maFnor4HuHuRK0n7WMBd67XeI.3yhSIsdIdL3O2O', 'user-solid.svg', 1),
(4, 'Agretha', 'Bindon', 'email4@example.com', '$2b$10$6U6ZeFLhiEB5/maFnor4HuHuRK0n7WMBd67XeI.3yhSIsdIdL3O2O', 'user-solid.svg', 1),
(5, 'Jo ann', 'Belin', 'email5@example.com', '$2b$10$6U6ZeFLhiEB5/maFnor4HuHuRK0n7WMBd67XeI.3yhSIsdIdL3O2O', 'user-solid.svg', 1),
(6, 'Hedwiga', 'Rawlison', 'email6@example.com', '$2b$10$6U6ZeFLhiEB5/maFnor4HuHuRK0n7WMBd67XeI.3yhSIsdIdL3O2O', 'user-solid.svg', 1),
(7, 'Lorilyn', 'Badrick', 'email7@example.com', '$2b$10$6U6ZeFLhiEB5/maFnor4HuHuRK0n7WMBd67XeI.3yhSIsdIdL3O2O', 'user-solid.svg', 1),
(8, 'Sherlocke', 'Druitt', 'email8@example.com', '$2b$10$6U6ZeFLhiEB5/maFnor4HuHuRK0n7WMBd67XeI.3yhSIsdIdL3O2O', 'user-solid.svg', 1),
(9, 'Gaby', 'Inett', 'email9@example.com', '$2b$10$6U6ZeFLhiEB5/maFnor4HuHuRK0n7WMBd67XeI.3yhSIsdIdL3O2O', 'user-solid.svg', 1),
(10, 'Lidia', 'Forbear', 'email10@example.com', '$2b$10$6U6ZeFLhiEB5/maFnor4HuHuRK0n7WMBd67XeI.3yhSIsdIdL3O2O', 'user-solid.svg', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_items`
--
DROP TABLE IF EXISTS `users_items`;
CREATE TABLE `users_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `item_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users_items`
--

INSERT INTO `users_items` (`id`, `user_id`, `item_id`) VALUES
(1, 2, 1),
(2, 2, 5),
(3, 2, 3),
(4, 2, 2),
(5, 2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_categories`
--
DROP TABLE IF EXISTS `user_categories`;
CREATE TABLE `user_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'customer'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user_categories`
--

INSERT INTO `user_categories` (`id`, `type`) VALUES
(1, '0'),
(2, '1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users_items`
--
ALTER TABLE `users_items`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_categories`
--
ALTER TABLE `user_categories`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `items`
--
ALTER TABLE `items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `users_items`
--
ALTER TABLE `users_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `user_categories`
--
ALTER TABLE `user_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

ALTER TABLE `users_items` ADD CONSTRAINT `eliminarXItem` FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE; ALTER TABLE `users_items` ADD CONSTRAINT `eliminarXUser` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
