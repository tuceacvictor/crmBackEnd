const {paginate} = require('./utils/paginate');
const db = require("../models");
const Office = db.office;
const Op = db.Sequelize.Op;


//create office
exports.create = async (req, res) => {
    const {name, address} = req.body;
    try {
        let condition = name ? {name: {[Op.like]: `%${name}%`}} : null;
        let findOffice = await Office.findOne({where: condition});
        if (findOffice) {
            res.status(500).json({message: "Офис с таким именем уже существует"});
            return;
        }
        if (!address || !name) {
            res.status(500).json({message: "Заполните обязательные поля"});
            return;
        }
        let newOffice = {
            name,
            address
        };
        Office.create(newOffice);
        res.send({message: 'Success'})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

//delete office
exports.delete = async (req, res) => {
    const {id} = req.body;
    try {
        Office.destroy({
            where: {id: id}
        });
        res.send({message: `Офис ${id} удалён`})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

//get office by id
exports.findOne = async (req, res) => {
    const {id} = req.body;
    try {
        let office = await Office.findByPk(id);
        res.send(office)
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

//get all offices
exports.findAll = async (req, res) => {
    const {page, pageSize, search} = req.query;
    let condition = search !== 'undefined' ? {name: {[Op.like]: `%${search}%`}} : null;
    try {
        let allOffices = await Office.findAndCountAll({where: condition, ...paginate({page, pageSize})});
        res.send(allOffices)
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

//update by id
exports.update = async (req, res) => {
    const {id, address, name} = req.body;
    const condition = id ? {id: {[Op.like]: `%${id}%`}} : null;
    try {
        const record = await Office.findOne({where: condition});
        if (condition && record) {
            record.update({
                name, address
            });
            res.send({message: 'Success'})
        } else {
            res.status(400).json({message: "Такой офис не найден"})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};