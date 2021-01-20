/**
Une fonction map est "truc" qui va transformer un array
en un autre array en utilisant une fonction qu'on lui
passe en argument

Une fonction reduce est un "truc" qui va prendre en argument
une fonction qui combinera deux élément pour produire un nouvel
"élément", prenons l'exemple d'une fonction d'adition:

   [1,   7,   10,   32]   <- valeurs qui restent à traiter
0                    <- accumulateur
Première application de l'opération/fonction passée à reduce:
    [7,   10,   32]
1

Deuxièmes opération de réduction:
    [10,    32]
8

Troisième opération de réduction:
    [32]
18

Quatrième opération de réduction:
    []
50
Lorsqu'il n'y a plus de valeurs à traiter, reduce, retournera
l'accumalateur comme valeur de retour de l'appel à cette
fonction


Exemple de trace:
Soit const t = [1, 7, 10, 32]
Et l'appel: t.reduce((x,y)=>x+y, "le tab: ")

Au départ:
    [1, 7, 10, 32]  <- valeurs qui restent à traiter
"le tab: "          <- l'accumulateur

Après 1ère opé de réduction:
    [7, 10, 32]
"le tab: 1"

Après 2ème opé de réduction:
    [10, 32]
"le tab: 17"

Après 3ème opé de réduction:
    [32]
"le tab: 1710"

Après la 4ème opération de réduction:
    []
"le tab: 171032"


L'opération de réduction a du sens seulement lorsqu'on parle
de séquences et que l'on sait définir une fonction de réduction.
La fonction de réduction est la fonction passée à réduce, une fonction
qui prend deux arguments pour ne retourner qu'une seule valeur, cette valeur
sera la nouvelle valeur de l'accumulateur.


Revenons au contexte appli web et gestion d'état:

Introduisons gentillement la notion de réduction:
à l'accumulateur correspondra la notion d'état



                                            1ère action: retirer 900              2ème action: déposer 1000     3ème action: déposer 500    ...en attente de la suite des événements
{nom:"Keb", prénom:"Martin", solde:10000}

Après une opération de réduction:

                                               2ème action: déposer 1000     3ème action: déposer 500    ...en attente de la suite des événements
{nom:"Keb", prénom:"Martin", solde:9100}



Après une deuxième opé de réduction:

                                             3ème action: déposer 500    ...en attente de la suite des événements

{nom:"Keb", prénom:"Martin", solde:10100}

Après 3ème opé de réduction:
                            ...en attente de la suite des événements

{nom:"Keb", prénom:"Martin", solde:10600}   <- ici le state est à jour



Ici la séquence à traiter consiste en la séquence des actions à effectuer sur le state (l'accumulateur)


dans la pratique on modélisera une action par un objet disposant de deux champs, par exemple:

const action = {type: "retrait", valeurDeModif:500}

rq:
valeurDeModif: l'information qui me permet d'effection l'action du type action.type et d'arriver à la nouvelle
valeur de state voulu. C'est la data nécessaire à l'éxécution de l'action. Elle sera appelée en pratique "payload"

const action = {type: "retrait", payload:500}

const initialState = {nom:"Keb", prénom:"Martin", solde:10000}

sachant que les actions possibles sont: "retrait" et "dépot"

Comment je définirais le corps de la fonction de réduction?
 */

const firstReducer = (currentState, action) => {
  switch (action.type) {
    case "retrait":
      return { ...currentState, solde: currentState.solde - action.payload };
    case "dépot":
      return { ...currentState, solde: currentState.solde + action.payload };
    default:
      return currentState;
  }
};
