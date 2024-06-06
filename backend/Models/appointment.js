
import sequelize from "../dbconnection.js";
import { DataTypes } from "sequelize";

const appointment = sequelize.define('appointment', {
    // Define attributes (columns)
    appointmentTime: {
        type: DataTypes.STRING,
        allowNull: true
    },
    familyCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    family_Id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
export default appointment;