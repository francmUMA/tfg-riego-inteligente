import db from "../../database/db.js"
import { DataTypes } from "sequelize"

export default db.define("Devices", {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    Latitud: {
        type: DataTypes.FLOAT
    },
    Longitud: {
        type: DataTypes.FLOAT
    },
    Usuario: {
        type: DataTypes.STRING
    },
    ip: {
        type: DataTypes.STRING
    },
    available: {
        type: DataTypes.TINYINT
    }

})