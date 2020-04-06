
module.exports = async (req, res, next) => {
  try {
      res.status(403).json({message: "Нет доступа"})
  } catch (e) {
      res.status(401).json({message: "Нет доступа"})
  }
};