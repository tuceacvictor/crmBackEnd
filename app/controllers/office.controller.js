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
    const {name} = req.body;
    let condition = name ? {name: {[Op.like]: `%${name}%`}} : null;
    try {
        let allOffices = await Office.findAll({where: condition});
        res.send(allOffices)
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};