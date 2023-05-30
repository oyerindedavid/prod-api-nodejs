const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../database');
const router = express.Router();

const ReportController = require('../controllers/report')

// create application/json parser
var jsonParser = bodyParser.json()
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', jsonParser, ReportController.create_report)
  
router.get('/', ReportController.get_all_report)
  
router.get('/:id', ReportController.get_report_by_id)
  
router.put('/full/:id', ReportController.update_all_fields)
   
router.put('/:id', ReportController.update_report_field)
  
router.delete('/:id', ReportController.delete_report)

module.exports = router;