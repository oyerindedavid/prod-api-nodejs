const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../database');
const router = express.Router();

const ServiceController = require('../controllers/service')

// create application/json parser
var jsonParser = bodyParser.json()
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', jsonParser, ServiceController.create_service)
  
router.get('/', ServiceController.get_all_service)
  
router.get('/:id', ServiceController.get_service_by_id)
  
router.put('/full/:id', jsonParser, ServiceController.update_all_field)
  
router.put('/:id', ServiceController.update_a_field)
  
router.delete('/:id', ServiceController.delete_service)

module.exports = router;