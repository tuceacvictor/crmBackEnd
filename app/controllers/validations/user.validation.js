const db = require("../../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.userCreate = async (req, res) => {
    const {login, email, offices, roleId} = req.body;
    let values = [
        {label: "логин", value: login},
        {label: "пароль", value: 'a'},
        {label: "е-майл", value: email},
        {label: "офис", value: offices},
        {label: "роль", value: roleId}
    ];
    let nullValues = [];
    let errMessage = undefined;
    try {
        //check for null values
        values.forEach(value => {
            if (!value.value) {
                nullValues.push(value.label)
            }
        });
        if (nullValues.length > 0) {
            if (nullValues.length === 1) {
                errMessage = `${nullValues[0]} обязательное поле`;
            } else {
                errMessage = `${nullValues.join(',')} - обязательные поля`;
            }
        }

        //check for existing users
        let findUser = await User.findOne({where: {login: {[Op.like]: `%${login}%`}}});
        if (findUser) {
            errMessage = 'Пользователь с таким логином уже существует'
        }

        if (errMessage) {
            res.status(400).send({
                message: errMessage
            });
            return false;
        }else{
            return true;
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};


exports.userUpdate = async (req, res) => {
    const {email, offices, roleId} = req.body;
    let values = [
        {label: "е-майл", value: email},
        {label: "офис", value: offices},
        {label: "роль", value: roleId}
    ];
    let nullValues = [];
    let errMessage = undefined;
    try {
        //check for null values
        values.forEach(value => {
            if (!value.value) {
                nullValues.push(value.label)
            }
        });
        if (nullValues.length > 0) {
            if (nullValues.length === 1) {
                errMessage = `${nullValues[0]} - обязательное поле`;
            } else {
                errMessage = `${nullValues.join(',')} - обязательные поля`;
            }
        }
        if (errMessage) {
            res.status(400).send({
                message: errMessage
            });
            return false;
        }else{
            return true;
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};
