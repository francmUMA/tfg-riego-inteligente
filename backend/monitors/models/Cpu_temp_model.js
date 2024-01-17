import db from "../../database/db.js"
import { DataTypes } from "sequelize"

const Cpu_temp_Model = db.define("Cpu_temp", {
    value: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    device: {
        type: DataTypes.INTEGER
    }
})

export default Cpu_temp_Model