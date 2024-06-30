import records from "../Models/records.js";
import Appointment from "../Models/appointment.js";

// helper function

// controllers/processUsers.js

// import User from '../models/userModel.js';
// import { sequelize } from 'sequelize';
import cron from "node-cron";
import sequelize from "../dbconnection.js";

// Function to process users in batches of 50
export async function processUsersDaily() {
  try {
    const currentDate = new Date();

    // Check if today is Friday, and if so, skip processing
    if (currentDate.getDay() === 5) {
      console.log("Skipping processing on Friday. Rescheduling for Saturday.");
      return;
    }

    const pendingAppointments = await Appointment.findAll({
      where: {
        state: "pending",
      },
      order: [["id", "ASC"]],
      limit: 50,
    });

    if (pendingAppointments.length > 0) {
      const minAppointmentId = minAppointmentId[0].id;

      await sequelize.transaction(async (t) => {
        // Update the status of the next 50 pending users to 'processing'
        await User.update(
          { status: "processing" },
          {
            where: {
              id: {
                [sequelize.Op.gte]: minUserId,
                [sequelize.Op.lt]: minUserId + 50,
              },
            },
            transaction: t,
          }
        );
      });

      console.log(`Processed users with IDs ${minUserId} to ${minUserId + 49}`);
    } else {
      console.log("No pending users with appointment today to process.");
    }
  } catch (error) {
    console.error("Error processing users:", error);
    throw error;
  }
}

// Schedule cron job to run daily at 00:00 (midnight), except on Fridays
cron.schedule("0 0 * * *", async () => {
  console.log("Running daily user processing job...");
  await processUsersDaily();
});

//find all records
export const getAllRecords = async (req, res) => {
  try {
    const record = await records.findAll();
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//find a single record
export const getRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await records.findByPk(id);
    if (record) {
      res.status(200).json(record);
    } else {
      res.status(404).json({ error: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//inserting record of witness

export const insertRecord = async (req, res) => {
  const {
    Name,
    lastName,
    fatherName,
    GfatherName,
    gender,
    birthDate,
    birthPlace,
    residency,
    NIC,
    nation,
    religion,
    coupleId,
    district
  } = req.body;

  try {
    const newRecord = await records.create({
      Name,
      lastName,
      fatherName,
      GfatherName,
      gender,
      birthDate,
      birthPlace,
      residency,
      NIC,
      nation,
      religion,
      coupleId,
      district,
      mode:'شاهد'
    });
    
    res.status(201).json({
      message: 'Record created successfully',
      data: newRecord
    });
  } catch (error) {
    console.error('Error inserting record:', error);
    res.status(500).json({
      message: 'Error creating record',
      error: error.message
    });
  }
};


//create a new record
export const createRecord = async (req, res) => {
  try {
    const { husbandData, wifeData } = req.body;

    //  first we should enter data to the appointment table
    const appointment = await Appointment.create({
      familyCode: new Date().getTime().toString().slice(7, 13),
      state: "pending",
    });
    let family_id = appointment.id;

    sequelize.transaction(async (t) => {
      await records.create(
        {
          Name: husbandData.Name,
          lastName: husbandData.lastName,
          fatherName: husbandData.fatherName,
          GfatherName: husbandData.GfatherName,
          gender: husbandData.gender,
          birthDate: husbandData.birthDate,
          birthPlace: husbandData.birthPlace,
          residency: husbandData.residency,
          NIC: husbandData.NIC,
          nation: husbandData.nation,
          religion: husbandData.religion,
          mode: husbandData.mode,
          coupleId: family_id,
        },
        { transaction: t }
      );
      await records.create(
        {
          Name: wifeData.Name,
          lastName: wifeData.lastName,
          fatherName: wifeData.fatherName,
          GfatherName: wifeData.GfatherName,
          gender: wifeData.gender,
          birthDate: wifeData.birthDate,
          birthPlace: wifeData.birthPlace,
          residency: wifeData.residency,
          NIC: wifeData.NIC,
          nation: wifeData.nation,
          religion: wifeData.religion,
          mode: wifeData.mode,
          coupleId: family_id,
        },
        { transaction: t }
      );
    });

    res.status(201).json({"message":'Record has been submmited successfully'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//to update a record

export const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Name,
      lastName,
      fatherName,
      GfatherName,
      gender,
      birthDate,
      birthPlace,
      residency,
      NIC,
      nation,
      religion,
      mode,
      coupleId,
    } = req.body;
    const [updated] = await records.update(
      {
        Name,
        lastName,
        fatherName,
        GfatherName,
        gender,
        birthDate,
        birthPlace,
        residency,
        NIC,
        nation,
        religion,
        mode,
        coupleId,
      },
      {
        where: { id },
      }
    );
    if (updated) {
      const updatedRecord = await records.findByPk(id);
      res.status(200).json(updatedRecord);
    } else {
      res.status(404).json({ error: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//to delete a record
export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await records.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
