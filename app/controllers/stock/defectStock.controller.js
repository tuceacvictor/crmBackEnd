const db = require("../../models");
const DefectStock = db.defectStock;
const Op = db.Sequelize.Op;


//create
exports.create = async (req, res) => {
    const {name, category, count, office_id} = req.body;
    try {
        let condition = name ? {name: {[Op.like]: `%${name}%`}} : null;
        let findRecord = await DefectStock.findOne({where: condition});
        if (findRecord) {
            res.status(500).json({message: "Товар с таким именем уже существует"});
            return;
        }
        if (!category || !name || !count || !office_id) {
            res.status(500).json({message: "Заполните обязательные поля"});
            return;
        }
        let newRecord = {
            name, category, count, office_id
        };
        DefectStock.create(newRecord);
        res.send({message: 'Success'})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

//update by id
exports.update = async (req, res) => {
    const {id, name, category, count, office_id} = req.body;
    const condition = id ? {id: {[Op.like]: `%${id}%`}} : null;
    try {
        const record = await DefectStock.findOne({where: condition});
        if (condition && record) {
            record.update({
                id, name, category, count, office_id
            });
            res.send({message: 'Success'})
        } else {
            res.status(400).json({message: "Такой товар не найден"})
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
        let record = await DefectStock.findByPk(id);
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
        DefectStock.destroy({
            where: {id: id}
        });
        res.send({message: `Товар ${id} удалён`})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

//get all
exports.getAll = async (req, res) => {
    const {name} = req.body;
    let condition = name ? {name: {[Op.like]: `%${name}%`}} : null;
    try {
        let allRecords = await DefectStock.findAll({where: condition});
        res.send(allRecords)
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};
