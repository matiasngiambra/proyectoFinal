// Errores que no atrapó ningún controller (ej. JSON mal formado en el body)
export const errorHandler = (err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'El body no es un JSON válido' });
  }
  console.error(err);
  res.status(err.status || 500).json({ message: 'Error interno del servidor' });
};
