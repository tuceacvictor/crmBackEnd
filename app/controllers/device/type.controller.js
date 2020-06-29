const {paginate} = require('../utils/paginate');
const db = require("../../models");
const Type = db.device_type;
const Op = db.Sequelize.Op;


//create
exports.create = async (req, res) => {
    const {name} = req.body;
    try {
        let condition = name ? {name: {[Op.like]: `%${name}%`}} : null;
        let findRecord = await Type.findOne({where: condition});
        if (findRecord) {
            res.status(500).json({message: "Тип устройства с таким именем уже существует"});
            return;
        }
        if (!name) {
            res.status(500).json({message: "Заполните обязательные поля"});
            return;
        }
        let newRecord = {
            name
        };
        Type.create(newRecord);
        res.send({message: 'Success'})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

//update by id
exports.update = async (req, res) => {
    const {id, name} = req.body;
    const condition = id ? {id: {[Op.like]: `%${id}%`}} : null;
    try {
        const record = await Type.findOne({where: condition});
        if (condition && record) {
            record.update({
                id, name
            });
            res.send({message: 'Success'})
        } else {
            res.status(400).json({message: "Тип устройства не найден"})
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
        let record = await Type.findByPk(id);
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
        Type.destroy({
            where: {id: id}
        });
        res.send({message: `Тип устройства ${id} удалён`})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

//get all
exports.getAll = async (req, res) => {
    const {page, pageSize, search} = req.query;
    let condition = search !== 'undefined' ? {name: {[Op.like]: `%${search}%`}} : null;
    try {
        let allRecords = await Type.findAndCountAll({where: condition, ...paginate({page, pageSize})});
        res.send({...allRecords, page: parseInt(page), pageSize: parseInt(pageSize)})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};