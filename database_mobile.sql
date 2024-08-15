-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 09 août 2024 à 03:31
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `database_mobile`
--

-- --------------------------------------------------------

--
-- Structure de la table `api_classe`
--

DROP TABLE IF EXISTS `api_classe`;
CREATE TABLE IF NOT EXISTS `api_classe` (
  `id_classe` int NOT NULL AUTO_INCREMENT,
  `nom_classe` varchar(255) NOT NULL,
  `effectif_elelves` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id_classe`)
) ;

--
-- Déchargement des données de la table `api_classe`
--

INSERT INTO `api_classe` (`id_classe`, `nom_classe`, `effectif_elelves`) VALUES
(13, 'Ekabkbbb', 0),
(11, 'Tle', 3),
(12, '2nd', 0),
(14, 'Baba', 0),
(15, 'Iha', 1);

-- --------------------------------------------------------

--
-- Structure de la table `api_eleves`
--

DROP TABLE IF EXISTS `api_eleves`;
CREATE TABLE IF NOT EXISTS `api_eleves` (
  `id_eleve` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `addresse` longtext NOT NULL,
  `date_nais` date NOT NULL,
  `matricule` varchar(255) NOT NULL,
  `id_classe_id` int NOT NULL,
  PRIMARY KEY (`id_eleve`),
  KEY `api_eleves_classe_id_17c583da` (`id_classe_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

--
-- Déchargement des données de la table `api_eleves`
--

INSERT INTO `api_eleves` (`id_eleve`, `nom`, `prenom`, `addresse`, `date_nais`, `matricule`, `id_classe_id`) VALUES
(6, 'kosokely', 'kosokely', 'kosokely', '2002-08-08', '02', 11),
(7, 'koso', 'koso', 'koso', '2002-08-07', '03', 11),
(10, 'Aaa', 'Aaa', 'Aaa', '2024-08-08', '06', 15);

-- --------------------------------------------------------

--
-- Structure de la table `api_enseignant`
--

DROP TABLE IF EXISTS `api_enseignant`;
CREATE TABLE IF NOT EXISTS `api_enseignant` (
  `id_enseignant` int NOT NULL AUTO_INCREMENT,
  `id_user_id` int NOT NULL,
  PRIMARY KEY (`id_enseignant`),
  KEY `api_enseignant_id_user_id_6096a0a3` (`id_user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

--
-- Déchargement des données de la table `api_enseignant`
--

INSERT INTO `api_enseignant` (`id_enseignant`, `id_user_id`) VALUES
(2, 3),
(3, 4),
(4, 5),
(5, 6),
(6, 7);

-- --------------------------------------------------------

--
-- Structure de la table `api_matiere`
--

DROP TABLE IF EXISTS `api_matiere`;
CREATE TABLE IF NOT EXISTS `api_matiere` (
  `id_matiere` int NOT NULL AUTO_INCREMENT,
  `nom_matiere` varchar(100) NOT NULL,
  `id_enseignant_id` int NOT NULL,
  PRIMARY KEY (`id_matiere`),
  KEY `api_matiere_id_enseignant_id_744bc6e6` (`id_enseignant_id`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

--
-- Déchargement des données de la table `api_matiere`
--

INSERT INTO `api_matiere` (`id_matiere`, `nom_matiere`, `id_enseignant_id`) VALUES
(29, 'Ioooo', 6),
(20, 'Babaaaaanao', 6),
(24, 'Hg', 4),
(11, 'DAT', 4),
(25, 'Vidy', 6),
(22, 'Eka', 5),
(30, 'Physique', 4),
(31, 'Math', 2);

-- --------------------------------------------------------

--
-- Structure de la table `api_note`
--

DROP TABLE IF EXISTS `api_note`;
CREATE TABLE IF NOT EXISTS `api_note` (
  `id_note` int NOT NULL AUTO_INCREMENT,
  `id_classe_id` int DEFAULT NULL,
  `id_eleve_id` int DEFAULT NULL,
  `id_matiere_id` int DEFAULT NULL,
  `note` decimal(5,2) DEFAULT NULL,
  `date_debut` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  PRIMARY KEY (`id_note`),
  KEY `id_classe` (`id_classe_id`),
  KEY `id_eleve` (`id_eleve_id`),
  KEY `id_matiere` (`id_matiere_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `api_note`
--

INSERT INTO `api_note` (`id_note`, `id_classe_id`, `id_eleve_id`, `id_matiere_id`, `note`, `date_debut`, `date_fin`) VALUES
(1, 13, 6, 29, '12.00', '2024-08-01', '2024-08-08'),
(2, 11, 6, 11, '12.00', '2024-08-01', '2024-08-15'),
(3, 11, 6, 24, '2.00', '2024-08-01', '2024-08-15');

-- --------------------------------------------------------

--
-- Structure de la table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
CREATE TABLE IF NOT EXISTS `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
CREATE TABLE IF NOT EXISTS `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissions_group_id_b120cbf9` (`group_id`),
  KEY `auth_group_permissions_permission_id_84c5c92e` (`permission_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
CREATE TABLE IF NOT EXISTS `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  KEY `auth_permission_content_type_id_2f476e4b` (`content_type_id`)
) ENGINE=MyISAM AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add enseignant', 7, 'add_enseignant'),
(26, 'Can change enseignant', 7, 'change_enseignant'),
(27, 'Can delete enseignant', 7, 'delete_enseignant'),
(28, 'Can view enseignant', 7, 'view_enseignant'),
(29, 'Can add matiere', 8, 'add_matiere'),
(30, 'Can change matiere', 8, 'change_matiere'),
(31, 'Can delete matiere', 8, 'delete_matiere'),
(32, 'Can view matiere', 8, 'view_matiere'),
(33, 'Can add classe', 9, 'add_classe'),
(34, 'Can change classe', 9, 'change_classe'),
(35, 'Can delete classe', 9, 'delete_classe'),
(36, 'Can view classe', 9, 'view_classe'),
(37, 'Can add eleves', 10, 'add_eleves'),
(38, 'Can change eleves', 10, 'change_eleves'),
(39, 'Can delete eleves', 10, 'delete_eleves'),
(40, 'Can view eleves', 10, 'view_eleves');

-- --------------------------------------------------------

--
-- Structure de la table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
CREATE TABLE IF NOT EXISTS `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `auth_user`
--

INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
(1, 'pbkdf2_sha256$600000$J0Nd0P7o1D4C5G8FGmGR87$/q6dCtD0PIr8G8C0sns/NVDzGkUhMPrk3yNjeT73ybg=', '2024-08-05 06:24:01.916419', 1, 'vidy', '', '', 'vidyjea464@gmail.com', 1, 1, '2024-08-03 13:55:58.021324'),
(7, 'pbkdf2_sha256$720000$ia0102URAkO3n3Yx9BJVZb$uW37a/Ig1E3xvRaMbvMzBFvAuA6nxXvKFycOz+Ce4+Y=', NULL, 0, 'mamy', 'mamy', 'mamy', 'mamy@gmail.com', 0, 1, '2024-08-06 06:46:13.688467'),
(5, 'pbkdf2_sha256$600000$shaQv6oVn7YDXt9ksufEGy$9D6GC2prPJ+/Ik1Jjk/dr0FBXTF4lefZqa7ug5yIoDA=', NULL, 0, 'odon', 'odon', 'odon', 'odon@gmail.com', 0, 1, '2024-08-05 10:32:46.286387'),
(6, 'pbkdf2_sha256$720000$Vg2u66tAXvbEzYKBpiz44j$klbh6yGWO2Ihg5mL/WkYvjJt2jkArFcxFQsYoVilEqo=', NULL, 0, 'marie', 'marie', 'marie', 'marie@gmail.com', 0, 1, '2024-08-06 06:03:43.087328');

-- --------------------------------------------------------

--
-- Structure de la table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
CREATE TABLE IF NOT EXISTS `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_user_id_6a12ed8b` (`user_id`),
  KEY `auth_user_groups_group_id_97559544` (`group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
CREATE TABLE IF NOT EXISTS `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permissions_user_id_a95ead1b` (`user_id`),
  KEY `auth_user_user_permissions_permission_id_1fbb5f2c` (`permission_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
CREATE TABLE IF NOT EXISTS `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint UNSIGNED NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6` (`user_id`)
) ;

-- --------------------------------------------------------

--
-- Structure de la table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
CREATE TABLE IF NOT EXISTS `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(2, 'auth', 'permission'),
(3, 'auth', 'group'),
(4, 'auth', 'user'),
(5, 'contenttypes', 'contenttype'),
(6, 'sessions', 'session'),
(7, 'api', 'enseignant'),
(8, 'api', 'matiere'),
(9, 'api', 'classe'),
(10, 'api', 'eleves');

-- --------------------------------------------------------

--
-- Structure de la table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
CREATE TABLE IF NOT EXISTS `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2024-08-03 13:40:54.768284'),
(2, 'auth', '0001_initial', '2024-08-03 13:40:55.351723'),
(3, 'admin', '0001_initial', '2024-08-03 13:40:55.616564'),
(4, 'admin', '0002_logentry_remove_auto_add', '2024-08-03 13:40:55.630527'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2024-08-03 13:40:55.645486'),
(6, 'contenttypes', '0002_remove_content_type_name', '2024-08-03 13:40:55.744222'),
(7, 'auth', '0002_alter_permission_name_max_length', '2024-08-03 13:40:55.815033'),
(8, 'auth', '0003_alter_user_email_max_length', '2024-08-03 13:40:55.860911'),
(9, 'auth', '0004_alter_user_username_opts', '2024-08-03 13:40:55.874873'),
(10, 'auth', '0005_alter_user_last_login_null', '2024-08-03 13:40:55.932720'),
(11, 'auth', '0006_require_contenttypes_0002', '2024-08-03 13:40:55.934718'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2024-08-03 13:40:55.951668'),
(13, 'auth', '0008_alter_user_username_max_length', '2024-08-03 13:40:56.006520'),
(14, 'auth', '0009_alter_user_last_name_max_length', '2024-08-03 13:40:56.077330'),
(15, 'auth', '0010_alter_group_name_max_length', '2024-08-03 13:40:56.131187'),
(16, 'auth', '0011_update_proxy_permissions', '2024-08-03 13:40:56.145151'),
(17, 'auth', '0012_alter_user_first_name_max_length', '2024-08-03 13:40:56.191035'),
(18, 'sessions', '0001_initial', '2024-08-03 13:40:56.236903'),
(19, 'api', '0001_initial', '2024-08-05 08:01:42.226899'),
(20, 'api', '0002_matiere', '2024-08-06 13:35:14.191903'),
(21, 'api', '0003_remove_enseignant_matière', '2024-08-06 13:40:33.163603'),
(22, 'api', '0004_alter_enseignant_options_alter_enseignant_id_user', '2024-08-07 05:27:31.296559'),
(23, 'api', '0005_classe', '2024-08-08 07:57:48.714158'),
(24, 'api', '0006_eleves', '2024-08-08 08:00:33.877375'),
(25, 'api', '0007_rename_classe_eleves_id_classe', '2024-08-08 09:00:11.459878'),
(26, 'api', '0008_alter_classe_effectif_elelves', '2024-08-08 10:56:50.829312');

-- --------------------------------------------------------

--
-- Structure de la table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
CREATE TABLE IF NOT EXISTS `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
