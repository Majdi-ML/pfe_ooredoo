-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3307
-- Généré le : lun. 23 juin 2025 à 17:50
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `db_ooredoo`
--

-- --------------------------------------------------------

--
-- Structure de la table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cluster`
--

CREATE TABLE `cluster` (
  `id` int(11) NOT NULL,
  `ref` varchar(255) DEFAULT NULL,
  `etat_id` int(11) DEFAULT NULL,
  `nomDuRessourceGroupPackageServiceGuard` varchar(255) DEFAULT NULL,
  `adresseIp` varchar(255) DEFAULT NULL,
  `listeDesServeursConcernes` text DEFAULT NULL,
  `logicielCluster` varchar(255) DEFAULT NULL,
  `version` varchar(255) DEFAULT NULL,
  `mode` varchar(255) DEFAULT NULL,
  `serveurActif` varchar(255) DEFAULT NULL,
  `complementsInformations` text DEFAULT NULL,
  `demande_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `cluster`
--

INSERT INTO `cluster` (`id`, `ref`, `etat_id`, `nomDuRessourceGroupPackageServiceGuard`, `adresseIp`, `listeDesServeursConcernes`, `logicielCluster`, `version`, `mode`, `serveurActif`, `complementsInformations`, `demande_id`) VALUES
(1, 'Cluster 1', 1, 'Nom RGPSG', '192.168.1.1', 'Serveur 1, Serveur 2', 'ClusterSoft v1.0', '1.0', 'Production', 'Serveur 1', 'Informations supplémentaires', 1),
(2, 'Cluster 2', 1, 'Nom RGPSG', '192.168.1.1', 'Serveur 1, Serveur 2', 'ClusterSoft v1.0', '1.0', 'Production', 'Serveur 1', 'Informations supplémentaires', 1),
(3, 'Cluster 3', 1, 'Nom RGPSG', '192.168.1.1', 'Serveur 1, Serveur 2', 'ClusterSoft v1.0', '1.0', 'Production', 'Serveur 1', 'Informations supplémentaires', 1),
(4, 'Cluster 4', 1, 'Nom RGPSG', '192.168.1.1', 'Serveur 1, Serveur 2', 'ClusterSoft v1.0', '1.0', 'Production', 'Serveur 1', 'Informations supplémentaires', 1),
(5, 'Cluster 5', 1, 'Nom RGPSG', '192.168.1.1', 'Serveur 1, Serveur 2', 'ClusterSoft v1.0', '1.0', 'Production', 'Serveur 1', 'Informations supplémentaires', 1),
(6, 'Cluster 6', 1, 'Nom RGPSG', '192.168.1.1', 'Serveur 1, Serveur 2', 'ClusterSoft v1.0', '1.0', 'Production', 'Serveur 1', 'Informations supplémentaires', 1),
(7, 'Cluster 6', 1, 'Nom RGPSG', '192.168.1.1', 'Serveur 1, Serveur 2', 'ClusterSoft v1.0', '1.0', 'Production', 'Serveur 1', 'Informations supplémentaires', 1),
(8, 'Cluster 6', 1, 'Nom RGPSG', '192.168.1.1', 'Serveur 1, Serveur 2', 'ClusterSoft v1.0', '1.0', 'Production', 'Serveur 1', 'Informations supplémentaires', 1),
(9, 'Cluster 6', 1, 'Nom RGPSG', '192.168.1.1', 'Serveur 1, Serveur 2', 'ClusterSoft v1.0', '1.0', 'Production', 'Serveur 1', 'Informations supplémentaires', 1),
(10, 'Cluster 6', 1, 'Nom RGPSG', '192.168.1.1', 'Serveur 1, Serveur 2', 'ClusterSoft v1.0', '1.0', 'Production', 'Serveur 1', 'Informations supplémentaires', 1),
(11, 'jjggdddd', 3, 'hgghhhgj', '192.168.1.1', 'server1', 'version', 'version 1', 'Production', 'server1', 'Informations ghgjhghjgjhghjghj', 19),
(12, 'cluster 03', 1, 'jkjkjkjhjkhjkhjkhjkhjk', '1125.125.56', 'server1, hkjhhjjkhjkjkhkjhhkj', 'kljkjhkjhj', 'jkhjhjgjghg', ':hnjkhjhhjgjk', 'server1', 'k,hjhgyufghhjghj', 21),
(13, 'cluster 02', 1, 'dfdddddd', 'fdffdfddfdffddf', 'server1, hkjhhjjkhjkjkhkjhhkj', 'dddfdssdsg', 'dsdsssdd', 'ddsdss', 'server1', 'dsdsdds', 22),
(14, 'cluster-02', 1, 'jdjdjjdjdj', '182.158.01.01', 'hkjhhjjkhjkjkhkjhhkj', 'kkkkkkk', 'lkdkkdkdkd', 'nNNNNNN', 'hkjhhjjkhjkjkhkjhhkj', 'llmlllllllllllllllllll', 22),
(15, 'cluster____test', 2, 'ddddd', '2001.01.0999', 'server1, hkjhhjjkhjkjkhkjhhkj', 'fffff', 'fffff', 'ddfffd', 'hkjhhjjkhjkjkhkjhhkj', 'dfdfsdsdfs', 23),
(16, 'fdsdsdsddssd', 1, 'sddssdds', 'ddsddsdsds', 'server1, hkjhhjjkhjkjkhkjhhkj', 'dsddfsdds', 'sdssdfsdds', 'dssdfsdsdd', 'server1', 'fdffddfdffgf', 24),
(17, 'hhhh', 2, 'dddddddddd', 'hdhhdgshg', 'server1, hkjhhjjkhjkjkhkjhhkj', 'kjhjhjkhkj', 'fffffffffff', 'fffffffffffff', 'server1', 'fffffffffffffff', 27);

-- --------------------------------------------------------

--
-- Structure de la table `cluster_serveurs`
--

CREATE TABLE `cluster_serveurs` (
  `cluster_id` int(11) NOT NULL,
  `serveur_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `cluster_serveurs`
--

INSERT INTO `cluster_serveurs` (`cluster_id`, `serveur_id`) VALUES
(5, 1),
(5, 2),
(6, 1),
(6, 2),
(7, 1),
(7, 2),
(8, 1),
(8, 2),
(9, 1),
(9, 2),
(10, 1),
(10, 2),
(11, 3),
(12, 3),
(12, 4),
(13, 3),
(13, 4),
(14, 4),
(15, 3),
(15, 4),
(16, 3),
(16, 4),
(17, 3),
(17, 4);

-- --------------------------------------------------------

--
-- Structure de la table `criticite`
--

CREATE TABLE `criticite` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `criticite`
--

INSERT INTO `criticite` (`id`, `nom`) VALUES
(1, 'Critique'),
(2, 'Majeure'),
(3, 'Normale'),
(5, 'Critique');

-- --------------------------------------------------------

--
-- Structure de la table `demandes`
--

CREATE TABLE `demandes` (
  `id` int(11) NOT NULL,
  `ref` varchar(255) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `serviceplatfom_id` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `demandes`
--

INSERT INTO `demandes` (`id`, `ref`, `status_id`, `user_id`, `serviceplatfom_id`, `description`, `created_at`, `updated_at`) VALUES
(1, NULL, 5, NULL, 1, 'Exemple de demande', '2025-04-20 18:53:06', '2025-05-19 15:03:04'),
(2, NULL, 1, NULL, 1, 'Exemple de demande 2', '2025-04-20 18:53:17', '2025-04-20 18:53:17'),
(3, NULL, 1, NULL, 1, 'Exemple de demande 4', '2025-04-28 08:37:03', '2025-04-28 08:37:03'),
(4, NULL, 1, NULL, 1, 'Exemple defffffffff demande 4', '2025-04-28 09:39:00', '2025-04-28 09:39:00'),
(5, NULL, 1, NULL, 1, 'Exemple defffffffff demande 5555', '2025-04-28 09:50:23', '2025-04-28 09:50:23'),
(6, 'REF20250428Plateforme A', 1, NULL, 1, 'Exemple defffffffff demande55', '2025-04-28 11:50:48', '2025-04-28 11:50:48'),
(7, 'REF20250428Plateforme A', 1, NULL, 1, 'Exemple defffffffff demande55jjjj', '2025-04-28 11:51:40', '2025-04-28 11:51:40'),
(8, 'REF20250428Plateforme A', 1, NULL, 1, 'taw te5deeeem', '2025-04-28 12:11:21', '2025-04-28 12:11:21'),
(9, 'REF20250428Plateforme A', 1, 1, 1, 'Exemple de description', '2025-04-28 12:22:01', '2025-04-28 12:22:01'),
(10, 'REF20250428Plateforme A', 1, 1, 1, 'Exemple dddddddddddddddddddddddddde description', '2025-04-28 12:49:00', '2025-04-28 12:49:00'),
(11, 'REF20250428Plateforme A', 1, 1, 1, 'Exemple dddddddddddddddddddddddddde description', '2025-04-28 13:05:40', '2025-04-28 13:05:40'),
(12, 'REF20250428Plateforme A', 1, 1, 1, 'Exemple dddddddddddddddddddddddddde description', '2025-04-28 13:06:18', '2025-04-28 13:06:18'),
(13, 'REF20250512Plateforme A', 2, 1, 1, 'jhgdfgdfdhfdfg', '2025-05-12 15:14:23', '2025-05-12 15:14:23'),
(14, 'REF20250512Plateforme A', 2, 1, 1, 'lyoum le 12/05/2025', '2025-05-12 21:24:49', '2025-05-12 21:24:49'),
(15, 'REF20250512Plateforme A', 1, 1, 1, 'taw taw taw', '2025-05-12 21:58:45', '2025-05-12 21:58:45'),
(16, 'REF20250512Plateforme A', 1, 1, 1, 'jgjhgghjhghjghjgjhghj', '2025-05-12 22:12:02', '2025-05-12 22:12:02'),
(17, 'REF20250513Plateforme A', 1, 1, 1, 'hjkjhhjkjkhkj', '2025-05-13 07:46:00', '2025-05-13 07:46:00'),
(18, 'REF20250514Plateforme A', 1, 1, 1, 'testetst', '2025-05-14 08:40:50', '2025-05-14 08:40:50'),
(19, 'REF20250514Plateforme A', 2, 1, 1, 'gjhghgdgdfggf', '2025-05-14 14:08:33', '2025-05-14 14:08:33'),
(20, 'REF20250514Plateforme A', 1, 1, 1, 'testtestetsttetst', '2025-05-14 15:54:32', '2025-05-14 15:54:32'),
(21, 'REF20250514Plateforme A', 5, 1, 1, 'hhhjkhkjhkjhjkhhkjjhkjhkj;', '2025-05-14 15:58:18', '2025-05-16 08:54:24'),
(22, 'REF20250515Plateforme A', 1, 1, 1, 'jhjkhkjhkjhkjk', '2025-05-15 07:42:17', '2025-05-15 07:42:17'),
(23, 'REF20250515Plateforme A', 2, 5, 1, 'testetsttest', '2025-05-15 22:40:36', '2025-05-15 22:40:36'),
(24, 'REF20250515Plateforme A', 5, 5, 1, 'khjkhqjkhjkq', '2025-05-15 22:46:36', '2025-05-16 09:52:40'),
(25, 'REF20250515Plateforme A', 1, 5, 1, 'kjhjkhjkjkhqsdqsq', '2025-05-15 22:58:52', '2025-05-15 22:58:52'),
(26, 'REF20250516Plateforme A', 5, 5, 1, 'testetstttt', '2025-05-15 23:03:50', '2025-05-15 23:11:02'),
(27, 'REF20250516Plateforme A', 1, 5, 1, 'jbjgh', '2025-05-16 08:50:25', '2025-05-16 08:50:25'),
(28, 'REF20250516Plateforme A', 1, 5, 1, 'j\'ai besoins de 3 clusters', '2025-05-16 09:39:07', '2025-05-16 09:39:07'),
(29, 'REF20250516Plateforme A', 1, 5, 1, 'test', '2025-05-16 09:44:37', '2025-05-16 09:44:37'),
(30, 'REF20250518Plateforme A', 1, 5, 1, 'gfdfdt', '2025-05-18 09:54:30', '2025-05-18 09:54:30'),
(31, 'REF20250519Plateforme A', 1, 5, 1, 'ngjfgh', '2025-05-19 15:04:49', '2025-05-19 15:04:49');

-- --------------------------------------------------------

--
-- Structure de la table `etat`
--

CREATE TABLE `etat` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `etat`
--

INSERT INTO `etat` (`id`, `nom`) VALUES
(1, 'Inchangé'),
(2, 'Modifié'),
(3, 'Nouveau'),
(4, 'Supprimé');

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `logfiles`
--

CREATE TABLE `logfiles` (
  `id` int(11) NOT NULL,
  `ref` varchar(255) DEFAULT NULL,
  `etat_id` int(11) DEFAULT NULL,
  `refComposant` varchar(255) DEFAULT NULL,
  `rgSgSiCluster` varchar(255) DEFAULT NULL,
  `logfile` varchar(255) DEFAULT NULL,
  `localisation` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `formatLogfile` varchar(255) DEFAULT NULL,
  `separateur` varchar(255) DEFAULT NULL,
  `intervalleDePolling` varchar(255) DEFAULT NULL,
  `monitoredBy_id` int(11) DEFAULT NULL,
  `fourniEnAnnexe` varchar(255) DEFAULT NULL,
  `refService` varchar(255) DEFAULT NULL,
  `nomTemplate` varchar(255) DEFAULT NULL,
  `logConditions` text DEFAULT NULL,
  `demande_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `logfiles`
--

INSERT INTO `logfiles` (`id`, `ref`, `etat_id`, `refComposant`, `rgSgSiCluster`, `logfile`, `localisation`, `description`, `formatLogfile`, `separateur`, `intervalleDePolling`, `monitoredBy_id`, `fourniEnAnnexe`, `refService`, `nomTemplate`, `logConditions`, `demande_id`) VALUES
(2, 'LOG-001', 1, 'COMP-123', 'clusterA', '/var/log/syslog', 'Serveur 1', 'Log système principal', 'txt', ';', '5min', 1, 'non', 'SVC-999', 'template-001', 'erreur, warning', 1),
(3, 'LOG-001', 1, 'COMP-123', 'clusterA', '/var/log/syslog', 'Serveur 1', 'Log système principal', 'txt', ';', '5min', 1, 'non', 'SVC-999', 'template-001', 'erreur, warning', 1);

-- --------------------------------------------------------

--
-- Structure de la table `logfilespatterns`
--

CREATE TABLE `logfilespatterns` (
  `id` int(11) NOT NULL,
  `nRef` int(11) DEFAULT NULL,
  `ref` varchar(255) DEFAULT NULL,
  `etat_id` int(11) DEFAULT NULL,
  `signification` text DEFAULT NULL,
  `identification` varchar(255) DEFAULT NULL,
  `criticite_id` int(11) DEFAULT NULL,
  `messageAlarme` text DEFAULT NULL,
  `instructions` text DEFAULT NULL,
  `performAction` text DEFAULT NULL,
  `acquittement` varchar(255) DEFAULT NULL,
  `complementsInformations` text DEFAULT NULL,
  `refService` varchar(255) DEFAULT NULL,
  `objet` varchar(255) DEFAULT NULL,
  `logfile_id` int(11) DEFAULT NULL,
  `demande_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `logfilespatterns`
--

INSERT INTO `logfilespatterns` (`id`, `nRef`, `ref`, `etat_id`, `signification`, `identification`, `criticite_id`, `messageAlarme`, `instructions`, `performAction`, `acquittement`, `complementsInformations`, `refService`, `objet`, `logfile_id`, `demande_id`) VALUES
(1, 102, 'PATTERN-001', 1, 'Erreur critique dans le log', 'pattern regex', 2, 'Pattern trouvé : Erreur critique', 'Redémarrer le service', 'restart service', 'manuel', 'À surveiller pendant les pics', 'Service-XYZ', 'Surveillance logs', 2, 1),
(2, 102, 'PATTERN-001', 1, 'Erreur critique dans le log', 'pattern regex', 2, 'Pattern trouvé : Erreur critique', 'Redémarrer le service', 'restart service', 'manuel', 'À surveiller pendant les pics', 'Service-XYZ', 'Surveillance logs', 2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `logfiles_serveurs`
--

CREATE TABLE `logfiles_serveurs` (
  `logfile_id` int(11) NOT NULL,
  `serveur_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `logfiles_serveurs`
--

INSERT INTO `logfiles_serveurs` (`logfile_id`, `serveur_id`) VALUES
(2, 1),
(2, 2),
(3, 1),
(3, 2);

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000001_create_cache_table', 1),
(2, '0001_01_01_000002_create_jobs_table', 1),
(3, '2025_04_08_090308_create_cluster_serveurs_table', 1),
(4, '2025_04_08_090308_create_cluster_table', 1),
(5, '2025_04_08_090308_create_criticite_table', 1),
(6, '2025_04_08_090308_create_demandes_table', 1),
(7, '2025_04_08_090308_create_etat_table', 1),
(8, '2025_04_08_090308_create_logfiles_serveurs_table', 1),
(9, '2025_04_08_090308_create_logfiles_table', 1),
(10, '2025_04_08_090308_create_logfilespatterns_table', 1),
(11, '2025_04_08_090308_create_monitoredby_table', 1),
(12, '2025_04_08_090308_create_os_table', 1),
(13, '2025_04_08_090308_create_platforme_table', 1),
(14, '2025_04_08_090308_create_process_serveurs_table', 1),
(15, '2025_04_08_090308_create_process_table', 1),
(16, '2025_04_08_090308_create_requetessql_serveurs_table', 1),
(17, '2025_04_08_090308_create_requetessql_table', 1),
(18, '2025_04_08_090308_create_role_table', 1),
(19, '2025_04_08_090308_create_scripts_serveurs_table', 1),
(20, '2025_04_08_090308_create_scripts_table', 1),
(21, '2025_04_08_090308_create_serveurs_table', 1),
(22, '2025_04_08_090308_create_serviceplatfom_table', 1),
(23, '2025_04_08_090308_create_soclestandardomu_table', 1),
(24, '2025_04_08_090308_create_status_table', 1),
(25, '2025_04_08_090308_create_support_table', 1),
(26, '2025_04_08_090308_create_trapssnmp_serveurs_table', 1),
(27, '2025_04_08_090308_create_trapssnmp_table', 1),
(28, '2025_04_08_090308_create_typeserveur_table', 1),
(29, '2025_04_08_090308_create_url_serveurs_table', 1),
(30, '2025_04_08_090308_create_url_table', 1),
(31, '2025_04_08_090308_create_user_table', 1),
(32, '2025_04_08_090308_create_versionsnmp_table', 1),
(33, '2025_04_08_090311_add_foreign_keys_to_cluster_serveurs_table', 1),
(34, '2025_04_08_090311_add_foreign_keys_to_cluster_table', 1),
(35, '2025_04_08_090311_add_foreign_keys_to_demandes_table', 1),
(36, '2025_04_08_090311_add_foreign_keys_to_logfiles_serveurs_table', 1),
(37, '2025_04_08_090311_add_foreign_keys_to_logfiles_table', 1),
(38, '2025_04_08_090311_add_foreign_keys_to_logfilespatterns_table', 1),
(39, '2025_04_08_090311_add_foreign_keys_to_process_serveurs_table', 1),
(40, '2025_04_08_090311_add_foreign_keys_to_process_table', 1),
(41, '2025_04_08_090311_add_foreign_keys_to_requetessql_serveurs_table', 1),
(42, '2025_04_08_090311_add_foreign_keys_to_requetessql_table', 1),
(43, '2025_04_08_090311_add_foreign_keys_to_scripts_serveurs_table', 1),
(44, '2025_04_08_090311_add_foreign_keys_to_scripts_table', 1),
(45, '2025_04_08_090311_add_foreign_keys_to_serveurs_table', 1),
(46, '2025_04_08_090311_add_foreign_keys_to_serviceplatfom_table', 1),
(47, '2025_04_08_090311_add_foreign_keys_to_trapssnmp_serveurs_table', 1),
(48, '2025_04_08_090311_add_foreign_keys_to_trapssnmp_table', 1),
(49, '2025_04_08_090311_add_foreign_keys_to_url_serveurs_table', 1),
(50, '2025_04_08_090311_add_foreign_keys_to_url_table', 1),
(51, '2025_04_08_090311_add_foreign_keys_to_user_table', 1),
(52, '2025_04_18_231248_create_personal_access_tokens_table', 2),
(53, '2025_04_20_185506_add_nom_to_serviceplatfom', 3),
(54, '2025_04_20_185808_add_description_to_demandes', 3),
(58, '2025_04_20_204838_create_ver_tech_firmware_table', 4),
(59, '2025_04_20_205121_add_vertechfirmware_id_to_serveurs_table', 5),
(60, '2025_04_28_093142_add_ref_to_demandes_table', 5),
(61, '2025_04_28_105512_create_personal_access_tokens_table', 6),
(62, '2025_04_28_125953_create_personal_access_tokens_table', 7);

-- --------------------------------------------------------

--
-- Structure de la table `monitoredby`
--

CREATE TABLE `monitoredby` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `monitoredby`
--

INSERT INTO `monitoredby` (`id`, `nom`) VALUES
(1, 'OMU'),
(2, 'Sitescope 1'),
(3, 'Sitescope 2'),
(4, 'NNMI'),
(5, 'RUM'),
(6, 'BPM');

-- --------------------------------------------------------

--
-- Structure de la table `os`
--

CREATE TABLE `os` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `os`
--

INSERT INTO `os` (`id`, `nom`) VALUES
(2, 'AIX'),
(3, 'HPUX'),
(4, 'Linux'),
(5, 'Solaris'),
(6, 'Windows');

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(15, 'App\\Models\\User', 7, 'auth_token', '78d8ee9f70fcccf2e31f53aaccfdd150bb9651f82496444e21c8dd7ff1f4af25', '[\"*\"]', NULL, NULL, '2025-05-16 08:48:50', '2025-05-16 08:48:50'),
(16, 'App\\Models\\User', 5, 'auth_token', 'ab14322d6a907e69b2f8f7eb083bcf95bbdb0ff568aa095b11a945234acd9ede', '[\"*\"]', NULL, NULL, '2025-05-16 09:36:12', '2025-05-16 09:36:12'),
(17, 'App\\Models\\User', 5, 'auth_token', '47be15ba71d2f2dd057ba9347c6cdbfcd6fdc2ed23d44c7e45f738cb8b659cf1', '[\"*\"]', NULL, NULL, '2025-05-18 09:53:39', '2025-05-18 09:53:39'),
(18, 'App\\Models\\User', 4, 'auth_token', '5011dc9dab2d6ce9912a9522529b402f735649cca22c321110efef3752b76527', '[\"*\"]', NULL, NULL, '2025-05-19 13:57:29', '2025-05-19 13:57:29'),
(19, 'App\\Models\\User', 7, 'auth_token', '1c025f8664dc9d7969369de9ac40ba6c73a01d4cb2b60d2a6003b0296720039a', '[\"*\"]', NULL, NULL, '2025-05-19 15:01:19', '2025-05-19 15:01:19'),
(20, 'App\\Models\\User', 5, 'auth_token', '2d49aa54fdf3e48a6821cbc712669bcfeed9e70dca647baeea4f28404abbe9a2', '[\"*\"]', NULL, NULL, '2025-05-19 15:02:49', '2025-05-19 15:02:49');

-- --------------------------------------------------------

--
-- Structure de la table `platforme`
--

CREATE TABLE `platforme` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `platforme`
--

INSERT INTO `platforme` (`id`, `nom`) VALUES
(1, 'Prod'),
(2, 'Pré-Prod');

-- --------------------------------------------------------

--
-- Structure de la table `process`
--

CREATE TABLE `process` (
  `id` int(11) NOT NULL,
  `ref` varchar(255) DEFAULT NULL,
  `etat_id` int(11) DEFAULT NULL,
  `refComposant` varchar(255) DEFAULT NULL,
  `process` varchar(255) DEFAULT NULL,
  `criticite_id` int(11) DEFAULT NULL,
  `messageAlarme` text DEFAULT NULL,
  `intervalleDePolling` varchar(255) DEFAULT NULL,
  `objet` varchar(255) DEFAULT NULL,
  `nomTemplate` varchar(255) DEFAULT NULL,
  `monitoredBy_id` int(11) DEFAULT NULL,
  `demande_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `process`
--

INSERT INTO `process` (`id`, `ref`, `etat_id`, `refComposant`, `process`, `criticite_id`, `messageAlarme`, `intervalleDePolling`, `objet`, `nomTemplate`, `monitoredBy_id`, `demande_id`) VALUES
(1, 'PROC-123', 1, 'Component-X', 'myProcess', 2, 'Alerte CPU', '5min', 'Monitoring CPU', 'Template-CPU', 1, 1),
(2, 'PROC-123', 1, 'Component-X', 'myProcess', 2, 'Alerte CPU', '5min', 'Monitoring CPU', 'Template-CPU', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `process_serveurs`
--

CREATE TABLE `process_serveurs` (
  `process_id` int(11) NOT NULL,
  `serveur_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `process_serveurs`
--

INSERT INTO `process_serveurs` (`process_id`, `serveur_id`) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Structure de la table `requetessql`
--

CREATE TABLE `requetessql` (
  `id` int(11) NOT NULL,
  `ref` varchar(255) DEFAULT NULL,
  `etat_id` int(11) DEFAULT NULL,
  `refComposant` varchar(255) DEFAULT NULL,
  `rgSgSiCluster` varchar(255) DEFAULT NULL,
  `requeteSql` text DEFAULT NULL,
  `usernameDbName` varchar(255) DEFAULT NULL,
  `resultatAttenduDeLaRequete` text DEFAULT NULL,
  `performAction` text DEFAULT NULL,
  `criticite_id` int(11) DEFAULT NULL,
  `messageAlarme` text DEFAULT NULL,
  `instructions` text DEFAULT NULL,
  `intervalleDePolling` varchar(255) DEFAULT NULL,
  `refService` varchar(255) DEFAULT NULL,
  `objet` varchar(255) DEFAULT NULL,
  `monitoredBy_id` int(11) DEFAULT NULL,
  `nomTemplate` varchar(255) DEFAULT NULL,
  `demande_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `requetessql`
--

INSERT INTO `requetessql` (`id`, `ref`, `etat_id`, `refComposant`, `rgSgSiCluster`, `requeteSql`, `usernameDbName`, `resultatAttenduDeLaRequete`, `performAction`, `criticite_id`, `messageAlarme`, `instructions`, `intervalleDePolling`, `refService`, `objet`, `monitoredBy_id`, `nomTemplate`, `demande_id`) VALUES
(1, 'REQ-001', 2, 'COMP-REQ', 'RG-REQ-CLUSTER', 'SELECT * FROM users WHERE status = \'active\';', 'admin_db', '>= 1 utilisateur actif', 'Alerte mail', 3, 'Plus aucun utilisateur actif détecté', 'Vérifier la base et redémarrer le service', '10min', 'SRV-REQ', 'Monitoring base utilisateurs', 1, 'template-sql-check', 1),
(2, 'REQ-001', 2, 'COMP-REQ', 'RG-REQ-CLUSTER', 'SELECT * FROM users WHERE status = \'active\';', 'admin_db', '>= 1 utilisateur actif', 'Alerte mail', 3, 'Plus aucun utilisateur actif détecté', 'Vérifier la base et redémarrer le service', '10min', 'SRV-REQ', 'Monitoring base utilisateurs', 1, 'template-sql-check', 1);

-- --------------------------------------------------------

--
-- Structure de la table `requetessql_serveurs`
--

CREATE TABLE `requetessql_serveurs` (
  `requetessql_id` int(11) NOT NULL,
  `serveur_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `requetessql_serveurs`
--

INSERT INTO `requetessql_serveurs` (`requetessql_id`, `serveur_id`) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `role` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id`, `role`) VALUES
(1, 'Demandeur'),
(2, 'Admin '),
(3, 'SuperAdmin');

-- --------------------------------------------------------

--
-- Structure de la table `scripts`
--

CREATE TABLE `scripts` (
  `id` int(11) NOT NULL,
  `ref` varchar(255) DEFAULT NULL,
  `etat_id` int(11) DEFAULT NULL,
  `refComposant` varchar(255) DEFAULT NULL,
  `rgSgSiCluster` varchar(255) DEFAULT NULL,
  `script` text DEFAULT NULL,
  `codeErreur` varchar(255) DEFAULT NULL,
  `criticite_id` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `instructions` text DEFAULT NULL,
  `monitoredBy_id` int(11) DEFAULT NULL,
  `refService` varchar(255) DEFAULT NULL,
  `demande_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `scripts`
--

INSERT INTO `scripts` (`id`, `ref`, `etat_id`, `refComposant`, `rgSgSiCluster`, `script`, `codeErreur`, `criticite_id`, `description`, `instructions`, `monitoredBy_id`, `refService`, `demande_id`) VALUES
(1, 'SCR-001', 1, 'Component-A', 'Cluster-001', 'echo Hello', '0', 2, 'Script de test', 'Lancer manuellement', 1, 'SVC-005', 1),
(2, 'SCR-001', 1, 'Component-A', 'Cluster-001', 'echo Hello', '0', 2, 'Script de test', 'Lancer manuellement', 1, 'SVC-005', 1);

-- --------------------------------------------------------

--
-- Structure de la table `scripts_serveurs`
--

CREATE TABLE `scripts_serveurs` (
  `script_id` int(11) NOT NULL,
  `serveur_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `scripts_serveurs`
--

INSERT INTO `scripts_serveurs` (`script_id`, `serveur_id`) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Structure de la table `serveurs`
--

CREATE TABLE `serveurs` (
  `id` int(11) NOT NULL,
  `ref` varchar(255) DEFAULT NULL,
  `etat_id` int(11) DEFAULT NULL,
  `platforme_id` int(11) DEFAULT NULL,
  `hostname` varchar(255) DEFAULT NULL,
  `fqdn` varchar(255) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  `modele` varchar(255) DEFAULT NULL,
  `os_id` int(11) DEFAULT NULL,
  `verTechFirmware_id` bigint(20) UNSIGNED DEFAULT NULL,
  `cluster` varchar(255) DEFAULT NULL,
  `ipSource` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `socleStandardOmu_id` int(11) DEFAULT NULL,
  `complementsInformations` text DEFAULT NULL,
  `demande_id` int(11) DEFAULT NULL,
  `serviceplatfom_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `serveurs`
--

INSERT INTO `serveurs` (`id`, `ref`, `etat_id`, `platforme_id`, `hostname`, `fqdn`, `type_id`, `modele`, `os_id`, `verTechFirmware_id`, `cluster`, `ipSource`, `description`, `socleStandardOmu_id`, `complementsInformations`, `demande_id`, `serviceplatfom_id`) VALUES
(1, 'S123', 1, 2, 'server1', 'server1.example.com', 5, 'Model X', 2, NULL, 'Cluster A', '192.168.1.1', 'Test server', 1, 'None', 1, NULL),
(2, 'S12355', 1, 2, 'server1', 'server1.example.com', 5, 'Model X', 2, NULL, 'Cluster A', '192.168.1.1', 'Test server', 1, 'None', 1, NULL),
(3, 'S123555897898', 1, 2, 'server1', 'server1.example.com', 5, 'Model X', 2, 1, 'Cluster A', '192.168.1.11', 'Test server', 1, 'None', 1, 1),
(4, 'sv-01', 3, 1, 'hkjhhjjkhjkjkhkjhhkj', 'kjkjkhkjkjhjk', 8, 'skskks', 3, 1, 'cluster 1', '0103', 'khjkhjhjhk', 1, 'jkhkjjhkjhkjkj', 21, 1),
(5, 'sv-06', 3, 1, 'test', 'test', 3, 'test', 4, 3, 'ggg', '1287.025', 'test', 1, 'test', 28, 1);

-- --------------------------------------------------------

--
-- Structure de la table `serviceplatfom`
--

CREATE TABLE `serviceplatfom` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `support_id` int(11) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `serviceplatfom`
--

INSERT INTO `serviceplatfom` (`id`, `user_id`, `support_id`, `nom`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, 'Plateforme A', '2025-04-20 18:11:52', '2025-04-20 18:11:52');

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `soclestandardomu`
--

CREATE TABLE `soclestandardomu` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `soclestandardomu`
--

INSERT INTO `soclestandardomu` (`id`, `nom`) VALUES
(1, 'Oui'),
(2, 'Non');

-- --------------------------------------------------------

--
-- Structure de la table `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `status`
--

INSERT INTO `status` (`id`, `nom`) VALUES
(1, 'nouvelle'),
(2, 'en validation'),
(3, 'en traitement'),
(4, 'test'),
(5, 'cloturée');

-- --------------------------------------------------------

--
-- Structure de la table `support`
--

CREATE TABLE `support` (
  `id` int(11) NOT NULL,
  `support` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `support`
--

INSERT INTO `support` (`id`, `support`) VALUES
(1, 'Cloud');

-- --------------------------------------------------------

--
-- Structure de la table `trapssnmp`
--

CREATE TABLE `trapssnmp` (
  `id` int(11) NOT NULL,
  `ref` varchar(255) DEFAULT NULL,
  `etat_id` int(11) DEFAULT NULL,
  `refComposant` varchar(255) DEFAULT NULL,
  `signification` text DEFAULT NULL,
  `versionSnmp_id` int(11) DEFAULT NULL,
  `oid` varchar(255) DEFAULT NULL,
  `specificTrap` varchar(255) DEFAULT NULL,
  `variableBinding` text DEFAULT NULL,
  `criticite_id` int(11) DEFAULT NULL,
  `messageAlarme` text DEFAULT NULL,
  `instructions` text DEFAULT NULL,
  `acquittement` varchar(255) DEFAULT NULL,
  `mibAssocie` varchar(255) DEFAULT NULL,
  `objet` varchar(255) DEFAULT NULL,
  `compelementInformation` text DEFAULT NULL,
  `demande_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `trapssnmp`
--

INSERT INTO `trapssnmp` (`id`, `ref`, `etat_id`, `refComposant`, `signification`, `versionSnmp_id`, `oid`, `specificTrap`, `variableBinding`, `criticite_id`, `messageAlarme`, `instructions`, `acquittement`, `mibAssocie`, `objet`, `compelementInformation`, `demande_id`) VALUES
(1, 'TRAP-001', 1, 'COMP-TRAP', 'Alarme critique CPU', 2, '1.3.6.1.4.1.9.9.43.1.1.1.0', '4', 'cpuLoad=95', 3, 'Charge CPU critique détectée', 'Vérifier le processus CPU intensif', 'automatique', 'CISCO-PROCESS-MIB', 'Surveillance CPU', 'Serveur critique à surveiller', 1);

-- --------------------------------------------------------

--
-- Structure de la table `trapssnmp_serveurs`
--

CREATE TABLE `trapssnmp_serveurs` (
  `trapsnmp_id` int(11) NOT NULL,
  `serveur_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `trapssnmp_serveurs`
--

INSERT INTO `trapssnmp_serveurs` (`trapsnmp_id`, `serveur_id`) VALUES
(1, 1),
(1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `typeserveur`
--

CREATE TABLE `typeserveur` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `typeserveur`
--

INSERT INTO `typeserveur` (`id`, `nom`) VALUES
(2, 'Autres'),
(3, 'Baie'),
(4, 'Firewall'),
(5, 'Load_Balancer'),
(6, 'Machine_Virtuelle'),
(7, 'Proxy'),
(8, 'Routeur'),
(9, 'Serveur'),
(10, 'Switch');

-- --------------------------------------------------------

--
-- Structure de la table `url`
--

CREATE TABLE `url` (
  `id` int(11) NOT NULL,
  `ref` varchar(255) DEFAULT NULL,
  `etat_id` int(11) DEFAULT NULL,
  `refComposant` varchar(255) DEFAULT NULL,
  `rgSgSiCluster` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `performAction` text DEFAULT NULL,
  `criticite_id` int(11) DEFAULT NULL,
  `messageAlarme` text DEFAULT NULL,
  `instructions` text DEFAULT NULL,
  `intervalleDePolling` varchar(255) DEFAULT NULL,
  `refService` varchar(255) DEFAULT NULL,
  `objet` varchar(255) DEFAULT NULL,
  `monitoredBy_id` int(11) DEFAULT NULL,
  `nomTemplate` varchar(255) DEFAULT NULL,
  `demande_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `url`
--

INSERT INTO `url` (`id`, `ref`, `etat_id`, `refComposant`, `rgSgSiCluster`, `url`, `performAction`, `criticite_id`, `messageAlarme`, `instructions`, `intervalleDePolling`, `refService`, `objet`, `monitoredBy_id`, `nomTemplate`, `demande_id`) VALUES
(1, 'URL-001', 2, 'COMP-01', 'RG-CLUSTER', 'http://example.com/health', 'checkStatus', 1, 'Timeout sur l’URL', 'Relancer service', '15min', 'SRV-URL', 'Monitoring API REST', 3, 'template-api', 1),
(2, 'URL-001', 2, 'COMP-01', 'RG-CLUSTER', 'http://example.com/health', 'checkStatus', 1, 'Timeout sur l’URL', 'Relancer service', '15min', 'SRV-URL', 'Monitoring API REST', 3, 'template-api', 1);

-- --------------------------------------------------------

--
-- Structure de la table `url_serveurs`
--

CREATE TABLE `url_serveurs` (
  `url_id` int(11) NOT NULL,
  `serveur_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `url_serveurs`
--

INSERT INTO `url_serveurs` (`url_id`, `serveur_id`) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `support_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `email_verified_at`, `password`, `remember_token`, `role_id`, `support_id`, `created_at`, `updated_at`) VALUES
(1, 'einstein', 'einstein@example.com', NULL, '$2y$12$Y4a39OAaposQ7b1O9087yOBU0wPtDweC5gsuN3Q6Y3kauG8geROqu', NULL, 1, NULL, '2025-04-18 22:43:14', '2025-04-18 22:43:14'),
(2, 'nouvelutilisateur', 'nouvelutilisateur@example.com', NULL, '$2y$12$hGyyibQYfp/3JqF4alxIBuTO9wJg6LKTG7rOpP3krjWCN3YgT2kcW', NULL, NULL, NULL, '2025-04-28 09:58:50', '2025-04-28 09:58:50'),
(3, 'euler', 'euler@ldap.forumsys.com', NULL, '$2y$12$mSipAjLUxe8bXV9zE/l89uK4bQFS9vt9B8QGmpoUmdCZifubDGs0S', NULL, 1, NULL, '2025-04-28 14:41:20', '2025-04-28 14:41:20'),
(4, 'newton', 'newton@ldap.forumsys.com', NULL, '$2y$12$gEmlfmFnyw3/ogLndCJZ6uTID7MiWTPWfiILJn4Q5MGpyVICOXRUS', NULL, 1, NULL, '2025-05-12 13:51:10', '2025-05-12 13:51:10'),
(5, 'riemann', 'riemann@ldap.forumsys.com', NULL, '$2y$12$/dYef8MEI9F.HCcfz4k4l.Ont4pzoPZVUgjkPXu0gtW0BHIDLm.rK', NULL, 1, NULL, '2025-05-12 15:00:41', '2025-05-12 15:00:41'),
(6, 'tesla', 'tesla@ldap.forumsys.com', NULL, '$2y$12$5cI7o6Yfd2OBg//oOJHKlOlndsjCWl/ju68Tx/PlXLnzjrz6iGh/G', NULL, 2, NULL, '2025-05-15 20:35:22', '2025-05-15 20:35:22'),
(7, 'gauss', 'gauss@ldap.forumsys.com', NULL, '$2y$12$hdky9BEsY5CBw9W0x30e/.45evZeH/NORjt6kuIEMI7za/BYwyKhC', NULL, 2, NULL, '2025-05-15 20:36:07', '2025-05-15 20:36:07');

-- --------------------------------------------------------

--
-- Structure de la table `versionsnmp`
--

CREATE TABLE `versionsnmp` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `versionsnmp`
--

INSERT INTO `versionsnmp` (`id`, `nom`) VALUES
(1, 'Version 1'),
(2, 'Version 2');

-- --------------------------------------------------------

--
-- Structure de la table `ver_tech_firmware`
--

CREATE TABLE `ver_tech_firmware` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `ver_tech_firmware`
--

INSERT INTO `ver_tech_firmware` (`id`, `nom`) VALUES
(1, '2003 Enterprise Edition 32 bits'),
(2, '2000'),
(3, '2003 Enterprise Edition 32 bits'),
(4, '2003 Enterprise Edition 64 bits');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Index pour la table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Index pour la table `cluster`
--
ALTER TABLE `cluster`
  ADD PRIMARY KEY (`id`),
  ADD KEY `etat_id` (`etat_id`),
  ADD KEY `demande_id` (`demande_id`);

--
-- Index pour la table `cluster_serveurs`
--
ALTER TABLE `cluster_serveurs`
  ADD PRIMARY KEY (`cluster_id`,`serveur_id`),
  ADD KEY `serveur_id` (`serveur_id`);

--
-- Index pour la table `criticite`
--
ALTER TABLE `criticite`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `demandes`
--
ALTER TABLE `demandes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `status_id` (`status_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `serviceplatfom_id` (`serviceplatfom_id`);

--
-- Index pour la table `etat`
--
ALTER TABLE `etat`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Index pour la table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Index pour la table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `logfiles`
--
ALTER TABLE `logfiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `etat_id` (`etat_id`),
  ADD KEY `monitoredby_id` (`monitoredBy_id`),
  ADD KEY `demande_id` (`demande_id`);

--
-- Index pour la table `logfilespatterns`
--
ALTER TABLE `logfilespatterns`
  ADD PRIMARY KEY (`id`),
  ADD KEY `etat_id` (`etat_id`),
  ADD KEY `criticite_id` (`criticite_id`),
  ADD KEY `logfile_id` (`logfile_id`),
  ADD KEY `demande_id` (`demande_id`);

--
-- Index pour la table `logfiles_serveurs`
--
ALTER TABLE `logfiles_serveurs`
  ADD PRIMARY KEY (`logfile_id`,`serveur_id`),
  ADD KEY `serveur_id` (`serveur_id`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `monitoredby`
--
ALTER TABLE `monitoredby`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `os`
--
ALTER TABLE `os`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Index pour la table `platforme`
--
ALTER TABLE `platforme`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `process`
--
ALTER TABLE `process`
  ADD PRIMARY KEY (`id`),
  ADD KEY `etat_id` (`etat_id`),
  ADD KEY `criticite_id` (`criticite_id`),
  ADD KEY `monitoredby_id` (`monitoredBy_id`),
  ADD KEY `demande_id` (`demande_id`);

--
-- Index pour la table `process_serveurs`
--
ALTER TABLE `process_serveurs`
  ADD PRIMARY KEY (`process_id`,`serveur_id`),
  ADD KEY `serveur_id` (`serveur_id`);

--
-- Index pour la table `requetessql`
--
ALTER TABLE `requetessql`
  ADD PRIMARY KEY (`id`),
  ADD KEY `etat_id` (`etat_id`),
  ADD KEY `criticite_id` (`criticite_id`),
  ADD KEY `monitoredby_id` (`monitoredBy_id`),
  ADD KEY `demande_id` (`demande_id`);

--
-- Index pour la table `requetessql_serveurs`
--
ALTER TABLE `requetessql_serveurs`
  ADD PRIMARY KEY (`requetessql_id`,`serveur_id`),
  ADD KEY `serveur_id` (`serveur_id`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `scripts`
--
ALTER TABLE `scripts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `etat_id` (`etat_id`),
  ADD KEY `criticite_id` (`criticite_id`),
  ADD KEY `monitoredby_id` (`monitoredBy_id`),
  ADD KEY `demande_id` (`demande_id`);

--
-- Index pour la table `scripts_serveurs`
--
ALTER TABLE `scripts_serveurs`
  ADD PRIMARY KEY (`script_id`,`serveur_id`),
  ADD KEY `serveur_id` (`serveur_id`);

--
-- Index pour la table `serveurs`
--
ALTER TABLE `serveurs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `etat_id` (`etat_id`),
  ADD KEY `platforme_id` (`platforme_id`),
  ADD KEY `type_id` (`type_id`),
  ADD KEY `os_id` (`os_id`),
  ADD KEY `soclestandardomu_id` (`socleStandardOmu_id`),
  ADD KEY `demande_id` (`demande_id`),
  ADD KEY `serveurs_vertechfirmware_id_foreign` (`verTechFirmware_id`),
  ADD KEY `serveurs_serviceplatfom_id_foreign` (`serviceplatfom_id`);

--
-- Index pour la table `serviceplatfom`
--
ALTER TABLE `serviceplatfom`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `support_id` (`support_id`);

--
-- Index pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Index pour la table `soclestandardomu`
--
ALTER TABLE `soclestandardomu`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `support`
--
ALTER TABLE `support`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `trapssnmp`
--
ALTER TABLE `trapssnmp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `etat_id` (`etat_id`),
  ADD KEY `versionsnmp_id` (`versionSnmp_id`),
  ADD KEY `criticite_id` (`criticite_id`),
  ADD KEY `demande_id` (`demande_id`);

--
-- Index pour la table `trapssnmp_serveurs`
--
ALTER TABLE `trapssnmp_serveurs`
  ADD PRIMARY KEY (`trapsnmp_id`,`serveur_id`),
  ADD KEY `serveur_id` (`serveur_id`);

--
-- Index pour la table `typeserveur`
--
ALTER TABLE `typeserveur`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `url`
--
ALTER TABLE `url`
  ADD PRIMARY KEY (`id`),
  ADD KEY `etat_id` (`etat_id`),
  ADD KEY `criticite_id` (`criticite_id`),
  ADD KEY `monitoredby_id` (`monitoredBy_id`),
  ADD KEY `demande_id` (`demande_id`);

--
-- Index pour la table `url_serveurs`
--
ALTER TABLE `url_serveurs`
  ADD PRIMARY KEY (`url_id`,`serveur_id`),
  ADD KEY `serveur_id` (`serveur_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_email_unique` (`email`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `support_id` (`support_id`);

--
-- Index pour la table `versionsnmp`
--
ALTER TABLE `versionsnmp`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `ver_tech_firmware`
--
ALTER TABLE `ver_tech_firmware`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `cluster`
--
ALTER TABLE `cluster`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `criticite`
--
ALTER TABLE `criticite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `demandes`
--
ALTER TABLE `demandes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT pour la table `etat`
--
ALTER TABLE `etat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `logfiles`
--
ALTER TABLE `logfiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `logfilespatterns`
--
ALTER TABLE `logfilespatterns`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT pour la table `monitoredby`
--
ALTER TABLE `monitoredby`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `os`
--
ALTER TABLE `os`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `platforme`
--
ALTER TABLE `platforme`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `process`
--
ALTER TABLE `process`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `requetessql`
--
ALTER TABLE `requetessql`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `scripts`
--
ALTER TABLE `scripts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `serveurs`
--
ALTER TABLE `serveurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `serviceplatfom`
--
ALTER TABLE `serviceplatfom`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `soclestandardomu`
--
ALTER TABLE `soclestandardomu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `support`
--
ALTER TABLE `support`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `trapssnmp`
--
ALTER TABLE `trapssnmp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `typeserveur`
--
ALTER TABLE `typeserveur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `url`
--
ALTER TABLE `url`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `versionsnmp`
--
ALTER TABLE `versionsnmp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `ver_tech_firmware`
--
ALTER TABLE `ver_tech_firmware`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `cluster`
--
ALTER TABLE `cluster`
  ADD CONSTRAINT `cluster_ibfk_1` FOREIGN KEY (`etat_id`) REFERENCES `etat` (`id`),
  ADD CONSTRAINT `cluster_ibfk_2` FOREIGN KEY (`demande_id`) REFERENCES `demandes` (`id`);

--
-- Contraintes pour la table `cluster_serveurs`
--
ALTER TABLE `cluster_serveurs`
  ADD CONSTRAINT `cluster_serveurs_ibfk_1` FOREIGN KEY (`cluster_id`) REFERENCES `cluster` (`id`),
  ADD CONSTRAINT `cluster_serveurs_ibfk_2` FOREIGN KEY (`serveur_id`) REFERENCES `serveurs` (`id`);

--
-- Contraintes pour la table `demandes`
--
ALTER TABLE `demandes`
  ADD CONSTRAINT `demandes_ibfk_1` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `demandes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `demandes_ibfk_3` FOREIGN KEY (`serviceplatfom_id`) REFERENCES `serviceplatfom` (`id`);

--
-- Contraintes pour la table `logfiles`
--
ALTER TABLE `logfiles`
  ADD CONSTRAINT `logfiles_ibfk_1` FOREIGN KEY (`etat_id`) REFERENCES `etat` (`id`),
  ADD CONSTRAINT `logfiles_ibfk_2` FOREIGN KEY (`monitoredBy_id`) REFERENCES `monitoredby` (`id`),
  ADD CONSTRAINT `logfiles_ibfk_3` FOREIGN KEY (`demande_id`) REFERENCES `demandes` (`id`);

--
-- Contraintes pour la table `logfilespatterns`
--
ALTER TABLE `logfilespatterns`
  ADD CONSTRAINT `logfilespatterns_ibfk_1` FOREIGN KEY (`etat_id`) REFERENCES `etat` (`id`),
  ADD CONSTRAINT `logfilespatterns_ibfk_2` FOREIGN KEY (`criticite_id`) REFERENCES `criticite` (`id`),
  ADD CONSTRAINT `logfilespatterns_ibfk_3` FOREIGN KEY (`logfile_id`) REFERENCES `logfiles` (`id`),
  ADD CONSTRAINT `logfilespatterns_ibfk_4` FOREIGN KEY (`demande_id`) REFERENCES `demandes` (`id`);

--
-- Contraintes pour la table `logfiles_serveurs`
--
ALTER TABLE `logfiles_serveurs`
  ADD CONSTRAINT `logfiles_serveurs_ibfk_1` FOREIGN KEY (`logfile_id`) REFERENCES `logfiles` (`id`),
  ADD CONSTRAINT `logfiles_serveurs_ibfk_2` FOREIGN KEY (`serveur_id`) REFERENCES `serveurs` (`id`);

--
-- Contraintes pour la table `process`
--
ALTER TABLE `process`
  ADD CONSTRAINT `process_ibfk_1` FOREIGN KEY (`etat_id`) REFERENCES `etat` (`id`),
  ADD CONSTRAINT `process_ibfk_2` FOREIGN KEY (`criticite_id`) REFERENCES `criticite` (`id`),
  ADD CONSTRAINT `process_ibfk_3` FOREIGN KEY (`monitoredBy_id`) REFERENCES `monitoredby` (`id`),
  ADD CONSTRAINT `process_ibfk_4` FOREIGN KEY (`demande_id`) REFERENCES `demandes` (`id`);

--
-- Contraintes pour la table `process_serveurs`
--
ALTER TABLE `process_serveurs`
  ADD CONSTRAINT `process_serveurs_ibfk_1` FOREIGN KEY (`process_id`) REFERENCES `process` (`id`),
  ADD CONSTRAINT `process_serveurs_ibfk_2` FOREIGN KEY (`serveur_id`) REFERENCES `serveurs` (`id`);

--
-- Contraintes pour la table `requetessql`
--
ALTER TABLE `requetessql`
  ADD CONSTRAINT `requetessql_ibfk_1` FOREIGN KEY (`etat_id`) REFERENCES `etat` (`id`),
  ADD CONSTRAINT `requetessql_ibfk_2` FOREIGN KEY (`criticite_id`) REFERENCES `criticite` (`id`),
  ADD CONSTRAINT `requetessql_ibfk_3` FOREIGN KEY (`monitoredBy_id`) REFERENCES `monitoredby` (`id`),
  ADD CONSTRAINT `requetessql_ibfk_4` FOREIGN KEY (`demande_id`) REFERENCES `demandes` (`id`);

--
-- Contraintes pour la table `requetessql_serveurs`
--
ALTER TABLE `requetessql_serveurs`
  ADD CONSTRAINT `requetessql_serveurs_ibfk_1` FOREIGN KEY (`requetessql_id`) REFERENCES `requetessql` (`id`),
  ADD CONSTRAINT `requetessql_serveurs_ibfk_2` FOREIGN KEY (`serveur_id`) REFERENCES `serveurs` (`id`);

--
-- Contraintes pour la table `scripts`
--
ALTER TABLE `scripts`
  ADD CONSTRAINT `scripts_ibfk_1` FOREIGN KEY (`etat_id`) REFERENCES `etat` (`id`),
  ADD CONSTRAINT `scripts_ibfk_2` FOREIGN KEY (`criticite_id`) REFERENCES `criticite` (`id`),
  ADD CONSTRAINT `scripts_ibfk_3` FOREIGN KEY (`monitoredBy_id`) REFERENCES `monitoredby` (`id`),
  ADD CONSTRAINT `scripts_ibfk_4` FOREIGN KEY (`demande_id`) REFERENCES `demandes` (`id`);

--
-- Contraintes pour la table `scripts_serveurs`
--
ALTER TABLE `scripts_serveurs`
  ADD CONSTRAINT `scripts_serveurs_ibfk_1` FOREIGN KEY (`script_id`) REFERENCES `scripts` (`id`),
  ADD CONSTRAINT `scripts_serveurs_ibfk_2` FOREIGN KEY (`serveur_id`) REFERENCES `serveurs` (`id`);

--
-- Contraintes pour la table `serveurs`
--
ALTER TABLE `serveurs`
  ADD CONSTRAINT `serveurs_ibfk_1` FOREIGN KEY (`etat_id`) REFERENCES `etat` (`id`),
  ADD CONSTRAINT `serveurs_ibfk_2` FOREIGN KEY (`platforme_id`) REFERENCES `platforme` (`id`),
  ADD CONSTRAINT `serveurs_ibfk_3` FOREIGN KEY (`type_id`) REFERENCES `typeserveur` (`id`),
  ADD CONSTRAINT `serveurs_ibfk_4` FOREIGN KEY (`os_id`) REFERENCES `os` (`id`),
  ADD CONSTRAINT `serveurs_ibfk_5` FOREIGN KEY (`socleStandardOmu_id`) REFERENCES `soclestandardomu` (`id`),
  ADD CONSTRAINT `serveurs_ibfk_6` FOREIGN KEY (`demande_id`) REFERENCES `demandes` (`id`),
  ADD CONSTRAINT `serveurs_serviceplatfom_id_foreign` FOREIGN KEY (`serviceplatfom_id`) REFERENCES `serviceplatfom` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `serveurs_vertechfirmware_id_foreign` FOREIGN KEY (`verTechFirmware_id`) REFERENCES `ver_tech_firmware` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `serviceplatfom`
--
ALTER TABLE `serviceplatfom`
  ADD CONSTRAINT `serviceplatfom_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `serviceplatfom_ibfk_2` FOREIGN KEY (`support_id`) REFERENCES `support` (`id`);

--
-- Contraintes pour la table `trapssnmp`
--
ALTER TABLE `trapssnmp`
  ADD CONSTRAINT `trapssnmp_ibfk_1` FOREIGN KEY (`etat_id`) REFERENCES `etat` (`id`),
  ADD CONSTRAINT `trapssnmp_ibfk_2` FOREIGN KEY (`versionSnmp_id`) REFERENCES `versionsnmp` (`id`),
  ADD CONSTRAINT `trapssnmp_ibfk_3` FOREIGN KEY (`criticite_id`) REFERENCES `criticite` (`id`),
  ADD CONSTRAINT `trapssnmp_ibfk_4` FOREIGN KEY (`demande_id`) REFERENCES `demandes` (`id`);

--
-- Contraintes pour la table `trapssnmp_serveurs`
--
ALTER TABLE `trapssnmp_serveurs`
  ADD CONSTRAINT `trapssnmp_serveurs_ibfk_1` FOREIGN KEY (`trapsnmp_id`) REFERENCES `trapssnmp` (`id`),
  ADD CONSTRAINT `trapssnmp_serveurs_ibfk_2` FOREIGN KEY (`serveur_id`) REFERENCES `serveurs` (`id`);

--
-- Contraintes pour la table `url`
--
ALTER TABLE `url`
  ADD CONSTRAINT `url_ibfk_1` FOREIGN KEY (`etat_id`) REFERENCES `etat` (`id`),
  ADD CONSTRAINT `url_ibfk_2` FOREIGN KEY (`criticite_id`) REFERENCES `criticite` (`id`),
  ADD CONSTRAINT `url_ibfk_3` FOREIGN KEY (`monitoredBy_id`) REFERENCES `monitoredby` (`id`),
  ADD CONSTRAINT `url_ibfk_4` FOREIGN KEY (`demande_id`) REFERENCES `demandes` (`id`);

--
-- Contraintes pour la table `url_serveurs`
--
ALTER TABLE `url_serveurs`
  ADD CONSTRAINT `url_serveurs_ibfk_1` FOREIGN KEY (`url_id`) REFERENCES `url` (`id`),
  ADD CONSTRAINT `url_serveurs_ibfk_2` FOREIGN KEY (`serveur_id`) REFERENCES `serveurs` (`id`);

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`support_id`) REFERENCES `support` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
