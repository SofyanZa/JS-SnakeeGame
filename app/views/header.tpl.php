<?php

$pageTitle = '';

if (isset($viewVars['title'])) {
    $pageTitle = $viewVars['title'];
}
?>


<!DOCTYPE html>
<html>
    <head>
        <title>Snakee Game - By Rocket ©</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
        <link rel="stylesheet" href="<?= getAssetAbsoluteURL('css/style.css'); ?>">
        <link rel="shortcut icon" type="image/png" href="./public/img"/>
        <link href="https://fonts.googleapis.com/css?family=PT+Sans" rel="stylesheet">
    </head>
<body class="body">
    <header>
        <div class="d-flex justify-content-center bd-highlight">
            <h1 class="text-center mr-4 font-weight-bold pt-5">Snake By Rocket © </h1>
        </div>
        <div id="volet">
            <i class="fas fa-user-graduate fa-2x font-weight-bold text-white mb-3"></i>
            <p>Les règles sont simples : Vous avez <strong>3 vies</strong> seulement.</p>
            <p>A la fin de vos 3 essais, le jeu s'arrête et vous pourrez voir vos résultats et ceux des collègues de la promo.</p>
            <p>Bonne chance à tous, que le meilleur gagne !</p>
            <a href="#volet" class="ouvrir">RULES !</a>
            <a href="#volet_clos" class="fermer">CLOSE !</a>
        </div>
</header>



