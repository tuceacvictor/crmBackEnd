const db = require("../models");
const Role = db.role;
const Op = db.Sequelize.Op;


exports.create = async (req, res) => {
    const {name} = req.body;
    let condition = name ? {name: {[Op.like]: `%${name}%`}} : null;
    try {
        let role = await Role.findOne({where: condition});
        if(role){
            res.status(400).json({message: "Такая роль уже существует"});
            return;
        }
        if(!name) {
            res.status(400).json({message: "Название не может быть пустым"});
            return;
        }
        let newRole = {
            name: name
        };
        await Role.create(newRole);
        res.send({message: 'Success'})
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

exports.findAll = async (req, res) => {
  try {
      let allRoles = await Role.findAll();
      res.send(allRoles);
  } catch (e) {
      console.log(e);
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }

};