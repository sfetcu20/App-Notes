const joi = require('@hapi/joi');
const registerValidation = data =>{
const val_schema = {
    name:joi.string().required(),
    email:joi.string().required().email(),
    password:joi.string().required(),
    }
    return joi.validate(data,val_schema);
}
const loginValidation = data =>{
    const vala = {
        email:joi.string().required().email(),
        password:joi.string().required(),
        }
    return joi.validate(data,vala);
}
module.exports.registerValidation= registerValidation;
module.exports.loginValidation=loginValidation;