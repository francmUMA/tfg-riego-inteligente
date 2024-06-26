import db from "../../database/db.js"
import { DataTypes } from "sequelize"

export default db.define("Areas", {
    id: {
        type: DataTypes.INTEGER,
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
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    crop: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    indoor: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
})