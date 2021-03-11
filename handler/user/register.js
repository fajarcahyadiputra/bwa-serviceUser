const bcrypt = require('bcrypt');
const {Users} = require('../../models');
const Validator = require('fastest-validator');
const v        = new Validator();

module.exports = async (req, res)=>{ 
  const {name, email, password, profession} = req.body;
  try {
    const schema = {
        "name" : "string|empty:false",
        "profession": "string|optional",
        "email" : "email|empty:false",
        "password": "string|min:6"
    }   
    const validate = v.validate(req.body, schema);
    if(validate.length){
        return res.status(400).json({
            status: "error",
            message: validate
        })
    }
    const user = await Users.findOne({where: {email: email}});
    if(user){
        return res.status(409).json({
            status: 'errro',
            message: "email already exists"
        })
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await Users.create({name, email, password: passwordHash, profession});
    delete newUser.dataValues.updatedAt;
    delete newUser.dataValues.createdAt;
    delete newUser.dataValues.password;
    return res.json({status: 'success', data: newUser.dataValues});
  } catch (error) {
      console.log(error.message)
  }
}