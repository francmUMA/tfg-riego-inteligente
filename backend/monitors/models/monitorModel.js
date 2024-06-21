import db from "../../database/db.js"
import { DataTypes } from "sequelize"

const monitorModel = db.define("SensorDatas", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    deviceCode: {
        type: DataTypes.STRING,
    },
    sensorCode: {
        type: DataTypes.STRING,
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    actuadorCode:{
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
})

export default monitorModel