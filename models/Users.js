module.exports = (sequelize, DataTypes)=>{
    const users = sequelize.define('Users',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
          },
          name : {
            type: DataTypes.STRING,
            allowNull: false
          },
          profession: {
            type: DataTypes.STRING,
            allowNull: true
          },
          avatar : {
            type: DataTypes.STRING,
            allowNull: true
          },
          role: {
            type: DataTypes.ENUM,
            values: ['admin', 'student'],
            defaultValue: 'student',
            allowNull: false
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false
          },
          password: {
            type: DataTypes.STRING,
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
        tableName: 'users',
        timeStamps: true
    })
    return users;
}