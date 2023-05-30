require('dotenv').config()
const express = require('express');
const app = express();

const  account = require('./endpoint/account') 
const  category = require('./endpoint/category')
const  post = require('./endpoint/post')
const  business_hours = require('./endpoint/business_hours')
const  profile_type = require('./endpoint/profile_type')
const  seller = require('./endpoint/seller')
const  sale = require('./endpoint/sale')
const  tag = require('./endpoint/tag')
const  search = require('./endpoint/search')
const  service = require('./endpoint/service')
const  response = require('./endpoint/response')
const  report = require('./endpoint/report')
const  review = require('./endpoint/review')
const  push_token = require('./endpoint/push_token')
const  subscription = require('./endpoint/subscription')
const  service_provider = require('./endpoint/service_provider')
const account_profile = require('./endpoint/account_profile')

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT POST GET DELETE');
    return res.status(200).json({});
  }
  next();
})

app.get('/', (req, res) => {
  res.status(200).send(`Hello World Now!`);
});

app.use('/account', account);
app.use('/category', category);
app.use('/post', post);
app.use('/business_hours', business_hours);
app.use('/profile_type', profile_type);
app.use('/seller', seller);
app.use('/sale', sale);
app.use('/tag', tag);
app.use('/search', search);
app.use('/service', service);
app.use('/report', report);
app.use('/response', response);
app.use('/review', review);
app.use('/push_token', push_token);
app.use('/subscription', subscription);
app.use('/service_provider', service_provider);
app.use('/account_profile', account_profile);


//Port 8080 for Google App Engine
/* app.set('port', process.env.PORT || 8080);
app.listen(8080); */

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});