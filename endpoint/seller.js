const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../database');
const router = express.Router();

const SellerController = require('../controllers/seller')

// create application/json parser
var jsonParser = bodyParser.json()
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', jsonParser, SellerController.create_seller)
  
router.get('/', SellerController.get_all_seller)
  
router.get('/:id', SellerController.get_seller_by_id)

router.put('/update-description/:pid', jsonParser, SellerController.update_description)

router.put('/update-contact/:pid', jsonParser, SellerController.update_contact)

router.get('/account/:id', SellerController.get_seller_by_accountid)

router.get('/account/:aid/profile/:pid', SellerController.get_seller_by_accountId_and_profileId)
  
router.put('/full/:id', jsonParser, SellerController.update_all_fields)

router.put('/media/dp/:id', jsonParser, SellerController.update_dp)

router.put('/media/banner/:id', jsonParser, SellerController.update_banner)
   
router.put('/:id', jsonParser, SellerController.update_seller_field)
  
router.delete('/:id', SellerController.delete_seller)

module.exports = router;