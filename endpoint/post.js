const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const PostController = require('../controllers/post')

// create application/json parser
var jsonParser = bodyParser.json()
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', jsonParser, PostController.get_all_post)

router.get('/:id', jsonParser, PostController.get_post_by_id)

router.get('/filter/:limit/:offset', jsonParser, PostController.get_post_by_limit)

router.get('/filterbycategory/:cid/:limit/:offset', jsonParser, PostController.get_post_by_category_limit)

router.get('/aid/:id', jsonParser, PostController.get_post_by_accountId)

module.exports = router;