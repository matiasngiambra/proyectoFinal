# API REST de Productos — Proyecto Final

API REST para administrar el catálogo de productos de una tienda: permite listar, crear, actualizar y eliminar productos guardados en **Firestore**, con autenticación mediante **JWT**.

🔗 **Deploy:** https://proyecto-final-seven-tau.vercel.app

## Tecnologías

- Node.js + Express
- Firebase / Firestore
- JSON Web Token (jsonwebtoken)
- cors, body-parser, dotenv

## Estructura

```
index.js                  → configuración del servidor (CORS, body-parser, rutas, 404, errores)
src/
├── config/               → conexión a Firebase
├── routes/               → definición de endpoints
├── controllers/          → manejo de request/response
├── services/             → lógica de negocio y validaciones
├── models/               → acceso a datos en Firestore
└── middlewares/          → autenticación JWT, 404 y manejo de errores
```

## Instalación

```bash
git clone https://github.com/matiasngiambra/proyectoFinal.git
cd proyectoFinal
npm install
```

Crear un archivo `.env` a partir de `.env.example` y completar las variables:

| Variable | Descripción |
|---|---|
| `PORT` | Puerto del servidor (por defecto 3000) |
| `FIREBASE_*` | Configuración de la app web de Firebase |
| `JWT_SECRET` | Clave para firmar los tokens |
| `JWT_EXPIRES_IN` | Duración del token (ej. `1h`) |
| `AUTH_USER_EMAIL` / `AUTH_USER_PASSWORD` | Credenciales del usuario habilitado para iniciar sesión |

Levantar el servidor:

```bash
npm run start   # producción
npm run dev     # desarrollo (nodemon)
```

## Endpoints

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/auth/login` | Devuelve un Bearer token si las credenciales son válidas | — |
| GET | `/api/products` | Lista todos los productos | — |
| GET | `/api/products/:id` | Devuelve un producto por ID | — |
| POST | `/api/products/create` | Crea un producto | ✅ |
| PUT | `/api/products/:id` | Actualiza un producto | ✅ |
| DELETE | `/api/products/:id` | Elimina un producto | ✅ |

Las rutas marcadas con ✅ requieren el header:

```
Authorization: Bearer <token>
```

### Ejemplos

**Login**

```http
POST /auth/login
Content-Type: application/json

{ "email": "usuario@mail.com", "password": "********" }
```

Respuesta:

```json
{ "token": "Bearer eyJhbGciOi..." }
```

**Crear producto**

```http
POST /api/products/create
Authorization: Bearer <token>
Content-Type: application/json

{ "title": "Mate de calabaza", "price": 15000, "stock": 10 }
```

### Modelo de producto

| Campo | Tipo | Requerido |
|---|---|---|
| `title` | string | Sí |
| `price` | number (≥ 0) | No |
| `stock` | entero (≥ 0) | No |

## Manejo de errores

| Código | Caso |
|---|---|
| 400 | Body inválido, JSON mal formado o datos faltantes |
| 401 | Falta el token, formato inválido o credenciales incorrectas |
| 403 | Token inválido o expirado |
| 404 | Ruta o producto inexistente |
| 500 | Error interno o falla del servicio de datos |
