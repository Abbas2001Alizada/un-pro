import Appointment from '../Models/appointment.js';
import records from '../Models/records.js'
import { Op } from 'sequelize';



export const createAppointment = (req, res) => {

}


export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to handle searching appointments based on criteria
const searchAppointments = async (req, res) => {
  try {
    const { familyCode, specification} = req.body;

    let appointment;

    if (specification) {
      appointment = await records.findOne({ name: specification.name, NIC: specification.NIC });
    } else {
      appointment = await Appointment.findOne({ familyCode });
    }

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Mock response for demonstration
    let redirectPath = '';
    if (appointment.state === 'pending') {
      redirectPath = '/pending-appointment';
    } else if (appointment.state === 'processing') {
      redirectPath = '/processing-appointment';
    }

    res.status(200).json({ redirectPath, appointmentTime: appointment.appointmentTime });
  } catch (error) {
    console.error('Error searching appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default searchAppointments;



export const updateAppointments = async (req, res) => {
  const { amount } = req.body;

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount specified' });
  }

  try {
    const appointments = await Appointment.findAll({
      where: { state: 'pending' },
      order: [['id', 'ASC']],
      limit: parseInt(amount, 10)
    });

    if (appointments.length === 0) {
      return res.status(404).json({ message: 'No pending appointments found' });
    }

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2); // Day after tomorrow

    const updatePromises = appointments.map(appointment => 
      appointment.update({
        appointmentTime: tomorrow,
        state: 'processing'
      })
    );

    await Promise.all(updatePromises);

    res.json({ message: `${appointments.length} appointments updated successfully` });
  } catch (error) {
    console.error('Error updating appointments:', error);
    res.status(500).json({ error: 'An error occurred while updating appointments' });
  }
};


export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Appointment.destroy({
      where: { id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
