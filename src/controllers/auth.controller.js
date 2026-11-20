import { loginUser } from '../services/auth.service.js';

export const login = async (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y password son requeridos' });
  }

  try {
    const token = loginUser(email, password);
    if (!token) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    res.status(200).json({ token: `Bearer ${token}` });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};
