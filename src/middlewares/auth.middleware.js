import { verifyToken } from '../services/auth.service.js';

// Espera el header: Authorization: Bearer <token>
export const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token no provisto' });
  }

  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Formato de token inválido. Usar: Bearer <token>' });
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};
