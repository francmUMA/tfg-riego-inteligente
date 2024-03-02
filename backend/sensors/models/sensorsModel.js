import db from "../../database/db.js"
import { DataTypes } from "sequelize"

export default db.define("Sensores", {
    id : {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    device: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    device_pin: {
        type: DataTypes.INTEGER
    },
    area: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Latitud: {
        type: DataTypes.FLOAT
    },
    Longitud: {
        type: DataTypes.FLOAT
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false
    },
    value: {
        type: DataTypes.INTEGER,
    },
    available: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    }
})