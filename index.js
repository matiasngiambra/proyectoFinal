import express from 'express';
const app = express()


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://example.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use((req, res, next) => {
  res.status(404).send('Recurso no encontrado o ruta inválida');
});

//Middleware de aplicación
app.use( (req, res, next) => {
	console.log( `Datos recibidos: ${req.method} ${req.url}`);
	next(); //Pasa el control al siguiente middleware o ruta
})

//Ruta principal
app.get('/', (req, res) => {
	res.send("hola desde express con middlewares!")
})

const PORT = 3000
app.listen(PORT , ()=> {
	console.log(`Servidor corriendo en http://localhost:${PORT}`)
})