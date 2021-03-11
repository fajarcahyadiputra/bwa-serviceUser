const {Users, RefreshTokens} = require('../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res)=>{
    const {token, user_id} = req.body;
    try {
        const shema = {
            "token":  "string",
            "user_id": "number"
        };
        const validate = v.validate(req.body, shema);
        if(validate.length){
            return res.status(400).json({
                status: 'error',
                message: validate
            })
        }
        const user = await Users.findByPk(user_id);
        if(!user){
            return res.status(404).json({
                status: 'error',
                message: 'user not found'
            })
        }
        const newReshreshToken = await RefreshTokens.create({user_id, token });
        delete newReshreshToken.dataValues.createdAt;
        delete newReshreshToken.dataValues.updatedAt;
        return  res.json({
            status: 'success',
            message: newReshreshToken.dataValues
        });
    } catch (error) {
        console.log(error.message)
    }
}