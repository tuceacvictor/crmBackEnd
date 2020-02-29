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
                user: {id: user.id, login: user.login, email: user.email, role: "admin"},
                theme: {primaryColor: "", secondaryColor: "", type: ""}
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
        console.log(err)
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the User."
        });
    }
};

// Change password
exports.changePassword = async (req, res) => {
    const {login, password, newPassword} = req.body;
    let condition = login ? {login: {[Op.like]: `%${login}%`}} : null;
    try {
        const user = await User.findOne({where: condition});
        const isMatchPasswords = await bcrypt.compare(password, user.password);
        if(isMatchPasswords){
            //change password
            const hashedPassword = await bcrypt.hash(newPassword, 8);
            const updatedUser = {
                login: login,
                password: hashedPassword,
                email: user.email,
                role: user.role
            };
            res.status(200).json({message: 'Все окей , но пароль не изменен'})
          //  User.create(updatedUser)
        }else{
            res.status(400).json({message: "Текущий пароль не верен"})
        }
    } catch (err) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    //const email = req.body.email;
    //let condition = email ? {email: {[Op.like]: `%${title}%`}} : null;
    User.findAll()
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

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "User updated successfully"
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        })
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    User.destroy(
        {where: {id: id}}
    )
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
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