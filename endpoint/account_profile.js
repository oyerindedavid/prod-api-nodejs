const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const AccountProfile = require('../controllers/account_profile')

// create application/json parser
var jsonParser = bodyParser.json()
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', AccountProfile.get_all_account_profile_profile);

router.get('/:id', AccountProfile.get_account_profile_by_id);

module.exports = router;