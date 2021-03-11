const bcrypt = require('bcrypt');
const {Users} = require('../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res)=>{
    let {name, email, profession, password, avatar} = req.body;
    const {id} = req.params;
    try {
       const shema = {
           "email": "email|empty:false",
           "password": "string|min:6",
       } ;
       const validate = v.validate(req.body, shema);
       if(validate.length){
           return res.status(400).json({
               status: 'error',
               message: validate
           });
       }

       const user = await Users.findByPk(id);
       if(!user){
           return res.status(404).json({
               status: 'error',
               message: 'User Not Found'
           })
       }
       if(email){
               const checkEmail = await Users.findOne({where: {email: email}});
           if(checkEmail && email !== user.email){
               return res.status(409).json({
                   status: 'error',
                   message: 'email already exists'
               });
           }
       }
       if(password){
           password = await bcrypt.hash(password, 10);
       }
       const update = user.update({name, email, password, avatar, profession});
       delete update.updated_at;
       delete update.created_at;
           return res.json({
            status: 'success',
            data : {
                id: user.id,
                name,
                profession: user.profession,
                email: user.email,
                avatar: user.avatar
            }
           })
    } catch (error) {
        console.log(error.message)
    }
}