// model.js
const connection = require('../../db/db.config');

const getAllData = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM category';
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};
const getAllser = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM service';
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const getDataById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM category WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
};

const addData = (data) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO category SET ?';
    connection.query(query, data, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.insertId);
      }
    });
  });
};

const updateData = (id, data) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE category SET ? WHERE CategoryID = ?'; // Adjust the column names accordingly
    connection.query(query, [data, id], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve('Data updated successfully');
      }
    });
  });
};

const updateData1 = (ServiceID, data1) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE service SET ? WHERE ServiceID = ?'; // Adjust the column names accordingly
    connection.query(query, [data1, ServiceID], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve('Data updated successfully');
      }
    });
  });
};

const deleteData = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM category WHERE CategoryID = ?';
    connection.query(query, [id], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve('Data deleted successfully');
      }
    });
  });
};

const deleteData1 = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM service WHERE ServiceID = ?';
    connection.query(query, [id], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve('Data deleted successfully');
      }
    });
  });
};

const addService = (categoryId, serviceName, type) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO Service (CategoryID, ServiceName, Type) VALUES (?, ?, ?)';
    connection.query(query, [categoryId, serviceName, type], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.insertId);
      }
    });
  });
};

module.exports = { getAllData,getAllser, getDataById, addData, updateData,updateData1, deleteData,deleteData1 ,addService };
