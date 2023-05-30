const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../database');
const router = express.Router();

const CategoryController = require('../controllers/category')

// create application/json parser
var jsonParser = bodyParser.json()
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', jsonParser, CategoryController.create_category)
  
router.get('/', CategoryController.get_all_category)
  
router.get('/:id', CategoryController.get_category_by_id)
  
router.put('/:id', jsonParser, CategoryController.update_category_field)
  
router.delete('/:id', CategoryController.delete_category)


module.exports = router;