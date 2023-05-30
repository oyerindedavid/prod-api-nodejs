const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const TagController = require('../controllers/tag')

// create application/json parser
var jsonParser = bodyParser.json()
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', jsonParser, TagController.create_tag)
  
router.get('/', TagController.get_all_tag)
  
router.get('/:id', TagController.get_tag_by_id)
  
router.put('/:id', jsonParser, TagController.update_tag_field)
  
router.delete('/:id', TagController.delete_tag)


module.exports = router;