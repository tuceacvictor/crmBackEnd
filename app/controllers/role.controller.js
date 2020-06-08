const {paginate} = require('./utils/paginate');
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
//update by id
exports.update = async (req, res) => {
    const {id, count, office_id} = req.body;
    const condition = id ? {id: {[Op.like]: `%${id}%`}} : null;
    try {
        const record = await Role.findOne({where: condition});
        if (condition && record) {
            record.update({
                count
            });
            res.send({message: 'Success'})
        } else {
            res.status(400).json({message: "Такая роль не найден"})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

//get by id
exports.read = async (req, res) => {
    const {id} = req.body;
    try {
        let record = await Role.findByPk(id);
        res.send(record)
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

//delete
exports.delete = async (req, res) => {
    const {id} = req.body;
    try {
        Role.destroy({
            where: {id: id}
        });
        res.send({message: `Роль ${id} удалёна`})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};


//get all
exports.getAll = async (req, res) => {
    const {page, pageSize, search} = req.query;
    let condition = search ? {name: {[Op.like]: `%${search}%`}} : null;
    try {
        let allRecords = await Role.findAndCountAll({where: condition, ...paginate({page, pageSize})});
        res.send(allRecords)
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};
