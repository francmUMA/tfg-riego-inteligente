import db from "../../database/db.js"
import { DataTypes } from "sequelize"

export default db.define("Logs", {
    id :{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    deviceCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sensorCode: {
        type: DataTypes.STRING
    },
    actuadorCode: {
        type: DataTypes.STRING
    },
    logcode: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deviceName: {
        type: DataTypes.STRING,
        allowNull: false
    }
})