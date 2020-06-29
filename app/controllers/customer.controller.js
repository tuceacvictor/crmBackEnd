const { paginate } = require('./utils/paginate');
const db = require("../models");
const Op = db.Sequelize.Op;
const Customer = db.customer;
const WhereKnown = db.whereKnown;


//create
exports.create = async (req, res) => {
    const { name, phone, whereKnownId } = req.body;
    try {
        let condition = phone ? { phone: { [Op.like]: `%${phone}%` } } : null;
        let findRecord = await Customer.findOne({ where: condition });
        if (findRecord) {
            res.status(500).json({ message: "Клиент с таким номером телефона уже существует" });
            return;
        }
        if (!name && !phone && !whereKnownId) {
            res.status(500).json({ message: "Заполните обязательные поля" });
            return;
        }
        let newRecord = {
            name,
            phone,
            whereKnownId: whereKnownId.id
        };
        await Customer.create(newRecord);
        res.send({ message: 'Success' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
};

//update by id
exports.update = async (req, res) => {
    const { id, name, phone, whereKnownId } = req.body;
    const condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
    try {
        const record = await Customer.findOne({ where: condition });
        if (condition && record) {
            await record.update({
                id, name, phone, whereKnownId: whereKnownId.id
            });
            res.send({ message: 'Success' })
        } else {
            res.status(400).json({ message: "Такой клиент не найден" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
};

//get by id
exports.read = async (req, res) => {
    const { id } = req.body;
    try {
        let record = await Customer.findByPk(id);
        let whereKnown = await WhereKnown.findByPk(record.whereKnownId);
        res.send({ ...record.dataValues, whereKnownId: whereKnown })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
};

//delete
exports.delete = async (req, res) => {
    const { id } = req.body;
    try {
        Customer.destroy({
            where: { id: id }
        });
        res.send({ message: `Клиент ${id} удалён` })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
};

//get all
exports.getAll = async (req, res) => {
    const { page, pageSize, search } = req.query;
    let condition = search ? { phone: { [Op.like]: `%${search}%` } } : null;
    try {
        let allRecords = await Customer.findAndCountAll({
            include: WhereKnown,
            where: condition,
            ...paginate({ page, pageSize })
        });
        res.send({ ...allRecords, page: parseInt(page), pageSize: parseInt(pageSize) })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
};