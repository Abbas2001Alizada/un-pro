
import records from '../Models/records.js';

export const getAllRecords = async (req, res) => {
  try {
    const record = await records.findAll();
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await records.findByPk(id);
    if (record) {
      res.status(200).json(record);
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createRecord = async (req, res) => {
  try {
    const {Name,lastName,fatherName,GfatherName,gender,birthDate,birthPlace,residency,NIC,nation,religion,state,coupleId} = req.body;
    const record = await records.create({Name,lastName,fatherName,GfatherName,gender,birthDate,birthPlace,residency,NIC,nation,religion,state,coupleId});
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const {Name,lastName,fatherName,GfatherName,gender,birthDate,birthPlace,residency,NIC,nation,religion,state,coupleId} = req.body;
    const [updated] = await records.update({Name,lastName,fatherName,GfatherName,gender,birthDate,birthPlace,residency,NIC,nation,religion,state,coupleId}, {
      where: { id }
    });
    if (updated) {
      const updatedRecord = await records.findByPk(id);
      res.status(200).json(updatedRecord);
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await records.destroy({
      where: { id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
