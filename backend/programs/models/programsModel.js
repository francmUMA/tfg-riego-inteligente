import db from "../../database/db.js"
import { DataTypes } from "sequelize"

const monitorModel = db.define("Programs", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    days: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    startTime: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default monitorModel