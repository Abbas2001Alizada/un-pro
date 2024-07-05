import Appointment from '../Models/appointment.js';
import records from '../Models/records.js';

// Controller function to handle appointment search by name, mode, and NIC
export const searchBySpecification = async (req, res) => {
  const { name, mode, NIC } = req.body;

  try {
    // Find the record in the records table
    const record = await records.findOne({
      where: {
        name,
        mode,
        NIC
      },
      attributes: ['id']
    });

    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    // Find the appointment using the retrieved id
    const appointment = await Appointment.findOne({
      where: { id: record.id },
      attributes: ['state', 'appointmentTime']
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    return res.json({
      state: appointment.state,
      appointmentTime: appointment.appointmentTime
    });
  } catch (error) {
    console.error('Error fetching appointment by specification:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


export const checkAppointment = async (req, res) => {
  try {
    const { searchType, familyCode, husbandName, husbandNIC, mode } = req.body;

    let appointment;

    if (searchType === 'familyCode') {
      appointment = await getAppointmentByFamilyCode(familyCode);
    } else if (searchType === 'specification') {
      const recordId = await getRecordIdByHusbandDetails(husbandName, husbandNIC, mode);
      if (recordId) {
        appointment = await getAppointmentById(recordId);
      }
    }

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.state === 'pending') {
      res.json({ redirectTo: '/pending-appointment' });
    } else if (appointment.state === 'processing') {
      res.json({ redirectTo: '/processing-appointment', appointmentTime: appointment.appointmentTime });
    }
  } catch (error) {
    console.error('Error checking appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


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
// Controller function to handle appointment search by family code
export const searchByFamilyCode = async (req, res) => {
  const { familyCode } = req.body;

  try {
    const appointment = await Appointment.findOne({
      where: { familyCode },
      attributes: ['state', 'appointmentTime'],
    });
    if (!appointment) {
      return res.status(404).json({ massage: "not found" });
    }

    return res.json({
      state: appointment.state,
      appointmentTime: appointment.appointmentTime,
    });
  } catch (error) {
    console.error('Error fetching appointment by family code:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
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
