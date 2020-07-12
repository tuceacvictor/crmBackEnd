const {paginate} = require('../utils/paginate');
const db = require("../../models");
const brand = db.device_brand;
const type = db.device_type;
const model = db.device_model;
const Device = db.device;
const Op = db.Sequelize.Op;


//create
exports.create = async (req, res) => {
    const {name, serial, equipment, brandId, typeId, modelId, appearance, password} = req.body;
    try {
        let condition = name ? {serial: {[Op.like]: `%${serial}%`}} : null;
        let findRecord = await Device.findOne({where: condition});
        if (findRecord) {
            res.status(500).json({message: "Дейвайс с таким серийным номером уже существует"});
            return;
        }
        if (!name || !serial || !equipment || !brandId || !typeId || !modelId || !appearance || !password) {
            res.status(500).json({message: "Заполните обязательные поля"});
            return;
        }
        let newRecord = {
            name,
            serial,
            equipment,
            brandId,
            typeId,
            modelId,
            appearance,
            password
        };
        await Device.create(
            {
                ...newRecord,
                brandId: newRecord.brandId.id,
                typeId: newRecord.typeId.id,
                modelId: newRecord.modelId.id
            }
        );
        res.send({message: 'Success'})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err})
    }
};

//update by id
exports.update = async (req, res) => {
    const {id, name, serial, equipment, brandId, typeId, modelId, appearance, password} = req.body;
    const condition = id ? {id: {[Op.like]: `%${id}%`}} : null;
    try {
        const record = await Device.findOne({where: condition});
        if (condition && record) {
            record.update({
                id,
                name,
                serial,
                equipment,
                brandId: brandId.id,
                typeId: typeId.id,
                modelId: modelId.id,
                appearance,
                password
            });
            res.send({message: 'Success'})
        } else {
            res.status(400).json({message: "Такое устройство не найдено"})
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
        let record = await Device.findByPk(id);
        let brandObj = await brand.findByPk(record.brandId);
        let typeObj = await type.findByPk(record.typeId);
        let modelObj = await model.findByPk(record.modelId);
        res.send({...record.dataValues, brandId: brandObj, modelId: modelObj, typeId: typeObj})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

//delete
exports.delete = async (req, res) => {
    const {id} = req.body;
    try {
        Device.destroy({
            where: {id: id}
        });
        res.send({message: `Категория ${id} удалён`})
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
        let allRecords = await Device.findAndCountAll({
                include: [model, type, brand],
                //where: condition,
                ...paginate({page, pageSize})
            }
        );
        res.send({...allRecords, page: parseInt(page), pageSize: parseInt(pageSize)})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err})
    }
};