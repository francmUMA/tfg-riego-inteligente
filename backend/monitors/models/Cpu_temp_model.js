import db from "../../database/db.js"
import { DataTypes } from "sequelize"

const Cpu_temp_Model = db.define("Cpu_temps", {
    device: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.INTEGER
    },
    time: {
        type: DataTypes.TIME,
    }  
})

export default Cpu_temp_Model