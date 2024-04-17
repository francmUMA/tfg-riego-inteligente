import db from "../../database/db.js"
import { DataTypes } from "sequelize"

const monitorModel = db.define("Programs", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    
})

export default monitorModel