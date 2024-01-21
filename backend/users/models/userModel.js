import db from "../../database/db.js"
import { DataTypes } from "sequelize"

export default db.define("Usuario", {
    NIF: {
        type: DataTypes.STRING
    },
    nombre: {
        type: DataTypes.STRING,
    },
    apellidos: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    }
})