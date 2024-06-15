
import sequelize from "../dbconnection.js";
import { DataTypes } from "sequelize";

const appointment = sequelize.define('appointment', {
    // Define attributes (columns)
    family_Id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    appointmentTime: {
        type: DataTypes.STRING,
        allowNull: true
    },
    familyCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        defaultValue: 'Pending...',
        allowNull: false
    }
});
export default appointment;