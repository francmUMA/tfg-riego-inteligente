import db from "../../database/db.js"
import { DataTypes } from "sequelize"

export default db.define("Crops", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false
    }
})