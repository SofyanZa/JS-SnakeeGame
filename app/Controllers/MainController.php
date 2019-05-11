<?php

//POO: rassembler et regrouper au sein d'une classe des propriétés et des méthodes pour avoir accès ou manipuler ces propriétés

// La classe vous servir à gérer l'affichage de nos pages en séparant les concepts
// Chargement automatique des classes gérées avec Composer
require __DIR__ . '/../../vendor/autoload.php';

class MainController{

  public function home()
  {
    //on pourra le cas échéant aller chercher des données , effectuer des traitements 
    //on appelle la méthode show avec la page correspondante
    $this->show('home', [
      'title'=> 'Snakee Home',               
    ]);
  }

  public function register()
  {
    $this->show('register', [
      'title'=> "Register",
    ]);
  }


  public function developers()
  {


    $this->showDev('developers', [
      'title'=> "Developers",
    ]);
  }




  public function error404()
  {
      $this->show('error404', [
          'title' => 'Page non trouvée, à quoi tu joues .. ?',
      ]);
  }


  /**
* Cette méthode factorise le bout de code qui était présent
* dans les point d'éntrées précédents (index.php, about.php)
* Il suffit de transmettre le nom du template
* du fichier à inclure
*/


public function show($viewName, $viewVars = array()) {
  // C'est sale mais pas trop le choix à ce stade
  global $router;
    include(__DIR__.'/../views/header.tpl.php');
    include(__DIR__.'/../views/'.$viewName.'.tpl.php');
    include(__DIR__.'/../views/footer.tpl.php');
  }


public function showDev($viewName, $viewVars = array()) {
  
  global $router;
  
    include(__DIR__.'/../views/'.$viewName.'.tpl.php');
   
  }
}
