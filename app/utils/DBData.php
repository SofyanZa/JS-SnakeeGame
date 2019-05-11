<?php

/**
 * Classe permettant de retourner des données stockées dans la base de données
 */
class DBData {
	/** @var PDO */
	private $dbh;

    /**
     * Constructeur se connectant à la base de données à partir des informations du fichier de configuration
     */
    public function __construct() {
        // Récupération des données du fichier de config
        //   la fonction parse_ini_file parse le fichier et retourne un array associatif
        // Attention, "config.conf" ne doit pas être versionné,
        //   on versionnera plutôt un fichier d'exemple "config.dist.conf" ne contenant aucune valeur
        $configData = parse_ini_file(__DIR__.'/../config.conf');

        try {
            $this->dbh = new PDO(
                "mysql:host={$configData['DB_HOST']};dbname={$configData['DB_NAME']};charset=utf8",
                $configData['DB_USERNAME'],
                $configData['DB_PASSWORD'],
                array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING) // Affiche les erreurs SQL à l'écran
            );
        }
        catch(\Exception $exception) {
            echo 'Erreur de connexion...<br>';
            echo $exception->getMessage().'<br>';
            echo '<pre>';
            echo $exception->getTraceAsString();
            echo '</pre>';
            exit;
        }
    }
    /**
     * Méthode permettant de retourner les données sur un produit donné
     *
     * @param int $productId
     * @return Product
     */
    public function getProductDetails($productId) {
        $sql = "
            SELECT
                `id`,
                `name`,
                `description`,
                `picture`,
                `price`,
                `rate`,
                `status`,
                `created_at` AS 'createdAt',
                `updated_at` AS 'updatedAt',
                `brand_id` AS 'brandId',
                `category_id` AS 'categoryId',
                `type_id` AS 'typeId'
            FROM `product`
            WHERE `id` = $productId
        ";


       
        $pdoStatement = $this->dbh->query($sql);

        $pdoStatement->setFetchMode(PDO::FETCH_CLASS, 'Product');

        $product = $pdoStatement->fetch();

        return $product;
    }

    /**
     * Méthode permettant de retourner les données sur une catégorie donnée
     *
     * @param int $categoryId
     * @return Category
     */
    public function getCategoryDetails($categoryId) {
        $sql = "
            SELECT
                `id`,
                `name`,
                `subtitle`,
                `picture`,
                `home_order` AS 'homeOrder',
                `created_at` AS 'createdAt',
                `updated_at` AS 'updatedAt'
            FROM `category`
            WHERE `id` = $categoryId
        ";

        $pdoStatement = $this->dbh->query($sql);

        $pdoStatement->setFetchMode(PDO::FETCH_CLASS, 'Category');

        $category = $pdoStatement->fetch();

        return $category;
    }

    /**
     * Méthode permettant de retourner les données sur une marque donnée
     *
     * @param int $brandId
     * @return Brand
     */
    public function getBrandDetails($brandId) {

        // dump($brandId);

        // 1. Ecrire la requête SQL
        $sql = "
            SELECT
                `id`,
                `name`,
                `footer_order` AS 'footerOrder',
                `created_at` AS 'createdAt',
                `updated_at` AS 'updatedAt'
            FROM `brand`
            WHERE `id` = $brandId
        ";

        // dump($sql);
        /*
        Si on veut conserver la coloration synthaxique du SQL, on peut faire :
        $sql = <<<SQL
            SELECT *
            FROM `brand`
            WHERE `id` = 2;
        SQL;
        */

        // 2. Exécuter la requête SQL
        $pdoStatement = $this->dbh->query($sql);

        // Permet de définir le mode de récupération des données avec fetch ou fetchAll. FETCH_CLASS permet de récupérer les résultats sous la forme d'une instance d'une classe définie. Ici, Brand.
        $pdoStatement->setFetchMode(PDO::FETCH_CLASS, 'Brand');
        $brand = $pdoStatement->fetch();

        return $brand;
    }

    /**
     * Méthode permettant de retourner les données sur un type de produit donné
     *
     * @param int $typeId
     * @return Type
     */
    public function getTypeDetails($typeId) {
        // TODO
    }

    /**
     * Méthode permettant de retourner les 5 catégories sur la page d'accueil
     *
     * @return Category[]
     */
    public function getHomeCategories() {
        $sql = "
            SELECT
                `id`,
                `name`,
                `subtitle`,
                `picture`,
                `home_order` AS 'homeOrder',
                `created_at` AS 'createdAt',
                `updated_at` AS 'updatedAt'
            FROM `category`
            WHERE `home_order` != 0
            ORDER BY `home_order` ASC
            LIMIT 5
        ";

        $pdoStatement = $this->dbh->query($sql);

        $pdoStatement->setFetchMode(PDO::FETCH_CLASS, 'Category');
        $categoryList = $pdoStatement->fetchAll();

        // dump($categoryList);

        return $categoryList;
    }

    /**
     * Méthode permettant de retourner les 5 marques en bas de page
     *
     * @return Brand[]
     */
    public function getFooterBrands() {
        $sql = "
            SELECT
                `id`,
                `name`,
                `footer_order` AS 'footerOrder',
                'created_at' AS 'createdAt',
                'updated_at' AS 'updatedAt'
            FROM `brand`
            WHERE `footer_order` != 0
            ORDER BY `footer_order` ASC
            LIMIT 5;
        ";

        $pdoStatement = $this->dbh->query($sql);

        $pdoStatement->setFetchMode(PDO::FETCH_CLASS, 'Brand');
        $brandList = $pdoStatement->fetchAll();

        return $brandList;
    }

    /**
     * Méthode permettant de retourner les 5 types de produit en bas de page
     *
     * @return Type[]
     */
    public function getFooterTypes() {
        $sql = "
            SELECT
                `id`,
                `name`,
                `footer_order` AS 'footerOrder',
                'created_at' AS 'createdAt',
                'updated_at' AS 'updatedAt'
            FROM `type`
            WHERE `footer_order` != 0
            ORDER BY `footer_order` ASC
            LIMIT 5;
        ";

        $pdoStatement = $this->dbh->query($sql);

        $pdoStatement->setFetchMode(PDO::FETCH_CLASS, 'Type');
        $typeList = $pdoStatement->fetchAll();

        return $typeList;
    }
}
