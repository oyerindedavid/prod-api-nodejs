const connection = require('../database');

const util = require('util');

const query = util.promisify(connection.query).bind(connection);

exports.create_service_provider = async(req, res, next) => {
    var post = {
        business_name : req.body.business_name,
        category_id : req.body.category_id,
        phone : req.body.phone,
        email : req.body.email,
        description : req.body.description,
        street_name : req.body.street_name,
        city : req.body.city,
        state : req.body.state,
        country : req.body.country,
        gps_location : req.body.gps_location,
        place_id : req.body.place_id,
        is_registered : req.body.is_registered,
        visibility : req.body.visibility,
        delete_status : req.body.delete_status,
        account_id : req.body.account_id,
    };

    try{
      const result = await query("INSERT INTO service_provider SET ? ", post);

      var data = {
        account_id : post.account_id,
        profile_id : result.insertId,
        profile_type_id : req.body.profile_type_id
      };

      await query("INSERT INTO account_profile SET ?", data);
    
      const result3 = await query("SELECT * FROM service_provider WHERE id = ?", result.insertId);
  
      res.json(result3[0]);
    }catch(err){
        console.log(err);
    }
}

exports.get_all_service_provider = (req, res, next) => {
    const sql = "SELECT * FROM `service_provider` ";
      connection.query(
        sql, function(error, results, fields) {
          if (error) throw error;
          res.json(results);
        }
      ); 
}

exports.get_service_provider_by_id = async(req, res, next) => {
   try{
    const sql =  await query("SELECT * FROM service_provider WHERE id = ?", req.params.id);
    res.json(sql);
   }catch(err){
    throw new Error(err.message);
   }
}

exports.get_service_provider_by_accountid = (req, res, next) => {
  const sql = "SELECT * FROM service_provider WHERE account_id = ?";
  connection.query(
    sql, req.params.id, function(error, results, fields) {
      if (error) throw error;
      res.json(results[0]);
    }
  );
}

exports.get_service_provider_by_accountId_and_profileId = async(req, res, next) => {
  var data = [req.params.pid, req.params.aid];
  const result = await query("SELECT * FROM `service_provider` WHERE id = ? AND account_id = ? ", data);

  const queryBusinessHours = await query("SELECT * FROM business_hours WHERE profile_id = ? ORDER BY weekday ASC", result[0].id);

  result[0].business_hours = queryBusinessHours;

  res.json(result[0]);
}

exports.update_all_fields = (req, res, next) =>{
    var post = {
        business_name : req.body.business_name,
        category_id : req.body.category_id,
        description : req.body.description,
        street_name : req.body.street_name,
        city : req.body.city,
        state : req.body.state,
        country : req.body.country,
        gps_location : req.body.gps_location,
        registered : req.body.registered,
        visibility : req.body.visibility,
        delete_status : req.body.unit,
        account_id : req.body.account_id,
      };
      var values = [post, req.params.id];
      const sql = "UPDATE service_provider SET ? WHERE id = ? ";
      var query = connection.query(
          sql, values, function(error, results, fields) {
            if (error) throw error;
            res.json(results);
          }
      );  
      console.log(query.sql);
}

exports.update_dp = (req, res, next) => {
  var values = [req.body.display_image, req.params.id];
  const sql = "UPDATE service_provider SET display_image = ? WHERE id = ? ";
  var query = connection.query(
    sql, values, function(error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
  console.log(query.sql);
}

exports.update_banner = (req, res, next) => {
  var values = [req.body.banner_image, req.params.id];
  const sql = "UPDATE service_provider SET banner_image = ? WHERE id = ? ";
  var query = connection.query(
    sql, values, function(error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
  console.log(sql);
}

exports.update_description = async(req, res, next) => {
  var values = [req.body.description, req.params.pid, req.body.account_id];
  const sql = "UPDATE service_provider SET description = ? WHERE id = ? AND account_id = ? ";
  try{
    var result = await query(sql, values);
    res.json(result);
  }catch(err){
    throw new Error(err.message);
  }
}

exports.update_contact = async(req, res, next) => {
  var values = [
    req.body.phone, 
    req.body.email, 
    req.body.city, 
    req.body.state,
    req.body.country,
    req.params.pid, 
    req.body.account_id];
  const sql = "UPDATE service_provider SET phone = ?, email = ?, city = ?, state = ?, country = ? WHERE id = ? AND account_id = ? ";
  try{
    var result = await query(sql, values);
    res.json(result);
  }catch(err){
    throw new Error(err.message);
  }
}

exports.update_service_provider_field = (req, res, next) => {
    var tbName = req.body.tablename;
    var tbValue = req.body.tablevalue;
    var values = [tbName, tbValue, req.params.id];
    const sql = "UPDATE service_provider SET ?? = ?  WHERE id = ? ";
    var query = connection.query(
      sql, values, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
    console.log(query.sql);
}

exports.update_service_provider_field = (req, res, next) => {
  var tbName = req.body.tablename;
  var tbValue = req.body.tablevalue;
  var values = [tbName, tbValue, req.params.id];
  const sql = "UPDATE service_provider SET ?? = ?  WHERE id = ? ";
  var query = connection.query(
    sql, values, function(error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
  console.log(query.sql);
}

exports.delete_service_provider = (req, res, next) => {
    const sql = "DELETE FROM service_provider WHERE id = ? ";
    var query = connection.query(
      sql, req.params.id, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
    console.log(query.sql);
}