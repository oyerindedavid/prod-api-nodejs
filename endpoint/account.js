const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const AccountController = require('../controllers/account')

// create application/json parser
var jsonParser = bodyParser.json()
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', jsonParser, AccountController.create_account);

router.get('/', AccountController.get_all_account);

router.get('/:id', AccountController.get_account_by_id);

router.get('/firebase/:id', AccountController.get_account_by_firebaseid);

router.get('/account/:aid/profile/:pid', AccountController.get_searcher_by_accountId_and_profileId)

router.put('/:id', jsonParser, AccountController.update_account_by_id);

router.delete('/:id', jsonParser, AccountController.delete_account);

router.put('/:id/activity', AccountController.deactivate_account);

module.exports = router;