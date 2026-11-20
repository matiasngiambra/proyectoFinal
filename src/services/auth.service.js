import jwt from 'jsonwebtoken';

// Usuario de prueba definido en el .env.
// Alternativa: una colección "users" en Firestore con su propio model.
export const loginUser = (email, password) => {
  const isValid =
    email === process.env.AUTH_USER_EMAIL && password === process.env.AUTH_USER_PASSWORD;

  if (!isValid) return null;

  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });
};

export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
