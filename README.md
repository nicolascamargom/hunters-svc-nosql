# Hunters API · MongoDB

API REST para administrar personajes de Hunter x Hunter. Es el backend de la app [hunterxhunter](https://github.com/nicolascamargom/hunterxhunter).

Hice la misma API dos veces para comparar una base de datos relacional con una NoSQL:
- [hunters-svc-relational](https://github.com/nicolascamargom/hunters-svc-relational): con PostgreSQL
- [hunters-svc-nosql](https://github.com/nicolascamargom/hunters-svc-nosql): con MongoDB

Esta versión usa **MongoDB (Mongoose)**.

## Tecnologías
Node.js · Express · MongoDB (Mongoose) · Swagger UI

## Endpoints

| Método | Ruta | Qué hace |
|---|---|---|
| GET | `/api/hunters` | Lista todos los personajes |
| GET | `/api/hunters/:id` | Trae un personaje por su id |
| POST | `/api/hunters` | Crea un personaje |
| PUT | `/api/hunters/:id` | Actualiza un personaje |
| DELETE | `/api/hunters/:id` | Borra un personaje |

Cada personaje tiene: `nombre`, `edad`, `altura`, `peso` e `imageUrl`.

La documentación interactiva queda en `http://localhost:8081/api-docs`.

## Cómo correrlo

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Copia `.env.example` a `.env` y pon tu `MONGODB_URI`.
3. (Opcional) Carga datos de prueba:
   ```bash
   node seed_hunter.js
   ```
4. Arranca el servidor:
   ```bash
   node index.js
   ```
