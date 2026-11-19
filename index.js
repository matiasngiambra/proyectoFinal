import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express()

app.use(cors());
app.use(express.json()); 

//Ruta principal
app.get('/', (req, res) => {
	res.json({ message: 'Bienvenido a la API de ejemplo' })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT , ()=> {
	console.log(`Servidor corriendo en http://localhost:${PORT}`)
})


//---------------

/*
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://example.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});


//Middleware de aplicación
app.use( (req, res, next) => {
	console.log( `Datos recibidos: ${req.method} ${req.url}`);
	next(); //Pasa el control al siguiente middleware o ruta
})

*/