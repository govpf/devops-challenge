# Description

L'application sert à gérer une liste d'affaires.  Elle est composée d'une API REST(écrite en Java/Spring-boot) et d'une application web (écrite en typescript/Angular).
Elle stocke ses données dans une base de données Postgresql 11+.

# Architecture
Voici un schéma d'architecture de l'application.

![diagramme d'architecture](architecture.jpg "Architecture")

# API
## Construction logicielle
Pour construire l'application, il faut utiliser *maven 3.6* et le *jdk 8*.

```
$ cd api
$ mvn package
```

Cette commande produira un fichier jar qui sera éxécutable via Java.

```
$ cd api
$ mv target/*.jar ./app.jar
$ java -jar ./app.jar
```

## Déploiement

Les propriétés de l'API sont surchargeables notamment via des [variables d'environnement](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-external-config-relaxed-binding-from-environment-variables).
Le fichier de properties est [ici](https://github.com/govpf/devops-challenge/blob/master/api/src/main/resources/application.properties).

## API REST
Une fois démarrée l'API expose les chemins suivants:

| Chemin           | Methodes autorisées           | Description                                                                  |
|------------------|-------------------------------|------------------------------------------------------------------------------|
| /goods           | POST, DELETE                  | POST: crée un nouveau objet good, DELETE: supprime tout les objets existants |
| /goods/[:id]     | PUT, DELETE                   | PUT: met à jour un objet existant, DELETE: supprime l'objet                  |
| /gen-sample-data | POST                          | POST: Ajoute des données de test                                             |

Exemples:
```
# Ajoute des données de tests
curl -XPOST 'http://localhost:8080/gen-sample-data'
# Remplace le nom de l'objet 19 par keyboard
curl -X PUT localhost:8080/goods/19 -H 'Content-type:application/json' -d '{"name": "keyboard"}'
# Supprime l'objet 19
curl -XDELETE localhost:8080/goods/19
```

# Application web

## Construction logicielle

Pour construire l'application web, il faut utiliser *yarn* et *nodejs 10*.

```
$ cd frontend
$ yarn install --frozen-lockfile
$ yarn build
```

Les fichiers Javascript/HTML/CSS seront générés dans le répertoire *dist*.
```
$ cd frontend
$ ls dist/*
```

## Déploiement

L'application web doit être servie par un serveur web (Apache).
Afin d'éviter les problèmes de CORS, il est conseillé de se servir d'apache comme proxy pour les connexions frontend -> backend. 
Par exemple, en configurant Apache pour rediriger les requêtes sur '/api' vers le backend. Puis en utilisant cette url dans le frontend.


# Usage

![Page d'accueil](home.jpg "Page d'accueil")
