const {paginate} = require('./utils/paginate');
const db = require("../models");
const Executor = db.executor;
const Op = db.Sequelize.Op;


//create Executor
exports.create = async (req, res) => {
    const {name, phone} = req.body;
    try {
        let condition = name ? {name: {[Op.like]: `%${name}%`}} : null;
        let findExecutor = await Executor.findOne({where: condition});
        if (findExecutor) {
            res.status(500).json({message: "Исполнитель с таким именем уже существует"});
            return;
        }
        if (!phone || !name) {
            res.status(500).json({message: "Заполните обязательные поля"});
            return;
        }
        let newExecutor = {
            name,
            phone
        };
        Executor.create(newExecutor);
        res.send({message: 'Success'})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

//delete Executor
exports.delete = async (req, res) => {
    const {id} = req.body;
    try {
        Executor.destroy({
            where: {id: id}
        });
        res.send({message: `Исполнитель ${id} удалён`})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

//get Executor by id
exports.findOne = async (req, res) => {
    const {id} = req.body;
    try {
        let executor = await Executor.findByPk(id);
        res.send(executor)
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

//get all Executors
exports.findAll = async (req, res) => {
    const {page, pageSize, search} = req.query;
    let condition = search !== 'undefined' ? {name: {[Op.like]: `%${search}%`}} : null;
    try {
        let allRecords = await Executor.findAndCountAll({where: condition, ...paginate({page, pageSize})});
        res.send({...allRecords, page: parseInt(page), pageSize: parseInt(pageSize)})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

//update by id
exports.update = async (req, res) => {
    const {id, phone, name} = req.body;
    const condition = id ? {id: {[Op.like]: `%${id}%`}} : null;
    try {
        const record = await Executor.findOne({where: condition});
        if (condition && record) {
            record.update({
                name, phone
            });
            res.send({message: 'Success'})
        } else {
            res.status(400).json({message: "Такой исполнитель не найден"})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};