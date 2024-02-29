import db from "../../database/db.js"
import { DataTypes } from "sequelize"

export default db.define("Coordenadas", {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    Latitud: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    Longitud: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    area: {
        type: DataTypes.STRING,
        allowNull: false
    },
    index: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})