import Appointment from '../Models/appointment.js';



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

export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id);
    if (appointment) {
      res.status(200).json(appointment);
    } else {
      res.status(404).json({ error: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { appointmentTime, familyCode, Id, state } = req.body;
    const [updated] = await Appointment.update({ appointmentTime, familyCode, Id, state }, {
      where: { id }
    });
    if (updated) {
      const updatedAppointment = await Appointment.findByPk(id);
      res.status(200).json(updatedAppointment);
    } else {
      res.status(404).json({ error: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
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
