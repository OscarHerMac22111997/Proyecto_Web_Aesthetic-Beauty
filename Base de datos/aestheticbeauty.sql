-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-06-2022 a las 23:58:33
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `aestheticbeauty`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colors`
--

CREATE TABLE `colors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_style` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `colors`
--

INSERT INTO `colors` (`id`, `name`, `url`, `id_style`) VALUES
(1, 'earth color makeup', 'zakeByBsvwcJEtCb.jpg', 1),
(2, 'Honey-colored Californian highlights', '6BdGKlxAcFSQUkGc.jpg', 17),
(3, 'ash blonde balayage', 'fxr9UgaGR7vg3rFb.jpg', 18),
(6, 'pastel nails', 'sXretBQ24eV8Mogq.jpg', 19),
(7, 'nude color nails', 'WLrzZ5ghcOpXCug3.jpg', 20),
(8, 'pastel nails', 'xszuJJuyG2eBfRkt.jpg', 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dates`
--

CREATE TABLE `dates` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_service` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  `id_shop` int(11) NOT NULL,
  `id_stylist` int(11) NOT NULL,
  `date` date NOT NULL,
  `hour` time NOT NULL,
  `fulldate` datetime NOT NULL,
  `opinion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `total` decimal(8,2) DEFAULT NULL,
  `payed` tinyint(1) NOT NULL,
  `ok` tinyint(1) NOT NULL,
  `id_style` int(11) NOT NULL,
  `id_color` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `dates`
--

INSERT INTO `dates` (`id`, `id_service`, `id_client`, `id_shop`, `id_stylist`, `date`, `hour`, `fulldate`, `opinion`, `rating`, `total`, `payed`, `ok`, `id_style`, `id_color`) VALUES
(2, 11, 15, 3, 25, '2022-06-10', '11:30:00', '2022-06-10 11:30:00', NULL, NULL, NULL, 0, 1, 11, 5),
(7, 15, 15, 3, 25, '2022-06-17', '15:00:00', '2022-06-17 15:00:00', NULL, NULL, NULL, 0, 0, 20, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2020_08_19_000000_create_colors_table', 1),
(5, '2020_08_19_000000_create_stylist_table', 1),
(6, '2020_08_19_000000_create_tickets_table', 1),
(7, '2022_10_11_100000_create_services_table', 1),
(8, '2022_11_09_100000_create_dates_table', 1),
(9, '2022_11_09_100000_create_shops_table', 1),
(10, '2022_11_09_100000_create_styles_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `services`
--

CREATE TABLE `services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `services`
--

INSERT INTO `services` (`id`, `name`, `description`, `url`) VALUES
(1, 'hairstyle', 'The way people style their hair is known as hairstyle.', 'PHU7DKXCD9QwQg0P.jpg'),
(7, 'make-up', 'Makeup is the practice of decorating the skin and other visible parts of the body to enhance or enhance their appearance.', 'GGZn9XuiBv5Vuw7G.jpg'),
(8, 'haircut', 'A haircut describes the shortening or changing of the hairstyle of the hair.', 'stUvKADuA0ZWJn9i.jpg'),
(10, 'straightened', 'Permanent straightening is a professional styling method that modifies the hair structure making it totally straight.', 'SoAK3OdgEH6O7OFM.jpg'),
(12, 'eyelash curling', 'With the eyelash curling service, we will give your eyelashes a natural curve thanks to special rollers of different thickness.', 'cknsaUBWE89NHE7d.jpg'),
(13, 'lifting', 'The eyelash lifting consists of lifting them and blackening them.', 'IoZjqCeJRROxZOQ1.jpg'),
(14, 'permanent', 'The perm is a chemical treatment that allows the proteins of the hair to be altered in order to form waves or curls in it, adding volume and changing the appearance of our hair.', 'PUiPn6RiCZRhGfDT.jpg'),
(15, 'niles', 'False nails, whether acrylic or gel, are often used by celebrities to add a sophisticated look to their hands.', '4VDVKKsNJK3JkMuk.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shops`
--

CREATE TABLE `shops` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `street` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `colony` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `shops`
--

INSERT INTO `shops` (`id`, `name`, `street`, `number`, `colony`, `state`, `url`) VALUES
(1, 'NICE Nails and Makeup', 'AQUILES SERDAN', '409', 'COL. SAN PABLO', 'Aguascalientes', '6wqyanqokFyebHbJ.jpg'),
(2, 'mclashartist', 'Fuente de las Cibeles', '516', 'Fuentes de la Asunción', 'Aguascalientes', 'd8iub9pliIZjNJvA.jpg'),
(3, 'Natasha Chirkina Studio', 'Av. Convención sur 1914,', '1108 interior G', 'Fracc. Jardines de la Asunción', 'Aguascalientes', '6BEf8xtP1bS8QQCi.jpg'),
(4, 'Baltazar living room', 'Av. Convencion Sur', '1108 G', 'Jardines de la Asucion', 'Aguascalientes', 'wywOvG3hOtOlu7vW.jpg'),
(5, 'Rouge Makeup living room', 'Roma Esq Fátima', '#101 local 4', 'Del Valle 1era secc', 'Aguascalientes', 'Poh6WJ8u4e9Rqm0s.jpg'),
(6, 'Esthetic Mony', 'Primavera', '311', 'Barrio de San Marcos', 'Aguascalientes', '8rnp3sCv0m1qlUxO.jpg'),
(7, 'Esthetic  libra', 'Ponciano Arriaga', '613', 'Col. Altavista', 'Aguascalientes', 'b3qpHIG3walPe781.jpg'),
(8, 'Bella studio', 'Sierra Morena', '401 Int 2', 'Plaza San Julián', 'Aguascalientes', 'rr6FtBBjQ2L8Oky4.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `styles`
--

CREATE TABLE `styles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cost` decimal(8,2) NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `genre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_service` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `styles`
--

INSERT INTO `styles` (`id`, `name`, `cost`, `url`, `genre`, `id_service`) VALUES
(1, 'Bride\'s makeup', '400.00', 'f7N5ILCkm8JFlNBu.jpg', '2', 7),
(2, 'graduation makeup', '350.00', 'DyoIjhjM48207XVq.jpg', '2', 7),
(3, 'loose hairstyle', '200.00', 'lTWyBEUMaiFTWrsy.jpg', '2', 1),
(4, 'Hair collected', '250.00', 'QDNDUYbIkF55ZbK1.jpg', '2', 1),
(5, 'punk cut', '50.00', 'J2yJ6ST2BwgzNfFS.jpg', '3', 8),
(6, 'Fade cut', '50.00', 'dqw8MbKNZK3ywsxs.jpg', '1', 8),
(8, 'Babylights highlights', '200.00', 'eGk5pDKs08LEW8MJ.jpg', '3', 9),
(9, 'Organic Brazilian Straightening', '600.00', 'Tz1QCJTDYZanYBmh.jpg', '3', 10),
(10, 'Acrylic', '150.00', 'ssgXs4ITOaIeyQeB.jpg', '3', 11),
(11, 'Gelish', '200.00', '8RVZ2QiLyb0SY2KR.jpg', '3', 11),
(12, 'Capillary Botox, aged hair', '700.00', 'E5XVpPpQqwXnds49.jpg', '3', 10),
(13, 'eyelash perm', '250.00', 'Ebf915jG8NcY1MIU.jpg', '3', 12),
(14, 'Lifting', '300.00', '7OtYyWodAmQXeYBj.jpg', '3', 13),
(15, 'Direct Perm', '400.00', '0YvUjdfr6eCNn9dX.jpg', '3', 14),
(16, 'spiral perm', '400.00', 'ds3zAi4TRullPkdc.jpg', '3', 14),
(17, 'Californian', '300.00', 'mtXVQS5K6f4nomaC.jpg', '3', 9),
(18, 'Balayage', '200.00', 'XYuNdiHG8zo4xSFt.jpg', '3', 9),
(19, 'Acrylic', '150.00', 'jXgdtNXyt2uDQGE7.jpg', '3', 15),
(20, 'Gelish', '200.00', '6jb3Vjdl1YZ3audo.jpg', '3', 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stylist`
--

CREATE TABLE `stylist` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `genre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `initialDate` date NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_shop` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tickets`
--

CREATE TABLE `tickets` (
  `number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_date` int(11) NOT NULL,
  `id_service` int(11) NOT NULL,
  `id_style` int(11) NOT NULL,
  `id_color` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `genre` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `fullaccess` enum('yes','no','soso') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `regday` date DEFAULT NULL,
  `id_shop` int(11) DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `genre`, `phone`, `birthdate`, `fullaccess`, `email`, `email_verified_at`, `password`, `url`, `regday`, `id_shop`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Oscar Eduardo Hernández Macías', NULL, NULL, NULL, 'yes', 'sagitario_97-oehm@hotmail.com', NULL, '$2y$10$Dg1OaIm1IvABYJHYaj0U7uwgCYMEYbBXKpjmXcBsYbmFtNh9/ogMe', NULL, NULL, NULL, NULL, '2022-05-24 04:37:23', '2022-05-24 04:37:23'),
(15, 'Sandra Luz Muñoz', NULL, NULL, NULL, 'no', 'sandraluz@gmail.com', NULL, '$2y$10$B2lom7mBbniRbdMf5WMls.wGvLqrCAJey628xYIWGkhbnIM8r7edq', NULL, NULL, NULL, NULL, '2022-05-26 06:31:36', '2022-05-26 06:31:36'),
(23, 'Arlette Beas', '2', '4492624713', NULL, 'soso', 'abeasmua@gmail.com', NULL, '$2y$10$VjiA2HlZhlMN2ilHwlOHouyKSZWdf6A6kxFLFAdz29SxKyAoR3C6m', 'XP5NBoB6IWWvO0ap.jpg', NULL, 1, NULL, '2022-05-26 06:50:16', '2022-06-02 10:00:22'),
(25, 'Helena Montiel', '2', '4491100216', NULL, 'soso', 'helenamontielmaquillaje@gmail.com', NULL, '$2y$10$9DVmJisl69PyG6si0ZfsIOoXWkYgKrueyDqOAgpdrAulax79uxr9K', 'VUIBmZwr3wvR0jaz.jpg', NULL, 3, NULL, '2022-05-26 07:14:47', '2022-06-02 10:00:41'),
(26, 'Jacqueline Gracia', '2', '4491090213', NULL, 'soso', 'Jackiegarciamaquillaje@gmail.com', NULL, '$2y$10$b4MOVsF/3bLDWIx0psidW.oNJynfOxhD1SaPYzcU5cGQENhGrG6t2', 'xjOswFjdzQwDcFzH.jpg', NULL, 4, NULL, '2022-05-26 07:23:22', '2022-05-26 07:23:22'),
(27, 'Fabian  Colors', '3', '4492746837', NULL, 'soso', 'fabiancolorartist@gmail.com', NULL, '$2y$10$eH6A5O.CyenhcMRa51PByOLdUkI6UEgInF0YeRSmVYUJ9njjdXlXS', 'gOwOpMkfGjfBRLKD.jpg', NULL, 5, NULL, '2022-05-26 07:30:28', '2022-05-26 07:30:28'),
(29, 'Fernanda Diaz de León', '2', '4493207584', NULL, 'soso', 'ferdiaz@gmail.com', NULL, '$2y$10$KwMrVd8uv/usW4uThj33AuaeZLfdPjW1sPOmwnQQS8/ioFOpKoDn.', 'U7ev6IkWXS7hicXh.jpg', NULL, 7, NULL, '2022-05-26 07:35:10', '2022-05-26 07:35:10'),
(30, 'Ana Zuñiga', '2', '4491865102', NULL, 'soso', 'annyzu@gmail.com', NULL, '$2y$10$iR949.OX7ncLuw7PkV2sFeQp/2fI.aFjuAQ2A6NFFS3rPA1SgvRx6', 'B0rVTZcAvbboBi8l.jpg', NULL, 8, NULL, '2022-05-26 07:36:17', '2022-05-26 07:36:17'),
(33, 'DIEGO OCHOA', NULL, NULL, NULL, 'yes', 'ochoahernandezdiego@gmail.com', NULL, '$2y$10$ry/AYel8Gryw73w7pvsZFO0YeGA8SomaZHFTk2AF8PEl/IhNQdW3y', NULL, NULL, NULL, NULL, '2022-06-02 07:08:11', '2022-06-02 07:08:11'),
(34, 'rosa zuñiga', NULL, NULL, NULL, 'yes', 'rosyise1997@gmail.com', NULL, '$2y$10$tng3ZA4WJCgCFE4ihDKoTOqLr92JyQNsb5v4CLp7l5tW6Q/fD6X.S', NULL, NULL, NULL, NULL, '2022-06-02 07:26:23', '2022-06-02 07:26:23'),
(35, 'Jennifer Reséndiz 2', '2', '4492633379', NULL, 'soso', 'jenniresendizalvarezmaquillista@gmail.com', NULL, '$2y$10$ica/uZGGgwYR2dUiunSR1uXu119ggzUQO9Le9XrYhLsgSkYDNIzzS', 'DS0bvR2JDt14tdFB.jpg', NULL, 6, NULL, '2022-06-02 07:30:00', '2022-06-02 16:45:52'),
(36, 'Oscar Hdz', NULL, NULL, NULL, 'no', '16151220@aguascalientes.tecnm.mx', NULL, '$2y$10$aStO.wL3WLE/.rN03t12..gYnd97hneutcYyTEUWcCCf/gNJgkZRi', NULL, NULL, NULL, NULL, '2022-06-02 17:08:21', '2022-06-02 17:08:21');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `dates`
--
ALTER TABLE `dates`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indices de la tabla `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `shops`
--
ALTER TABLE `shops`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `styles`
--
ALTER TABLE `styles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `stylist`
--
ALTER TABLE `stylist`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `colors`
--
ALTER TABLE `colors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `dates`
--
ALTER TABLE `dates`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `shops`
--
ALTER TABLE `shops`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `styles`
--
ALTER TABLE `styles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `stylist`
--
ALTER TABLE `stylist`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
