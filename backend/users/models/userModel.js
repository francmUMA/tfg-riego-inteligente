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
    },
    Latitud: {
        type: DataTypes.FLOAT
    },
    Longitud: {
        type: DataTypes.FLOAT
    },
    event1: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    event2: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    event3: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    event4: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    event5: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    event6: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
})