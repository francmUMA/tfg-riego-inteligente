import db from "../../database/db.js"
import { DataTypes } from "sequelize"

export default db.define("Actuadores", {
    id : {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    device: {
        type: DataTypes.INTEGER
    },
    device_pin: {
        type: DataTypes.INTEGER
    },
    area: {
        type: DataTypes.INTEGER
    },
})