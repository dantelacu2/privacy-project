const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/admin-auth', adminController.getAdminPassword);

router.post('/admin-auth', adminController.postAdminPassword);

// /admin/add-company => POST
router.post('/add-company', adminController.postAddCompany);


module.exports = router;