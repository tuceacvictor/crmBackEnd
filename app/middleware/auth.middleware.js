const jwt = require('jsonwebtoken');
const confing = require('../config/default');
module.exports  = (req, res, next) => {
  if(req.method === 'OPTIONS'){
      return next();
  }

  try {

      const token = req.headers.authorization.split(' ')[1]; //"Bearer TOKEN"

      if(!token){
          return res.status(401).json({message: "Нет авторизации"})
      }
      const decoded = jwt.verify(token, confing.jwtSecret);
      req.user = decoded;
      next();
  } catch (e) {
      res.status(401).json({message: "Нет авторизации"})
  }
};