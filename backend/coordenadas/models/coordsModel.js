import db from "../../database/db.js"
import { DataTypes } from "sequelize"

export default db.define("Coordenadas", {
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
    area: {
        type: DataTypes.INTEGER
    },
    radius: {
        type: DataTypes.INTEGER
    }
})