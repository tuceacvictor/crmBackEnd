const {paginate} = require('./utils/paginate');
const logger = require('../utils/logger');
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
const executor = db.executor;

exports.createOrder = async (req, res) => {
    const {
        customer: {phone, name, whereKnownId, __isNew: isNewCustomer},
        device: {serial, brand, model, type, password, equipment, appearance, problem, __isNew: isNewDevice},
        otherInformation: {note, ready_date, urgently, status = 'opened', executorId, managerId, estimated_price, prepayment}
    } = req.body;
    try {
        //client
        //check if client does not exists
        let findCustomer = await customer.findOne({where: {phone: {[Op.like]: `%${phone}%`}}});
        if (!findCustomer) {
            const newCustomer = {
                phone,
                name,
                whereKnownId: whereKnownId.id
            };
            findCustomer = await customer.create(newCustomer);
        }
        //device
        //check for device
        let findDevice = await device.findOne({where: {serial: {[Op.like]: `%${serial}%`}}});
        if (!findDevice) {
            const newDevice = {
                serial,
                brandId: brand.id,
                modelId: model.id,
                typeId: type.id,
            };
            findDevice = await device.create(newDevice);
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
            status,
            estimated_price,
            prepayment
        };
        await order.create(newOrder);
        res.send({message: 'Заказ успешно создан'})
    } catch (err) {
        console.log(err);
        logger.error(`get all orders: ${err}`);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

exports.changeStatus = async (req, res) => {
  const {id, status} = req.body;
  const condition = id ? {id: {[Op.like]: `%${id}%`}} : null;
  try {
      const record = await order.findOne({where: condition});
      record.update({
          status
      });
      res.send({message: 'Статус успешно изменен'})
  }catch (e) {
      logger.error(`Change order status: ${e}`);
      res.status(500).json({message: e.message || 'Что-то пошло не так, попробуйте снова'})
  }
};

exports.read = async (req, res) => {
    const {id} = req.body;
    const condition = id ? {id: {[Op.like]: `%${id}%`}} : null;
    try {
        const record = await order.findOne({
            where: condition,
            include: [customer, user, device, executor]
        });
        res.send(record)
    } catch (e) {
        logger.error(`read order: ${e}`);
        res.status(500).json({message: e.message || 'Что-то пошло не так, попробуйте снова'})
    }
};


exports.findAll = async (req, res) => {
    const {page, pageSize, search} = req.query;
    let condition = search !== 'undefined' ? {name: {[Op.like]: `%${search}%`}} : null;
    try {
        let allRecords = await order.findAndCountAll({
                include: [user, {model: device, include: [model, type, brand]}, customer],
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