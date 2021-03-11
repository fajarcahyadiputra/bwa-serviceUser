module.exports = (sequelize, DataTypes)=>{
    const RefreshTokens = sequelize.define('RefreshTokens', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
          },
          user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          token: {
            type: DataTypes.TEXT,
            allowNull: false
          },
          updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            allowNull: false
          },
          createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            allowNull: false
          }
    },{
        tableName: 'refresh_tokens',
        timeStamps: true
    })

    return RefreshTokens;
}