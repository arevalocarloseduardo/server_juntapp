import jwt from 'jsonwebtoken';

export const ensureToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

export const verifyToken = (req, res, next) => {
  jwt.verify(req.token, 'my_secret_key', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      req.authData = authData;
      next();
    }
  });
};