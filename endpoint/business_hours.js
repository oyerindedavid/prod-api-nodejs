const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const OpeningTimeControler = require('../controllers/business_hours')

// create application/json parser
var jsonParser = bodyParser.json()
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', jsonParser, OpeningTimeControler.create_opening_time)
  
router.get('/', OpeningTimeControler.get_all_opening_time)
  
router.get('/:id', OpeningTimeControler.get_opening_time_by_id)
   
router.put('/', jsonParser, OpeningTimeControler.update_opening_time_field)
  
router.delete('/:id', OpeningTimeControler.delete_opening_time)


module.exports = router;