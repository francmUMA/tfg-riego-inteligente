import db from "../../database/db.js"
import { DataTypes } from "sequelize"

const programsModel = db.define("Programs", {
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
        type: DataTypes.FLOAT,
        allowNull: false
    }
})

export default programsModel