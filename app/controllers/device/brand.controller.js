const {paginate} = require('../utils/paginate');
const db = require("../../models");
const Brand = db.device_brand;
const Op = db.Sequelize.Op;


//create
exports.create = async (req, res) => {
    const {name} = req.body;
    try {
        let condition = name ? {name: {[Op.like]: `%${name}%`}} : null;
        let findRecord = await Brand.findOne({where: condition});
        if (findRecord) {
            res.status(500).json({message: "Бренд с таким именем уже существует"});
            return;
        }
        if (!name) {
            res.status(500).json({message: "Заполните обязательные поля"});
            return;
        }
        let newRecord = {
            name
        };
        Brand.create(newRecord);
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
        const record = await Brand.findOne({where: condition});
        if (condition && record) {
            record.update({
                id, name
            });
            res.send({message: 'Success'})
        } else {
            res.status(400).json({message: "Такой бренд не найден"})
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
        let record = await Brand.findByPk(id);
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
        Brand.destroy({
            where: {id: id}
        });
        res.send({message: `Бренд ${id} удалён`})
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
        let allRecords = await Brand.findAndCountAll({where: condition, ...paginate({page, pageSize})});
        res.send({...allRecords, page: parseInt(page), pageSize: parseInt(pageSize)})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};