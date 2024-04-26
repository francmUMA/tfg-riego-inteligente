import db from "../../database/db.js"
import { DataTypes } from "sequelize"

export default db.define("Actuadores", {
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
    mode: {
        type: DataTypes.TINYINT
    },
    Latitud: {
        type: DataTypes.FLOAT
    },
    Longitud: {
        type: DataTypes.FLOAT
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    activeProgram: {
        type: DataTypes.STRING
    },
    flowmeter: {
        type: DataTypes.STRING,
        allowNull: true
    },
})