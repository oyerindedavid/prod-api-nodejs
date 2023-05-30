const connection = require('../database');

exports.create_account = (req, res, next) => {
  console.log(req.body);
    var post = {
        id : req.body.id,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        display_name : req.body.displayname,
        display_image : req.body.displayimage,
        phone : req.body.phone,
        email : req.body.email,
        city : req.body.city,
        state : req.body.state,
        country : req.body.country,
        address : req.body.address,
        activity_status : 1
    };

    const sql = "INSERT INTO account SET ? ";
    var query = connection.query(
        sql, post, function(error, results, fields) {
            if (error) throw error;
            res.json(results);
        }
    );  
}

exports.get_all_account = (req, res, next) => {
    const sql = "SELECT * FROM account ORDER BY id DESC ";
    connection.query(
      sql, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    ); 
}

exports.get_account_by_id = (req, res, next) => {
  const sql = "SELECT * FROM account WHERE id = ? ";
  connection.query(
  sql, req.params.id, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
  ); 
}

exports.get_searcher_by_accountId_and_profileId = (req, res, next) => {
  const sql = "SELECT * FROM account WHERE id = ? ";
  connection.query(
  sql, req.params.aid, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
  ); 
}

exports.get_account_by_firebaseid = (req, res, next) => {
  const sql = "SELECT * FROM account WHERE account_id = ? ";
  connection.query(
  sql, req.params.id, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
  ); 
}

exports.update_account_by_id = (req, res, next) => {
    var tbName = req.body.tablename;
    var tbValue = req.body.tablevalue;
    var obj = {};
    obj[tbName] = tbValue;
    var values = [obj, req.params.id];
    const sql = "UPDATE account SET ?  WHERE id = ? ";
    var query = connection.query(
      sql, values, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
    console.log(query.sql); 
}

exports.delete_account = (req, res, next) => {
    const sql =  "DELETE FROM account WHERE id = ? ";
    var query = connection.query(
        sql, req.params.id, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
        }
    );
    console.log(query.sql);
}

exports.deactivate_account = (req, res, next) => {
    const sql = "UPDATE account SET activitystatus = 0 WHERE id = ? ";
    connection.query(
      sql, req.params.id, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
}
