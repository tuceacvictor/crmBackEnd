const {paginate} = require('./utils/paginate');
const db = require("../models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const generator = require('generate-password');
const config = require("../config/default");
const validation = require("./validations/user.validation");
const User = db.user;
const Office = db.office;
const Op = db.Sequelize.Op;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tuceak16@gmail.com',
        pass: 'gamemaster503'
    }
});



//login user
exports.login = async (req, res) => {
    const {login, password} = req.body;
    let condition = login ? {login: {[Op.like]: `%${login}%`}} : null;
    try {
        const user = await User.findOne({where: condition});
        if (!user) {
            res.status(400).json({message: "Не верный логин или пароль"});
        }
        let userOffices = user.office.split(',');
        let newOffices = await Office.findAll({
            where: {
                id: userOffices
            }
        });
        const isMatchPasswords = await bcrypt.compare(password, user.password);
        if (isMatchPasswords === true) {
            const token = jwt.sign({userId: user.id}, config.jwtSecret, {expiresIn: '1h'});
            res.send({
                token: token,
                user: {
                    id: user.id,
                    login: user.login,
                    email: user.email,
                    role: user.role,
                    office: newOffices,
                    registered: user.createdAt,
                    lastUpdated: user.updatedAt,
                    defaultOffice: user.defaultOffice
                },
                theme: {primaryColor: user.primaryColor, secondaryColor: user.secondaryColor, type: user.nightLight}
            });
        } else {
            res.status(400).json({message: "Не верный логин или пароль"})
        }
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

// Create and Save a new User
exports.create = async (req, res) => {
    const {login, email, office, role} = req.body;
    const password = generator.generate({
        length: 10,
        numbers: true
    });
    const mailOptions = {
        from: 'tuceack16@gmail.com',
        to: email,
        subject: 'Apple4you CRM registration',
        text: `Вы были зарегестрированны в CRM Apple4you,\n ваш логин: ${login}, пароль: ${password},\n
        пройдите по ссылке https://apple4you.tu4ka.tech/login для входа в систему`
    };
    try {
        //validate request
        let validate = await validation.userCreate(req, res);
        if (validate) {
            const hashedPassword = await bcrypt.hash(password, 8);
            //create user
            let userOffices = office ? office.map(office => office.id) : [];
            const user = {
                login: login,
                password: hashedPassword,
                email: email,
                role: role,
                office: userOffices.join(','),
                defaultOffice: userOffices.join(',')[0]
            };
            //save user
            await User.create(user);
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.send({message: 'Пользователь создан'})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

// Change password
exports.changePassword = async (req, res) => {
    const {password, newPassword, id} = req.body;
    let condition = id ? {id: {[Op.like]: `%${id}%`}} : null;
    try {
        const user = await User.findOne({where: condition});
        const isMatchPasswords = await bcrypt.compare(password, user.password);
        if (isMatchPasswords) {
            const newHashedPassword = await bcrypt.hash(newPassword, 8);
            user.update({
                password: newHashedPassword
            });
            res.send({message: 'Success'})
        } else {
            res.status(400).json({message: "Текущий пароль не верен"})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

// Retrieve all Users from the database.
exports.findAll = async (req, res) => {
    const {page, pageSize, search} = req.query;
    let condition = search ? {login: {[Op.like]: `%${search}%`}} : null;
    try {
        let allUsers = await User.findAndCountAll({where: condition, ...paginate({page, pageSize})});
        res.send(allUsers)
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
    const {id} = req.body;
    try {
        let user = await User.findByPk(id);
        let newOffices = [];
        if (user.office) {
            let userOffices = user.office.split(',');
            newOffices = await Office.findAll({
                where: {
                    id: userOffices
                }
            });
        }
        res.send({...user.dataValues, office: newOffices})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

//change user appearance
exports.changeTheme = async (req, res) => {
    const {id, primaryColor, secondaryColor, nightLight} = req.body;
    let condition = id ? {id: {[Op.like]: `%${id}%`}} : null;
    try {
        if (condition) {
            const user = await User.findOne({where: condition});
            user.update({
                primaryColor,
                secondaryColor,
                nightLight
            });
            res.send({message: 'Success'})
        } else {
            res.status(400).send({
                message: "Такой пользователь не найден"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

// Update a user by the id in the request
exports.update = async (req, res) => {
    const {id, login, email, role, office = []} = req.body;
    const condition = id ? {id: {[Op.like]: `%${id}%`}} : null;
    try {
        const user = await User.findOne({where: condition});
        let userOffices = office ? office.map(office => office.id) : [];
        let validate = await validation.userUpdate(req, res);
        if (validate) {
            if (condition && user) {
                user.update({
                    login,
                    email,
                    role,
                    office: userOffices.join(',')
                });
                res.send({message: 'Success'})
            } else {
                res.status(400).json({message: "Такой пользователь не найден"})
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

// Delete a User with the specified id in the request
exports.delete = async (req, res) => {
    const {id} = req.body;
    try {
        User.destroy({
            where: {id: id}
        });
        res.send({message: 'Success'})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} Users were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all users."
            });
        });
};

// Find all published users
exports.findAllActive = (req, res) => {
    User.findAll({where: {active: true}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};