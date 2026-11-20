import 'dotenv/config'; // primero: carga el .env antes de que se evalúen los demás módulos
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import productRouter from './src/routes/products.routes.js';
import authRouter from './src/routes/auth.routes.js';
import { notFound } from './src/middlewares/notFound.middleware.js';
import { errorHandler } from './src/middlewares/errorHandler.middleware.js';
const app = express()

app.use(cors());
app.use(bodyParser.json());

//Ruta principal
app.get('/', (req, res) => {
	res.json({ message: 'API de productos funcionando' })
})

app.use("/auth", authRouter);
app.use("/api/products", productRouter);

// 404 para rutas no definidas (después de todas las rutas)
app.use(notFound);

// Manejo de errores no atrapados (siempre al final)
app.use(errorHandler);


const PORT = process.env.PORT || 3000;

app.listen(PORT , ()=> {
	console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
