window.onload = function() { // Un gestionnaire d'évènement pour l'évènement load (chargement) de la fenêtre.
                            // Cela permet d'empêcher l'exécution du code avant le chargement complet de tous les éléments de la page.
                       
  
    // on crée la variable canvas en dehors de la méthode init pour qu'elle puisse avoir une portée plus large que celle de la fonction init
    var canvasWidth = 900;  // La largeur de notre canvas
    var canvasHeight = 600; // La hauteur de notre canvas
    var blockSize = 30; // la largeur d'un block qui correspond au block du canvas ou du serpent
    var ctx; // je créer la variable contexte pour pouvoir l'utiliser ensuite
    var delay = 100; // exprimé en millisecondes (1 seconde)
    // var xCoord = 0; // (x) horizontal : de base il est tout à gauche
    // var yCoord = 0; // (y) vertical ; de base il est tout en haut
    var snakee; // cette variable représente le serpent. L'objectif est de pouvoir l'utiliser dans toutes les méthodes (qu'elle ait une portée "globale"?)
    var applee; // une pomme qui s'appelle applee :)
    var widthInBlocks = canvasWidth/blockSize; // A VERIFIER 30 blocks en largeur (en comptant le 0). ici on veut connaitre la largeur à l'echelle de blocks (avant le canevas était représenté uniquement en pixel). Le total de la largeur des blocs contenus dans le canvas
    var heightInBlocks = canvasHeight/blockSize; // A VERIFIER 20 block en hauteur (en comptant le 0). le total de la hauteur des blocs contenus dans le canvas
    var score;
    var timeout; // Avant la création de cette variable nous avions un bug : quand on appuyait plusieurs fois sur la touche espace ça enregistrait le processus..
    // .. d'avant et l'aditionait, ce qui nous donnais un effet d'augmenter la difficultés, car le temps exprimé en milisecondes (delay) etait doublés à chaque fois qu'on appuait sur espace.
    
    // Je veux mettre une image de fond et une image de pomme a la place du carré tout mOCHE
    const Background = new Image();
    Background.src = "img/background.jpg";

    const imgApple = new Image();
    imgApple.src = "img/imgApple.jpg";

    init(); // ici on exécute la fonction crée en dessous
        
    function init(){ // on appelle et on créer la fonction init

        // le canvas est la zone dans lequel le jeu va se dérouler
        // on utilise la méthode creatElement pour créer le canvas dynamiquement
        // le canvas est désormais un élément du DOM 
        // https://developer.mozilla.org/fr/docs/Web/API/Document/createElement (ALT + CLICK POUR SUIVRE DIRECT LE LIEN)
        // Dans un document HTML, la méthode  document.createElement() crée un élément HTML du type spécifié par  tagName
        // exemple : var element = document.createElement(tagName[, options]);
        var canvas = document.createElement('canvas'); 
    
        canvas.width = canvasWidth; // on définit largeur du canvas 
        canvas.height = canvasHeight; // on définit la hauteur du canvas
        canvas.style.border = "30px solid gray"; // on ajoute un bordure au canvas pour pouvoir mieux la visualiser
        canvas.style.margin = "50px auto"; // Rappel css : pour centre auto un element il faut qu'il sois en display block
        canvas.style.display = "block"; // Voir ligne du dessus
        canvas.style.backgroundColor = "#ddd"; // on change la couleur de fond du canvas
        document.body.appendChild(canvas); // ICI on RELIE le Canvas et le html (document) via le body
        ctx = canvas.getContext('2d'); // Je met le contexte en 2d ( il y a 4 possibilités mais ici on choisis 2d) https://developer.mozilla.org/fr/docs/Web/API/HTMLCanvasElement/getContext
        snakee = new Snake([[6,4],[5,4],[4,4],[3,4],[2,4],[1,4]], "right"); // Le body [] est le corps complet du serpent qui est représenté par 3 blocks. le 1er crochet représente le canvas et les crochets chaque block
        // right signifie qu'il ira a droite de base 
        applee = new Apple([10,10]); // Son X et son Y ( x 10, y 10 )
        score = 0;
        refreshCanvas(); // on appelle la fonction refreshCanvas pour la charger

   
    }


    function refreshCanvas() { // à chaque seconde on appelle la fonction refreshCanvas qui va permettre de faire bouger le snake par défaut
        
        // xCoord += 2; // valeur horizontal ( direction vers laquelle le serpent va se deplacer)
        // yCoord += 2; // valeur vertical : si on met par exemple le yCoord à 0, le block ne se déplacera que sur le xCoord !!
         
         snakee.advance(); // Je veux d'abord faire avancer mon serpent pour voir SI-ENSUITE il y a eu une coolision

         if(snakee.checkCollision())  { // Si il y a eu une collision 

            gameOver() ;   
        } else {

            if(snakee.isEatingApple(applee)) {
                score++;
                snakee.ateApple = true; // Le serpent à mangé une pomme 

            do {
                applee.setNewPosition();
            }
            while(applee.isOnSnake(snakee)) // Je veux verifier si snakee est sur la pomme
            
        }
        // A chaque fois qu'une seconde passe ( 1000 milisecondes) on va le mettre dans une nouvelle position
        // ici on efface toute la largeur et la hauteur du canvas
        // https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/clearRect (ALT + CLICK POUR SUIVRE DIRECT LE LIEN)
        ctx.clearRect(0,0, canvasWidth, canvasHeight);
        
        // Ici la couleur de mon serpent
        // https://developer.mozilla.org/fr/docs/Tutoriel_canvas/Ajout_de_styles_et_de_couleurs (ALT + CLICK POUR SUIVRE DIRECT LE LIEN)
        //  ctx.fillStyle = "#3465A4"; 
        
        // (x, y, largeur, hauteur) x = horizontal, y = vertical, puis determiner la largeur et hauteur du block serpent
        // xCoord et yCoord sont les coordonnées du serpent dont les valeurs vont bouger à chaque fois que le canvas va être refresh
        // https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/fillRect (ALT + CLICK POUR SUIVRE DIRECT LE LIEN)
        //  ctx.fillRect(xCoord, yCoord, 200, 30); 


        drawScore(); // L'ordre dans lequel j'appelle mes fonctions sont determinantes pour la suite
                     // Du coup le score sera placé en premier et donc au dernier plan
        snakee.draw(); // Je veux que mon serpent se dessine. Il passera sur le score car il est codé en dessous de DrawScore

        applee.draw(); // je veux qe la pomme se dessine quand on rafraichit la page
        
        // setTimeout permet de définir un « minuteur » (timer) qui exécute une fonction ou un code donné après la fin du délai indiqué.
        // Execute moi refreshCanvas à chaque fois qu'un certain délai est passé (ici delay = 1000 milisecondes)
        // https://developer.mozilla.org/fr/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
        timeout = setTimeout(refreshCanvas, delay);
    }
    
}
function gameOver(){
    ctx.save();
    ctx.font = "bold 70px sans-serif";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "orange"; // Ajout d'une bordure blanche
    ctx.lineWidth = 2; // épaisseur de la bordure
    var centreX = canvasWidth / 2;
    var centreY = canvasHeight / 2;
    ctx.strokeText("Game Over", centreX , centreY -180); // stroke c'est pour avoir une bordure
    ctx.fillText("Game Over", centreX, centreY - 180); // Je veux ajouter du texte, (texte, position x, position y,) 
    ctx.font = "bold 30px sans-serif";
    ctx.strokeText("Appuyer sur la touche espace pour rejouer",  580, 570);
    ctx.fillText("Appuyer sur la touche espace pour rejouer", 580, 570);
    ctx.restore();
}  


function restart(){ // Cette fonction permet au joueur de relancer une partie en appuyant sur la touche espace

    document.querySelectorAll('.background-sound').remove();
    backgroundSound = document.createElement('audio');
    backgroundSound.src = '../back_in_summer.mp3';
    backgroundSound.setAttribute('autoplay', 'true');
    backgroundSound.classList.add('background-sound');
    backgroundSound.volume = 0.05;
    backgroundSound.setAttribute('type', 'audio/mp3');
    
    document.body.appendChild(backgroundSound);
    snakee = new Snake([[6,4],[5,4],[4,4],[3,4],[2,4],[1,4]], "right"); 
    applee = new Apple([10,10]);
    score = 0;  // Quand tu restart la partie tu recommence logiquement à 0 points.
    clearTimeout(timeout); // Voir bug de la touche espace en haut
    refreshCanvas(); 

}  
    function drawScore() {
        ctx.save();
        ctx.font = "bold 200px sans-serif"; 
        ctx.fillStyle = "orange";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle"; // ici on met la baseline à middle car sinon le score etait trop haut
        var centreX = canvasWidth / 2;
        var centreY = canvasHeight / 2;
        // score est un number à l'arrivée , on veut le retourner sous forme de caractères
        ctx.fillText(score.toString(), centreX, centreY); 
        ctx.restore();
    }

    function drawBlock(ctx,position) {
        // le canvas on ne lui parle pas en terme de block (il ne comprend notre définition de block), il comprend que les pixels
        // https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/fillRect
        // ctx.fillRect(x, y, largeur, hauteur);
        var x = position[0] * blockSize; // la position de la longueur c'est le x de notre block * la taille de chaque block. position[0] c'est l'index du tableau qui stocke la longueur du block
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize); // ici on veut remplir le rectangle. ce rectangle fera une taille de la taille de nos blocksizes
    }

    // Je crée une fonction pour créer le serpent avec en parametre son body ( le prototype de notre serpent, si jamais on voulait en avoir plusieurs)
    // body = corps du serpent
    function Snake(body, direction) { // body represente le carré du snake rien à voir <body>, on rajoute la direction a notre function constructeur
        this.body = body; 
        this.direction = direction;
        // Rappel sur this :
        // https://github.com/O-clock-Alumni/fiches-recap/blob/master/js/this.md (ALT + CLICK POUR SUIVRE DIRECT LE LIEN)
        // https://www.youtube.com/watch?v=IudrkWwOw8Y (ALT + CLICK POUR SUIVRE DIRECT LE LIEN)
        // Quand tu fais un console.log(this) ça te renvoie window, la valeur de l'objet global
        // lorsqu'il appelé  this fait référence à l'objet global
        // La valeur de this change si on l'appelle dans une methode 
        // lorsqu'il est appelé dans une methode d'un objet, this vaut alors la valeur de l'objet en question
        this.ateApple = false; // Lorsque le serpent A mangé une pomme, on le met a false car sinon il grandirait des le premier coup


        this.draw = function() { // methode qui permettra de dessiner le corps de notre serpent dans le canvas
            
            // save() ---> Sauvegarde l'état du canevas dans sa globalité
            // Les états du canvas sont stockés dans une pile. 
            // Chaque invocation de la méthode save() ajoute une copie de l'état courant  du canvas en haut de la pile.
            // La méthode save() peut être invoquée autant de fois que nécessaire. 
            // Chaque appel de restore() enlève le dernier état sauvegardé de la pile et tous les paramètres sauvegardés sont restaurés.
            ctx.save(); // sauvegarder le contexte du canvas cad son contenu comme il était avant que je commence à rentrer dans cette fonction
            ctx.fillStyle = "green";
          
            
            // Pour rappel : le corps du serpent est un ensemble de petits blocks, ces blocks sont définis par son body
            // chaque block a un X et un Y que nous allons mettre dans des tableaux
            // chaque block ( du corps du serpent) sera un tableau avec deux valeurs son X et son Y
                // tant que le i est inferieur à la longueur du corps du serpent
                // ( body est un array donc on peut utiliser la proprité length )
                // ce for permettra de passer sur chacun des membres du body du serpent
                for(var i = 0; i < this.body.length; i++) { 

                    // La variable this a comme valeur l’objet qui est en train d’être construit.

                    // permet de dessiner un block, (contexte du canvas dans lequel elle doit dessiner, et la position du block à dessiner )
                    // On veut passer sur chacun des blocks du body
                    // Au debut de la boucle i = 0, ensuite i = 1, i= 2 etc .. jusqu'a 3 ( le nombre de nos blocks dans le body du serpent)
                    drawBlock(ctx, this.body[i]); 

             }
            ctx.restore()  // restore() ---> Restore le plus récent état sauvegardé du canevas.
        };

        this.advance = function() {// fonction pour le faire avancer 
        // On duplique la tete et on enleve le dernier element du corps ( la queue ) pour le faire déplacer 

        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/slice
        // Slice permet de couper-coller un element ; Le tableau original ne sera pas modifié.
        // this.body[0] est la tete de notre serpent ( le premier element de notre body)

        // la variable nextPosition sera la nouvelle position de la tête        
        var nextPosition = this.body[0].slice(); 
                            
        // Ici on fait avancer le serpent d'une case juste selon l'axe des X ( fait réference au 6 du Snake) en partant de la tête vers la droite (+1). 
        // exemple, si on veut changer la position de l'axe des X en partant vers la gauche on va écrire nextPosition[0] -= 
     
        switch(this.direction) {
            case "left":
            nextPosition[0] -= 1; // Position X - 1 pour le faire déplacer vers la gauche
                break;
            case "right":
            nextPosition[0] += 1; // Position X + 1 pour le faire déplacer vers la droite
                break;
            case "down":
            nextPosition[1] += 1; // Position Y + 1 pour le faire déplacer vers le bas
                break;
            case "up":
            nextPosition[1] -= 1; // Position Y - 1 pour le faire déplacer vers le haut
                break;
            default: // sinon on utilise throw() fonction qui nous permet de renvoyer un message d'erreur
                throw("Invalid Direction");
        }
        // unshit() fonction qui marche sur des array, permet de rajouter ce qu'il y a entre parenthese (ici nextPosition) à la premiere place
        // Une fois que je fais unshift nexposition, il y aura maintenant 4 elements. On rajoute [7,4] automatiquement grace à ça
        this.body.unshift(nextPosition);
        // J'ai besoin maintenant de supprimer la derniere position du corp du serpent avec pop()
        if(!this.ateApple) { // Si il n'a pas mangé la pomme 
        // Si le serpent a mangé une pomme je ne veux pas faire cette fonction pop car sinon ça va retirer un block alors qu'il est censé GROSSIR !
        this.body.pop(); // pop permet de supprimer le dernier element d'un array donc la queue 
        }
        else {
            this.ateApple = false;
             }
        };

        // Le cheminement : Si le serpent à mangé une pomme [ligne 55 : if(snakee.checkCollision()] on fait alors [Ligne 56  snakee.ateApple = true;]
        // Et donc quand j'avancerais au prochaine coup [Ligne 177 : if(!this.ateApple)] je ne ferais pas la fonction [Ligne 179 : this.body.pop();]
        // Mais je mettrais à ce moment là le ateApple ( a mangé ) à faux
        
        
        this.setDirection = function(newDirection) // la fonction va donner la direction
    {
        var allowedDirections; // directions autorisées
        switch(this.direction)
        {
        case "left": // Quand tu te deplace sur la gauche et la droite tu ne peux aller que en haut ou en bas
        case "right":
            allowedDirections = ["up", "down"]; // ici c'et un array donc l'index 0,1
            break;
        case "down": // Quand tu te deplace vers le bas et le haut tu ne peux aller que en gauche ou a droite
        case "up":
            allowedDirections = ["left", "right"]; // ici c'et un array donc l'index 0,1
            break;
         default: // sinon on utilise throw() fonction qui nous permet de renvoyer un message d'erreur
            throw("Invalid Direction"); 
            
        }
        
        if(allowedDirections.indexOf(newDirection) > -1) // si l'index de ma nouvelle direction dans mes allowDirections est supérieur à -1 alors la nouvelle direction est permise
        // alloweDirections est un array qui a pour index 0 les x et pour index 1 les y
        //donc si la nouvelle direction n'est pas égale à l'index 0 et 1 alors elle n'est pas permis        
        // la direction est vraie tant que la tête du serpent ne prend la position de la queue .Si la direction est permise car  .. indexOf(élémentRecherché = L'élément qu'on cherche dans le tableau )
        // indexOf compare élémentRecherché aux éléments contenus dans le tableau en utilisant une égalité stricte (la même méthode utilisée par l'opérateur ===).
       
        {
            this.direction = newDirection; // La direction actuelle du serpent sera la nouvelle direction
        }
    };

    this.checkCollision = function() { //function qui permet de detecter une colision avec le mur ou avec le serpent lui meme.
       //debugguer;
        var wallCollision = false; // on créer cette variable pour déterminer le fait que le serpent touche un mur qui est de base FAUX. ça sera faux tant qu'on aura pas toucher de mur
        var snakeCollision =  false; // Pareil pour le serpent. le serpent de base il touche pas son corps, sinon on ne pourrait pas jouer et on aurait game over tout le temps :'D
        
        var head = this.body[0]; //ici on créer une variable pour désigner la tete du serpent. la premiere partie du corps a se prendre une colision sera la tete. 
        var rest = this.body.slice(1); // ici on créer une variable pour désigner le corps du serpent. on met slice(1) pour couper la tete du serpent et attribuer le reste au corps 
        // La méthode slice() renvoie un objet tableau, contenant une copie superficielle (shallow copy) d'une portion du tableau d'origine,
        // la portion est définie par un indice de début et un indice de fin (exclus). Le tableau original ne sera pas modifié.
        
        var snakeX = head[0]; // Le head est un array de deux valeurs : le X
        var snakeY = head[1]; // et le Y

        var minX = 0; // Bordure de gauche definir  le minimmum X ( l'horizontal de nos blocks ) à 0 . minX = mur de gauche
        var minY = 0;  // Bordure du haut definir  le minimmum Y ( le vertical de nos blocks ) à 0   minY = mur du haut
        var maxX = widthInBlocks -1; // maxX = Bordure de droite . définir le maximum X  vu que l'on démarre à partir de 0 et qu'il y a 30 blocks a l'horitzontal on fais -1 (= 29) (pour pouvoir prendre en compte le 0)
        var maxY = heightInBlocks -1; // maxY = Bordure du bas . definir  le maximum Y vu que l'on démarre à partir de 0 et qu'il y a 20 blocks a la vertical on fais -1 (= 19) (pour pouvoir prendre en compte le 0)
        
        var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;// si la tête du serpent n'est pas situé entre les 2 murs horizontaux, c'est qu'il sera en dehors du canvas
        var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY; // si la tête du serpent n'est pas situé entre les 2 murs verticaux, c'est qu'il sera en dehors du canvas

        // Condition : Si je ne suis pas dans les murs horizontaux OU si je ne suis pas dans les murs verticaux
        // ALors le serpent à touché un mur
        // on va faire une vérification pour savoir que le serpent ne s'est pas pris un mur
        if(isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
            wallCollision = true;
        }

        // ici on veut vérifier que le serpent n'a pas touché son corps avec sa tête    
        // rest.lenght = le reste du corps ( tout son corps sauf sa tête)

        for(var i = 0; i < rest.length ; i++) { // A VERIFIER
            // Je veux vérifier si la tête et le corps ont le meme X et le meme Y ( ça voudra dire qu'ils sont sur la meme case donc GAME OVER)
            if(snakeX === rest[i][0] && snakeY === rest[i][1]) {
                snakeCollision = true;
            }

        }
        // Il suffira qu'il y ai une seule des deux conditions qui soit vrai pour retourner true
        return wallCollision || snakeCollision;
    }; 

    this.isEatingApple = function(appleToEat) { // Est ce qu'il est en train de manger une pomme. En argument on met les coordonées d'une pomme (1 block).
        var head = this.body[0]; //  ici on créer une variable pour désigner la tete du serpent
        // Si le x ET le y de mon serpent ( sa tete ) est égale à la tete de la pomme
        if(head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1]) {
            appleSound = document.createElement('audio');
            appleSound.src = '../pomme.mp3';
            appleSound.setAttribute('autoplay', 'true');
            appleSound.classList.add('apple');
            appleSound.setAttribute('type', 'audio/mp3');
            
            document.body.appendChild(appleSound);

            setTimeout(function () {
                document.querySelector('.apple').remove();
            }, 1000);
        return true; // Ça veut dire que je suis sur la pomme
    } else { // sinon ça veut dire que je ne suis PAS sur la pomme

    };
    }
} // ici c'est la fermeture du snake !!! LOL :'D

    function Apple(position){ //ici on va faire comme avec la position du serpent. // Elle a juste besoin d'une position donc position en parametre
    
    this.position = position;
    
    this.draw = function() { // fonction qui permet de dessiner la pomme
        ctx.save(); // Pour sauvegarder les anciens parametres dans le contexte
        ctx.fillStyle = "#CC0000";
        ctx.beginPath(); // A VERIFIER!!!!!!!!!!!!!!!!!!!!!!!!!!!!  On veut que la form soit ronde, donc pas de Rect 
        
        var radius = blockSize/2; // le rayon  (var radius) c'est la position du block divisé par 2
        var x = this.position[0]*blockSize + radius; //position[0] c'est toujours la coordonée de x
        var y = this.position[1]*blockSize + radius; // position[1] c'est toujours la coordonée de y
        // ctx.arc(x, y, rayon, angleDépart, angleFin, sensAntiHoraire);
        // x = La position en x du centre de l'arc.
        // y = La position en y du centre de l'arc.
        ctx.arc(x,y,radius, 0, Math.PI*2, true); // si c'est un cercle : il faut multiplier le diamètre par le nombre pi . ici on dessine le cercle
        ctx.fill(); 
        ctx.restore(); // Pour restorer les anciens parametres dans le contexte

         };
         this.setNewPosition = function() { // on Va donner une nouvelle position à notre pomme
            // Math random() donne un chiffre alétoire entre 0 et 1
            // Math.round() retourne la valeur d'un nombre arrondi à l'entier le plus proche.
            // Nous on veut que la pomme apparaisse aleatoirement dans le canvas donc entre en 0 
            var newX = Math.round(Math.random() * (widthInBlocks - 1)); // ça va nous retourner un chiffre ENTIER entre 0 et 29
            var newY = Math.round(Math.random() * (heightInBlocks - 1)); // ça va nous retourner un chiffre ENTIER entre 0 et 29
            this.position = [newX, newY];
         };
         // Vu que la position de la pomme est aléatoire et que le serpent bouge, on peut se retrouver dans une situation pas normale (bug)
         // et donc voir la pomme sur le corps du serpent on créer donc une fonction avec :
         this.isOnSnake = function(snakeToCheck) { // fonction : La pomme est-elle sur le serpent ?
         var isOnSnake = false; // De base la pomme n'est pas sur le serpent
         for(var i = 0; i < snakeToCheck.body.length; i++){ // On va passer sur tout le corps du serpent ( body est un array pour rappel)
            // Si le X et le Y de ma pomme est égal à au corps du serpent alors la pomme est sur le serpent
            if(this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]) {
            isOnSnake = true;
            }
         }
         return isOnSnake;
    };
} // Fermeture de Apple LOL

    // on veut que la direction change en fonction de ce que tape l'utilisateur
    // L'évènement onkeydown se déclenche lorsque qu'une touche du clavier est enfoncée.
    // on créer une fonction handlekeydown avec un evenemnt (e) en parametre (on peut transmettre chaque evenement)
    document.onkeydown = function handleKeyDown(event) { // event = evenement Lorque qu'on appui sur la touche

    var key = event.keyCode; // A VERIFIER : la variable key a pour valeur l'evenement d'appuyer sur une touche et donc le code numérique de la touche
     //Le langage Javascript associe à chaque touche du clavier un code numérique. Ainsi toute série de touches (et donc de lettres) peut être encodée avec des nombres.
     
    var newDirection; // choisir la direction EN FONCTION de ce que l'utilisateur a appuyé
    switch(key) // Si key est vérifié, donc si un utilisateur appui sur une touche (event.keyCode)
    {
        case 37: // 37 correspond au code de la touche "fleche de gauche"
        newDirection = "left";
            break;
        case 38: // 38 correspond au code de la touche "fleche du haut"
        newDirection = "up";
            break;
        case 39: // 39 correspond au code de la touche "fleche de droite"
            newDirection = "right";
            break;
        case 40: // correspond au code de la touche "fleche du bas"
        newDirection = "down";
            break;
        case 32: // correspond à la touche espace
            restart();
            return;
        default: // si le code tappé n'est pas 37/38/39 ou 40, je ne continue pas la fonction, donc je l'arrete avec un return
            return;
    }        
    snakee.setDirection(newDirection);
    }

}