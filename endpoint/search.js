const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const SearchController = require('../controllers/search')

// create application/json parser
var jsonParser = bodyParser.json()
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', jsonParser, SearchController.create_search)

router.get('/', SearchController.get_all_search)
  
router.get('/:id', SearchController.get_search_by_id)
  
router.put('/full/:id', jsonParser, SearchController.update_all_field)

router.put('/:id', jsonParser, SearchController.update_a_field)
  
router.delete('/:id', jsonParser, SearchController.delete_search)

module.exports = router;