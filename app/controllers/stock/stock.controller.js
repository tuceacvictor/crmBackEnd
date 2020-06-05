const db = require("../../models");
const Stock = db.stock;
const DefectStock = db.defectStock;
const Category = db.category;
const Op = db.Sequelize.Op;


//create
exports.create = async (req, res) => {
    const {name, category_id, count, office_id, price} = req.body;
    try {
        let condition = name ? {name: {[Op.like]: `%${name}%`}} : null;
        let findRecord = await Stock.findOne({where: condition});
        if (findRecord) {
            res.status(500).json({message: "Товар с таким именем уже существует"});
            return;
        }
        if(!office_id){
            res.status(500).json({message: "Офис не выбран"});
            return;
        }
        if (!category_id || !name || !count || !office_id || !price) {
            res.status(500).json({message: "Заполните обязательные поля"});
            return;
        }
        let newRecord = {
            name, category_id: category_id.id, count, office_id, price
        };
        Stock.create(newRecord);
        res.send({message: 'Success'})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

//update by id
exports.update = async (req, res) => {
    const {id, name, category_id, count, office_id, price} = req.body;
    const condition = id ? {id: {[Op.like]: `%${id}%`}} : null;
    try {
        const record = await Stock.findOne({where: condition});
        if(!office_id){
            res.status(500).json({message: "Офис не выбран"});
            return;
        }
        if (condition && record) {
            record.update({
                id, name, category_id: category_id.id, count, office_id, price
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
        let record = await Stock.findByPk(id);
        let categoryObj = await Category.findByPk(record.category_id);
        res.send({...record.dataValues, category_id: categoryObj})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

//delete
exports.delete = async (req, res) => {
    const {id} = req.body;
    try {
        Stock.destroy({
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
        let allRecords = await Stock.findAll({where: condition});
        res.send(allRecords)
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

//move to defectStock
exports.moveToDefect = async (req, res) => {
    const {id, count, office_id, name, category_id, description} = req.body;
    const condition = id ? {id: id, office_id: office_id} : null;
    try {
        const record = await Stock.findOne({where: condition});
        const isDefectRecord = await DefectStock.findOne({where: {name, category: category_id.id}});
        console.log(record);
        if (condition && record) {
            if(isDefectRecord){
                //update
                isDefectRecord.update({
                    count: parseInt(count) + parseInt(isDefectRecord.count),
                    description
                });
                record.update({
                   count: parseInt(record.count) - parseInt(count)
                })
            }else{
                DefectStock.create({
                    name, category: category_id.id, count, office_id, description
                });
                record.update({
                    count: record.count - count
                })
            }

            res.send({message: 'Success'})
        } else {
            res.status(400).json({message: "Такой товар не найден"})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};