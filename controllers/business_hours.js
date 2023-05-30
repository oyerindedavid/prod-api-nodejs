const connection = require('../database');

const util = require('util');
const { json } = require('body-parser');

const query = util.promisify(connection.query).bind(connection);

exports.create_opening_time = async(req, res, next) => {
  businessTime = req.body.business_info.time;
  console.log(businessTime);

  for(let bt of businessTime){
    var data = {
      profile_id : req.body.business_info.profile_id,
      profile_type_id : req.body.business_info.profile_type_id,
      weekday : bt.weekDay,
      open : bt.hours.open,
      close : bt.hours.close
    };
    try{
      const result = await query("INSERT INTO business_hours SET ? ", data);
    }catch(err){
      console.log(err);
    }
  } 
}

exports.get_all_opening_time = (req, res, next) => {
    const sql = "SELECT * FROM `business_hours` ";
    connection.query(
      sql, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    ); 
}

exports.get_opening_time_by_id = (req, res, next) => {
    const sql = "SELECT * FROM `business_hours` WHERE id = ? ";
    connection.query(
        sql, req.params.id, function(error, results, fields) {
          if (error) throw error;
          res.json(results);
        }
    );
}

exports.update_opening_time_field = async(req, res, next) => {
  businessTime = req.body.business_info.time;
  console.log(businessTime);
  

  for(let bt of businessTime){
    try{
      var data = [bt.hours.open, bt.hours.close, bt.weekDay, req.body.business_info.profile_id, req.body.business_info.profile_type_id];
      const result = await query("UPDATE business_hours SET open = ?, close = ? WHERE weekday = ? AND profile_id = ? AND profile_type_id = ?", data);
    }catch(err){
      console.log(err);
    }
  } 
}



exports.delete_opening_time = (req, res, next) => {
    const sql = "DELETE FROM business_hours WHERE id = ? ";
    var query = connection.query(
      sql, req.params.id, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
    console.log(query.sql);
}