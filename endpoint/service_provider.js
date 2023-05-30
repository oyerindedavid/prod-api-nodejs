const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../database');
const router = express.Router();

const SPController = require('../controllers/service_provider')

// create application/json parser
var jsonParser = bodyParser.json()
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', jsonParser, SPController.create_service_provider)
  
router.get('/', SPController.get_all_service_provider)
  
router.get('/:id', SPController.get_service_provider_by_id)

router.put('/update-description/:pid', jsonParser, SPController.update_description)

router.put('/update-contact/:pid', jsonParser, SPController.update_contact)

router.get('/account/:id', SPController.get_service_provider_by_accountid)

router.get('/account/:aid/profile/:pid', SPController.get_service_provider_by_accountId_and_profileId)
  
router.put('/full/:id', jsonParser, SPController.update_all_fields)

router.put('/media/dp/:id', jsonParser, SPController.update_dp)

router.put('/media/banner/:id', jsonParser, SPController.update_banner)
   
router.put('/:id', jsonParser, SPController.update_service_provider_field)
  
router.delete('/:id', SPController.delete_service_provider)

module.exports = router;