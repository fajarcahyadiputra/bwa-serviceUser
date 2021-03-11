const {RefreshTokens} = require('../../models');

module.exports = async (req, res)=>{
    const {refresh_token} = req.query;
    try {
        const refreshToken = await RefreshTokens.findOne({where:{token:refresh_token}});
        if(!refreshToken){
            return res.status(404).json({
                status: 'error',
                message: 'refresh token not found'
            })
        }
        return res.json({
            status: 'success',
            data: {
                user_id: refreshToken.user_id,
                token: refreshToken.token
            }
        })
    } catch (error) {
        console.log(error.message)
    }
}