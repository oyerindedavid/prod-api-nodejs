const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../database');
const router = express.Router();

const SubscriptionController = require('../controllers/subscription')

// create application/json parser
var jsonParser = bodyParser.json()
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', jsonParser, SubscriptionController.create_subscription)
  
router.get('/', SubscriptionController.get_all_subscription)
  
router.get('/:id', SubscriptionController.get_subscription_by_id)
  
router.put('/:id', SubscriptionController.update_subscription_field)
  
router.delete('/:id', SubscriptionController.delete_subscription)


module.exports = router;