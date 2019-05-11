<?php

// Front Controller

// Inclusion du fichier autoload.php de Composer
include __DIR__ . '/../vendor/autoload.php';

// Chargement des fichiers de classes / fonctions
include __DIR__ . '/../app/utils/assets-functions.php';
include __DIR__ . '/../app/utils/DBData.php';

// Chargement de Controller
// Le fichier COre controller doit être avant le main pour pouvoir fonctionner correctemment ( pour qu'il puisse hériter )
include __DIR__ . '/../app/Controllers/CoreController.php';
include __DIR__ . '/../app/Controllers/MainController.php';
include __DIR__ . '/../app/Controllers/ErrorController.php';

// Chargement des Models
// include __DIR__ . '/../app/models/CoreModel.php';


// Router : définit les routes de notre application (l'ensemble des URLs possibles)
// Etape 1. : On configure AltoRouter (http://altorouter.com/usage/rewrite-requests.html)
$router = new AltoRouter();

// dump($router);

$router->setBasePath($_SERVER['BASE_URI']);

// Etape 2. : On définit nos routes (l'ensemble des URLs que va gérer notre site) (http://altorouter.com/usage/mapping-routes.html)
$router->map('GET', '/', 'MainController#home', 'home');
$router->map('GET', '/register', 'MainController#register', 'register');
$router->map('GET', '/developers', 'MainController#developers', 'developers');

// dump($router);


// dump($router);

/*
Reverse routing
dump(
    $router->generate('home'),
    $router->generate('legal-mentions'),
    $router->generate('category', ['id' => 1]),
    $router->generate('category', ['id' => 2]),
    $router->generate('category', ['id' => 3]),
    $router->generate('product', ['id' => 1]),
    $router->generate('product', ['id' => 100]),
    $router->generate('paginated_category', [
        'id' => 1,
        'page' => 10
    ]),
    $router->generate('paginated_category', [
        'id' => 1,
        'page' => 2
    ])
);
exit;
*/

// Etape 3. : On vérifie si l'URL courante correspond à une route définie précédemment (http://altorouter.com/usage/matching-requests.html)
$match = $router->match();

// dump($match);

// Dispatcher : il exécute le bon controller en fonction de l'URL détectée
if ($match != false) {
    // On dispatche
    // Altorouter, en retour de la méthode map, nous envoie un tableau contenant entre autres la target de la route détectée. On la découper avec la fonction explode en utilisant comme delimiter le caractère #
    // https://www.php.net/manual/fr/function.explode.php
    // dump($match['target']);
    $controllerInformations = explode('#', $match['target']);
    // Par exemple, la chaîne MainController#home sera découpée en un tableau qui vaudra [0 => 'MainController', 1 => 'home']
    $controllerName = $controllerInformations[0];
    $methodName = $controllerInformations[1];

    // dump($controllerInformations, $controllerName, $methodName);

    // En reprennant l'exemple ci-dessus, $controllerName === 'MainController' et $methodName === 'home')

    /*
    En PHP, on peut créer une instance d'une classe à partir d'une variable qui contient son nom
    On pourrait vérifier que la classe contenue dans $controllerName existe avec la fonction native de PHP class_exists
    */
    $controller = new $controllerName($router);
    /*
    En reprennant l'exemple ci-dessus, la ligne reviendrait à faire $controller = new MainController();
    */
    // dump($controller);

    /*
    En PHP, on peut exécuter une méthode d'un objet à partir d'une variable qui contient son nom
    On pourrait vérifier que la méthode contenue dans $methodName existe avec la fonction native de PHP method_exists
    */
    $controller->$methodName($match['params']);
    /*
    En reprennant l'exemple ci-dessus, la ligne reviendrait à faire $controller->home($match['params']);
    */
    /*
    On pourrait envoyer la liste des paramètres d'AltoRouter un par un, voir la fonction native de PHP call_user_func_array
    */
} else {

    $controller = new ErrorController($router);
    $controller->page404();
}

/*
// Router / Dispatcher
if (isset($_GET['_url'])) {
    $url = $_GET['_url'];
} else {
    $url = '/';
}

if ($url === '/') {
    // Homepage
    $controller = new MainController();
    $controller->home();
} else if ($url === '/mentions-legales') {
    // Mentions légales
    $controller = new MainController();
    $controller->legalMentions();
} else if ($url === '/mon-panier') {
    $controller = new CartController();
    $controller->cart();
} else {
    $controller = new ErrorController();
    $controller->page404();
}
*/