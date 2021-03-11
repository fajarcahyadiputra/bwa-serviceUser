const {Users} = require('../../models');

module.exports = async(req, res)=>{
    const ids = req.query.user_ids || [];
    try {
        const sqloptions = {
            attributes: ['id','name','email','profession','avatar']
        };

        if(ids.length){
            sqloptions.where = {
                id: ids
            }
        }
        const users = await Users.findAll(sqloptions);
        return  res.json({status: 'success', data: users});
    } catch (error) {
        console.log(error.message)
    }
}