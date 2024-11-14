const jwt = require('jsonwebtoken');
const secretKey = 'seamazon';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, error: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, error: 'Failed to authenticate token' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
