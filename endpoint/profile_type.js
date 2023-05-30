const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../database');
const router = express.Router();

const ProfileTypeController = require('../controllers/profile_type')

// create application/json parser
var jsonParser = bodyParser.json()
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', jsonParser, ProfileTypeController.create_profile_type)
  
router.get('/', ProfileTypeController.get_all_profile_type)
  
router.get('/:id', ProfileTypeController.get_profile_type_by_id)
  
router.put('/:id', ProfileTypeController.update_profile_type_field)
  
router.delete('/:id', ProfileTypeController.delete_profile_type)


module.exports = router;