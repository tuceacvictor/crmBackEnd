const db = require("../../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.userCreate = async (req, res) => {
    const {login, password, email, office, role} = req.body;
    let values = [
        {label: "логин", value: login},
        {label: "пароль", value: password},
        {label: "е-майл", value: email},
        {label: "офис", value: office},
        {label: "роль", value: role}
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
            }
            errMessage = `${nullValues.join(',')} - обязательные поля`;
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
        }

    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};
