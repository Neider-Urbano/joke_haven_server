# Joke Haven - Server

Joke Haven is a comprehensive web application designed to bring joy and laughter through a vast collection of jokes. This repository contains the server-side code, built with Node.js and Express, to handle API requests, manage user authentication, and serve joke-related data to the front-end.

## Features:

- User Authentication: Secure login and registration using JWT.
- Joke Management: API endpoints to fetch, add, and manage jokes.
- Favorites: Users can save their favorite jokes for easy access.
- Database Integration: Uses MongoDB for data storage, with Mongoose as the ODM.

## Tech Stack:

- Node.js: JavaScript runtime for building the server-side logic.
- Express: Fast, unopinionated, minimalist web framework for Node.js.
- MongoDB: NoSQL database for storing joke data and user information.
- JWT: JSON Web Tokens for secure user authentication.
- Docker: Containerization for easy deployment and scaling.

## Branches:

- main: Stable release branch.
- dev: Development branch for ongoing changes.
- release: Pre-release branch for final testing before going live.

# Instrucciones para Docker

## 1. Construir la Imagen de Docker para el Backend

Navega al directorio donde se encuentra tu archivo `Dockerfile` para el backend y ejecuta el siguiente comando:

```bash
docker build -t joke-back .
```

2. Construir la Imagen de Docker para MongoDB
   No necesitas un Dockerfile específico para MongoDB si estás utilizando la imagen oficial. Puedes especificar la configuración en tu archivo docker-compose.yml.

3. Iniciar los Contenedores Usando Docker Compose
   Asegúrate de estar en el directorio donde se encuentra tu archivo docker-compose.yml y ejecuta:

```bash
docker-compose up -d
```

- d ejecuta los contenedores en segundo plano (modo desacoplado).

4. Verificar el Estado de los Contenedores
   Puedes verificar que los contenedores están corriendo correctamente con:

```bash
docker ps
```

5. Acceder al Contenedor del Backend
   Si necesitas acceder al contenedor del backend para ejecutar comandos o verificar el estado, usa:

```bash
docker exec -it <back-container-id> /bin/bash
```

Asegúrate de reemplazar <back-container-id> con el ID o nombre del contenedor del backend.

6. Acceder al Contenedor de MongoDB
   Para acceder a la shell de MongoDB dentro del contenedor, usa:

```bash
docker exec -it <mongo-container-id> mongo
```

Reemplaza <mongo-container-id> con el ID o nombre del contenedor de MongoDB.

7. Detener y Eliminar Contenedores
   Para detener y eliminar todos los contenedores definidos en tu docker-compose.yml, usa:

```bash
docker-compose down
```

8. Verificar Logs de los Contenedores
   Para ver los logs de un contenedor específico, usa:

```bash
docker logs <container-id>
```

# URLs Generales de la API

Una vez que el backend esté corriendo, podrás acceder a las siguientes rutas de la API:

## 1. Home

```bash
GET /
```

## 2. Users

```bash
/api/users
```

## 3. Jokes

```bash
/api/jokes
```
