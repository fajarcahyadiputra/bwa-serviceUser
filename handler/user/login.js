const {Users} = require("../../models");
const Validator = require('fastest-validator');
const bcrypt = require('bcrypt');

const v = new Validator();

module.exports =  async(req, res)=>{
    const {email, password} = req.body;
    try {
        const shema = {
            "email": "email|empty:false",
            "password": "string|min:6"
        }
        const validate = v.validate(req.body, shema);
        if(validate.length){
            return res.status(400).json({status: 'error', message: validate})
        }
        const user = await Users.findOne({where: {email: email}});
        if(!user){
             return res.status(400).json({status: 'error', message: 'Email is wrong'});
        }
        const compare = await bcrypt.compare(password, user.password);
        if(!compare){
            return res.status(400).json({status: 'error', message: 'password is wrong'})
        }
        delete user.dataValues.createdAt
        delete user.dataValues.updatedAt
        delete user.dataValues.password
        return  res.json({status: 'success', data: user});
    } catch (error) {
        console.log(error.message)
    }
}