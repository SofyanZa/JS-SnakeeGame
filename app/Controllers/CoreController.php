<?php

class CoreController
{
    protected $router;

    public function __construct($router)
    {
        $this->router = $router;
    }

    protected function show($viewName, $viewVars = [])
    {
        // Toutes les variables créées avant d'inclure des fichiers seront accessibles dans les fichiers inclus
        $router = $this->router;

        // Toutes les variables créée dans les fichiers inclus sont accessibles dans le fichier qui inclut ce fichier, mais également dans tous les fichiers qui seront inclus après celui-ci. Voir header.tpl.php qui crée la variable $router qui sera donc accessible dans toutes les vues
        //$viewVars['router'] = $this->router;

        //$dbData = new DBData;

        // $viewVars['footerBrandList'] = $dbData->getFooterBrands();
        // $viewVars['footerTypeList'] = $dbData->getFooterTypes();

        include __DIR__ . '/../views/header.tpl.php';
        include __DIR__ . '/../views/' . $viewName . '.tpl.php';
        include __DIR__ . '/../views/footer.tpl.php';
    }

    protected function send404()
    {
        /*
        // Manuellement
        http_response_code(404);
        $this->show('404');
        */

        // Avec le ErrorController
        $errorController = new ErrorController($this->router);
        $errorController->page404();
    }
}