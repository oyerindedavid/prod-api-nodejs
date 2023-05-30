const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../database');
const router = express.Router();

const PushController = require('../controllers/push_token')

// create application/json parser
var jsonParser = bodyParser.json()
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', jsonParser, PushController.create_push_token)
  
router.get('/', PushController.get_all_push_token)

router.get('/account/:aid', PushController.get_push_token_by_account_id)

router.get('/:id', PushController.get_push_token_by_id)
  
router.put('/full/:id', jsonParser, PushController.update_all_fields)
   
router.put('/:id', jsonParser, PushController.update_push_token_field)
  
router.delete('/:id', PushController.delete_push_token)

module.exports = router;