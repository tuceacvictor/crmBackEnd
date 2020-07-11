const {paginate} = require('./utils/paginate')
const db = require("../models");
const Op = db.Sequelize.Op;
const sequelize = require("sequelize");
const order = db.order;
const user = db.user;
const device = db.device;
const brand = db.device_brand;
const model = db.device_model;
const type = db.device_type;
const whereKnown = db.whereKnown;
const customer = db.customer;


exports.createOrder = async (req, res) => {
    const {
        customer: {id: customerId, phone, name, whereKnown, __isNew: isNewCustomer},
        device: {id: deviceId, serial, brand, model, type, password, equipment, appearance, problem, __isNew: isNewDevice},
        otherInformation: {note, ready_date, urgently, status = 'opened', executorId, managerId}
    } = req.body;

    //client
    //check if client does not exists
    const findCustomer = await customer.findOne({where: {phone: {[Op.like]: `%${phone}%`}}});
    if (!findCustomer) {
        const newCustomer = {
            phone,
            name,
            whereKnown
        };
        try {
            await customer.create(newCustomer)
        } catch (e) {
            res.status(500).json({message: "Create new customer error"})
        }
    }
    //device
    const findDevice = await device.findOne({where: {serial: {[Op.like]: `%${serial}%`}}});
    if (!findDevice) {
        const newDevice = {
            serial,
            brandId: brand.id,
            modelId: model.id,
            typeId: type.id,
        };
        try {
            await device.create(newDevice)
        } catch (e) {
            res.status(500).json({message: "Create new device error"})
        }
    }

    //order create
    const newOrder = {
        customerId: findCustomer.id,
        deviceId: findDevice.id,
        executorId,
        userId: managerId,
        password,
        equipment,
        appearance,
        problem,
        note,
        ready_date,
        urgently,
        status
    };
    try {
        await order.create(newOrder);
        res.send({message: 'Success'})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: JSON.stringify(err)})
    }
};


exports.getOrders = async (req, res) => {
    order.hasMany(customer, {foreignKey: 'id'});
    try {
        const response = await order.findAll({
            include: [{model: customer}],
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('client_id')), 'orders_count'],
                [sequelize.col(`name`), `name`],
                [sequelize.col(`phone`), `phone`],
            ],
            group: [`phone`],

        });
        res.send(response)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: e.message || 'Что-то пошло не так, попробуйте снова'})
    }
};