<?php

// Test pour pouvoir avoir un background different en fonction de la page ou l'on se trouve
switch( $_GET['page'] ) {
   case "inscription" : 
        $background = "pub";   
   break;
   case "page2" :
         $background = "une/image2.jpg"; 
   break;
   case "une_page" : 
        $background = "une/image3.jpg";
   break;
   case "home" :
   default : 
        $background = "une/image/par/default.jpg"
   ; break;
}
?>