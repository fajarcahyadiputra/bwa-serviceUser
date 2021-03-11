const {Users} = require('../../models');

module.exports = async(req, res)=>{
    const {id} = req.params;
    try {
        if(id){
            const user = await Users.findByPk(id, {
                attributes: ['id','name','email','profession','avatar']
            });
            if(!user){
                return res.status(404).json({
                    status: 'error',
                    message: 'user not found'
                })
            }
            return  res.json({status: 'success', data: user});
        }
        const user = await Users.findAll({ attributes: ['id','name','email','profession','avatar']});
        return  res.json({status: 'success', data: user});
    } catch (error) {
        console.log(error.message)
    }
}