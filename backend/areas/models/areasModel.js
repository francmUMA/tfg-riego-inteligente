import db from "../../database/db.js"
import { DataTypes } from "sequelize"

export default db.define("Areas", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        defaultValue: "New area"
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})