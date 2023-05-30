const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const SaleController = require('../controllers/sale')

// create application/json parser
var jsonParser = bodyParser.json()
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', jsonParser, SaleController.create_sale)
  
router.get('/', SaleController.get_all_sale)
  
router.get('/:id', SaleController.get_sale_by_id)
  
router.put('/full/:id', jsonParser, SaleController.update_all_field)
   
router.put('/:id', jsonParser, SaleController.update_a_field)
  
router.delete('/:id', SaleController.delete_sale)

module.exports = router;