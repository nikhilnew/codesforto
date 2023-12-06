// route.js
const express = require('express');
const { addServiceHandler ,getAll,getAlls, getById, add, update,update1, remove,remove1 } = require('../controller/controller');

const router = express.Router();

router.get('/GET/categories', getAll);
router.get('/data/:id', getById);
router.post('/POST/category', add);
router.put('/PUT/category/:categoryId', update);
router.delete('/DELETE/category/:categoryId', remove);
router.post('/POST/category/service', addServiceHandler);
router.get('/GET/category/services', getAlls);
router.delete('/DELETE/category/service/:serviceId', remove1);
router.put('/PUT/category/service/:serviceId', update1);

module.exports = router;
