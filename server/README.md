![Build Status](http://gitlab.de-coster.fr/guest-book/server/badges/master/build.svg)
# urls possibles:

GET     server.guest-book.de-coster.fr/api/guests           Récupération des messages

POST    server.guest-book.de-coster.fr/api/guests           Création d'un message

GET     server.guest-book.de-coster.fr/api/guests/:id       Récupération d'un message

PUT     server.guest-book.de-coster.fr/api/guests/:id       Mise à jour d'un message

DELETE  server.guest-book.de-coster.fr/api/guests/:id    Suppression d'un message

# JSON

## A envoyer
```JSON
{
    "message": "oihzeoihfoih"
}
```
## Recu

### lors d'une création d'une mise à jour et d'une suppression
Il faut vérifier le retour http
```JSON
{
    "result": "actionok"
}
```
Ou un message d'erreur

### Lors d'une récupération
```JSON
{
    "_id":"lzjieiporj",
    "message": "zenhpihiopé",
    "_v": 0
}
```