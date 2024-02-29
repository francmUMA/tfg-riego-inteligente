import db from "../../database/db.js"
import { DataTypes } from "sequelize"

export default db.define("Devices", {
    id : {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    Latitud: {
        type: DataTypes.FLOAT
    },
    Longitud: {
        type: DataTypes.FLOAT
    },
    Usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: false
    },
    available: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    area: {
        type: DataTypes.STRING
    },
    name:  {
        type: DataTypes.STRING,
        allowNull: false
    }
})