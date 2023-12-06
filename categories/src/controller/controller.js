// controller.js
const { addService, getAllData,getAllser, getDataById, addData, updateData,updateData1, deleteData,deleteData1 } = require('../models/model');

const getAll = async (req, res) => {
  try {
    const data = await getAllData();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAlls = async (req, res) => {
  try {
    const data = await getAllser();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getDataById(id);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const add = async (req, res) => {
  try {
    const newData = req.body;
    const id = await addData(newData);
    res.status(201).json({ id, ...newData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const update = async (req, res) => {
  try {
    const { categoryId } = req.params; // Assuming the parameter is named categoryId
    const updatedData = req.body;
    await updateData(categoryId, updatedData);
    res.json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const update1 = async (req, res) => {
  try {
    const { ServiceID } = req.params; 
    const updatedData11 = req.body;
    await updateData1(ServiceID, updatedData11);
    res.json({ message: 'Data updateddd successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const remove = async (req, res) => {
  try {
    const { categoryId } = req.params;
    await deleteData(categoryId);
    res.json({ message: 'Data deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const remove1 = async (req, res) => {
  try {
    const { ServiceID } = req.params;
    await deleteData1(ServiceID);
    res.json({ message: 'Data deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addServiceHandler = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { serviceName, type } = req.body;
    
    // Add validation for required fields if necessary
    
    const ServiceID = await addService(categoryId, serviceName, type);
    res.status(201).json({ ServiceID, serviceName, type });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAll,getAlls, getById, add, update,update1, remove,remove1 ,addServiceHandler };
