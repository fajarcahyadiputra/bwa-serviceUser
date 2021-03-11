const {Users, RefreshTokens} = require('../../models');

module.exports = async(req, res)=>{
    const {user_id} = req.body;
    try {
       if(!user_id){
        return res.status(404).json({
            status: "error",
            message: "you need user id"
        })
       }
       const user = await Users.findByPk(user_id);
       if(!user){
           return res.status(400).json({
               status: "error",
               message: "user not found"
           })
       }
       await RefreshTokens.destroy({where:{user_id: user_id}});
       return  res.json({
           status: 'success',
           message: 'refresh token deleted'
       });
    } catch (error) {
        console.log(error.message);
    }
}