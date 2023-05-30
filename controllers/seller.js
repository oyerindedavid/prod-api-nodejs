const connection = require('../database');

const util = require('util');

const query = util.promisify(connection.query).bind(connection);

exports.create_seller = async(req, res, next) => {
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
      const result = await query("INSERT INTO seller SET ? ", post);

      var data = {
        account_id : post.account_id,
        profile_id : result.insertId,
        profile_type_id : req.body.profile_type_id
      };

      await query("INSERT INTO account_profile SET ?", data);
    
      const result3 = await query("SELECT * FROM seller WHERE id = ?", result.insertId);
  
      res.json(result3[0]);
    }catch(err){
       console.log(err);
    }    
}

exports.get_all_seller = (req, res, next) => {
    const sql = "SELECT * FROM `seller` ";
      connection.query(
        sql, function(error, results, fields) {
          if (error) throw error;
          res.json(results);
        }
      ); 
}

exports.get_seller_by_id = (req, res, next) => {
    const sql = "SELECT * FROM `seller` WHERE id = ?";
    connection.query(
      sql, req.params.id, function(error, results, fields) {
        if (error) throw error;
        res.json(results[0]);
      }
    );
}

exports.get_seller_by_accountid = async(req, res, next) => {
  const result = await query("SELECT * FROM `seller` WHERE account_id = ?", req.params.id);

  const queryBusinessHours = await query("SELECT * FROM business_hours WHERE profile_id = ? ORDER BY weekday ASC", result[0].id);

  result[0].business_hours = queryBusinessHours;

  res.json(result[0]);
}

exports.get_seller_by_accountId_and_profileId = async(req, res, next) => {
  var data = [req.params.pid, req.params.aid];
  const result = await query("SELECT * FROM `seller` WHERE id = ? AND account_id = ? ", data);

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
        display_image : req.body.information,
        account_id : req.body.account_id,
        user_id : req.body.user_id
      };
      var values = [post, req.params.id];
      const sql = "UPDATE seller SET ? WHERE id = ? ";
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
  const sql = "UPDATE seller SET display_image = ? WHERE id = ? ";
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
  const sql = "UPDATE seller SET banner_image = ? WHERE id = ? ";
  var query = connection.query(
    sql, values, function(error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
  console.log(query.sql);
}

exports.update_description = async(req, res, next) => {
  var values = [req.body.description, req.params.pid, req.body.account_id];
  const sql = "UPDATE seller SET description = ? WHERE id = ? AND account_id = ? ";
  try{
    var result = await query(sql, values);
    res.json(result);
  }catch(err){
    throw new Error(err.message);
  }
}

exports.update_contact = async(req, res, next) => {
  var values = [req.body.phone, req.body.email, req.body.city, req.body.state, req.body.country, req.params.pid, req.body.account_id];
  const sql = "UPDATE seller SET phone = ?, email = ?, city = ?, state = ?, country = ? WHERE id = ? AND account_id = ? ";
  try{
    var result = await query(sql, values);
    res.json(result);
  }catch(err){
    throw new Error(err.message);
  }
}

exports.update_seller_field = (req, res, next) => {
    var tbName = req.body.tablename;
    var tbValue = req.body.tablevalue;
    var values = [tbName, tbValue, req.params.id];
    const sql = "UPDATE seller SET ?? = ?  WHERE id = ? ";
    var query = connection.query(
      sql, values, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
    console.log(query.sql);
}

exports.delete_seller = (req, res, next) => {
    const sql = "DELETE FROM seller WHERE id = ? ";
    var query = connection.query(
      sql, req.params.id, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
    console.log(query.sql);
}