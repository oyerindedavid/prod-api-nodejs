const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../database');
const router = express.Router();

const ResponseController = require('../controllers/response')

// create application/json parser
var jsonParser = bodyParser.json()
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', jsonParser, ResponseController.create_response)
  
router.get('/', ResponseController.get_all_response)
  
router.get('/:id', ResponseController.get_response_by_id)

router.get('/post/:id', ResponseController.get_response_by_postid)
  
router.put('/full/:id', ResponseController.update_all_fields)
   
router.put('/:id', ResponseController.update_response_field)
  
router.delete('/:id', ResponseController.delete_response)


module.exports = router;