# Jeu du Snake version v1 en JS

Avec l'aide d'un tuto et de 3 collègues de la promo Rocket j'ai pris un peu d'avance sur ce qu'on a vu en cours et j'ai reproduis le jeu du Snake.
Moi qui avait des difficultés en JS, ça m'a permit d'un peu plus évoluer.
J'attend de ce challenge personnel qu'il m'aide à mieux comprendre les mécaniques de Javascript, de PHP et de Mysql !


![Snake Img](/img/serpent.jpg "Rocket Team")

### Système de jeu
- L'utilisateur aura 3 vies seulement, à la fin de la partie :
    - Un tableau des scores sera dréssé avec ses 3 scores + son meilleur score
    - En validant le tableau ci dessus, nous arrivons sur une nouvelle page de tableau des score avec cette fois ci les meilleurs scores des joueurs précédants   


## Ce que l'on doit faire :
- Trouver le moyen de faire une page d'accueil en mode Capcom avec un bouton "press start for continue" et en _bonus_ ... de la musique derrière (if possible in JS ?!) :+1:
- Mettre en place un système permettant à l'utilisateur de s'inscrire avec un pseudo et un mot de passe
- Mettre en place des tableaux récoltants les resultats des utilisateurs à long terme
- Mofidier le style


### Spoiler 1 :

<details>

**Problèmatique** :
Quand on appuie sur deux touches valides en même temps la fonction Game over s'éxécute.

**Solution** :
Ce qu'il se passe quand tu appuies sur plusieurs touches en même temps, c'est que ton code s'exécute plus rapidement que le rafraichissement de ton canvas, donc de ton image. Donc si les deux touches se suivent et sont des directions valables et bien ton serpent tourne deux fois et doit se rentrer dedans donc la fonction gameover s'exécute. Pour régler ce soucis tu peux créer une variable "canMove" que tu passes à false une fois que tu appuyer sur une direction valable et que tu repasses à true une fois ton canvas rafraîchit.

### Spoiler 2 :
<details>
    
**Solution** :turtle: :
Tu peux la créer dans ton scope global avant d'appeler init là où tu déclares les autres variables, afin de pouvoir la modifier n'importe où.
Ensuite dans ta fonciton advance(), la mettre à false.
Dans ta fonction refresh canvas si tu n'es pas en game over tu l'as repasse à true.
</details>
</details>


|
[Cliquez ici pour tester le jeu](http://sofyan-zarouri.vpnuser.oclock.io/Revisions/Snakee/html/)
|
