import db from "../../database/db.js"
import { DataTypes } from "sequelize"

const monitorModel = db.define("SensorDatas", {
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
    }  
})

export default monitorModel