const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../database');
const router = express.Router();

const ReviewController = require('../controllers/review')

// create application/json parser
var jsonParser = bodyParser.json()
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', jsonParser, ReviewController.create_review)
  
router.get('/', ReviewController.get_all_review)
  
router.get('/:id', ReviewController.get_review_by_id)
  
router.put('/full/:id', ReviewController.update_all_fields)
   
router.put('/:id', ReviewController.update_review_field)
  
router.delete('/:id', ReviewController.delete_review)


module.exports = router;