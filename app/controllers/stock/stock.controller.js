const {paginate} = require('../utils/paginate');
const db = require("../../models");
const Stock = db.stock;
const DefectStock = db.defectStock;
const category = db.category;
const Op = db.Sequelize.Op;


//create
exports.create = async (req, res) => {
    const {name, categoryId, count, office_id, price} = req.body;
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
        if (!categoryId || !name || !count || !office_id || !price) {
            res.status(500).json({message: "Заполните обязательные поля"});
            return;
        }
        let newRecord = {
            name, categoryId: categoryId.id, count, office_id, price
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
    const {id, name, categoryId, count, office_id, price} = req.body;
    const condition = id ? {id: {[Op.like]: `%${id}%`}} : null;
    try {
        const record = await Stock.findOne({where: condition});
        if(!office_id){
            res.status(500).json({message: "Офис не выбран"});
            return;
        }
        if (condition && record) {
            record.update({
                id, name, categoryId: categoryId.id, count, office_id, price
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
        let categoryObj = await category.findByPk(record.categoryId);
        res.send({...record.dataValues, categoryId: categoryObj})
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
    const {page, pageSize, search} = req.query;
    let condition = search ? {name: {[Op.like]: `%${search}%`}} : null;
    try {
        let allRecords = await Stock.findAndCountAll({
            include: category,
            where: condition,
             ...paginate({page, pageSize})
            });
        res.send({...allRecords, page: parseInt(page), pageSize: parseInt(pageSize)})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

//move to defectStock
exports.moveToDefect = async (req, res) => {
    const {id, count, office_id, name, categoryId, description} = req.body;
    const condition = id ? {id: id, office_id: office_id} : null;
    try {
        const record = await Stock.findOne({where: condition});
        const isDefectRecord = await DefectStock.findOne({where: {name, category: categoryId.id}});
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
                    name, category: categoryId.id, count, office_id, description
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