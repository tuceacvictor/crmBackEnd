const db = require("../models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("../config/default");
const User = db.user;
const Op = db.Sequelize.Op;


//login user
exports.login = async (req, res) => {
    const {login, password} = req.body;
    let condition = login ? {login: {[Op.like]: `%${login}%`}} : null;
    try {
        const user = await User.findOne({where: condition});
        if (!user) {
            res.status(400).json({message: "Не верный логин или пароль"});
        }

        const isMatchPasswords = await bcrypt.compare(password, user.password);
        if (isMatchPasswords === true) {
            const token = jwt.sign({userId: user.id}, config.jwtSecret, {expiresIn: '1h'});
            res.send({
                token: token,
                user: {
                    id: user.id,
                    login: user.login,
                    email: user.email,
                    role: "admin",
                    registered: user.createdAt,
                    lastUpdated: user.updatedAt
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
    //validate request
    try {
        if (!req.body.login) {
            res.status(400).send({
                message: "Login can not be empty!"
            });
            return;
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        //create user
        const user = {
            login: req.body.login,
            password: hashedPassword,
            email: req.body.email,
            role: req.body.role
        };
        //save user
        const userCreate = User.create(user);
        res.send(userCreate)
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the User."
        });
    }
};

// Change password
exports.changePassword = async (req, res) => {
    const {login, password, newPassword, id} = req.body;
    let condition = id ? {id: {[Op.like]: `%${id}%`}} : null;
    try {
        const user = await User.findOne({where: condition});
        const isMatchPasswords = await bcrypt.compare(password, user.password);
        if (isMatchPasswords) {
            const newHashedPassword = await bcrypt.hash(newPassword, 8);
            user.update({
                password: newHashedPassword
            });
            res.send(newHashedPassword)
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
    const {login} = req.body;
    let condition = login ? {login: {[Op.like]: `%${login}%`}} : null;
    try {
        let allUsers = await User.findAll({where: condition});
        res.send(allUsers)
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {
        let user = await User.findByPk(id);
        res.send(user)
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
            res.send(user)
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
    const {id, login, email, role} = req.body;
    const condition = id ? {id: {[Op.like]: `%${id}%`}} : null;
    try {
        const user = await User.findOne({where: condition});
        if(condition){
            user.update({
                login,
                email,
                role
            });
            res.send(user)
        }else{
            res.status(400).json({message: "Такой пользователь не найден"})
        }
    }catch (err) {
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
        })
    }catch (err) {
        console.log(err);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
    // User.destroy(
    //     {where: {id: id}}
    // )
    //     .then(num => {
    //         if (num == 1) {
    //             res.send({
    //                 message: "User was deleted successfully!"
    //             });
    //         } else {
    //             res.send({
    //                 message: `Cannot delete User with id=${id}. Maybe Tutorial was not found!`
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: "Could not delete User with id=" + id
    //         });
    //     });
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