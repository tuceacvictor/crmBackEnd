const db = require("../models");
const Customer = db.customer;



exports.getCustomers = async (req, res) => {
  try {
      const customers = await Customer.findAll();
      console.log(customers)
      res.send(customers)

  } catch (e) {
      res.status(500).json({message: e.message || 'Что-то пошло не так, попробуйте снова'})
  }
};