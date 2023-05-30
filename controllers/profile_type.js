const connection = require('../database');

exports.create_profile_type = (req, res, next) => {
    var post = {
        profile_type : req.body.profile_type,
        action : req.body.action,
        description : req.body.description,
        visibility : req.body.visibility,
    };

    const sql = "INSERT INTO profile_type SET ? ";
    var query = connection.query(
      sql, post, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );  
    console.log(query.sql);
}

exports.get_all_profile_type = (req, res, next) => {
    const sql = "SELECT * FROM `profile_type` ORDER BY id DESC";
    connection.query(
      sql, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    ); 
}

exports.get_profile_type_by_id = (req, res, next) => {
    const sql = "SELECT * FROM `profile_type` WHERE id = ? ";
      connection.query(
        sql, req.params.id, function(error, results, fields) {
          if (error) throw error;
          res.json(results);
        }
    );
}

exports.update_profile_type_field = (req, res, next) => {
    var tbName = req.body.tablename;
    var tbValue = req.body.tablevalue;
    var values = [tbName, tbValue, req.params.id];
    const sql = "UPDATE account SET ?? = ?  WHERE id = ? ";
    var query = connection.query(
      sql, values, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
    console.log(query.sql);
}

exports.delete_profile_type = (req, res, next) => {
    const sql = "DELETE FROM profile_type WHERE id = ? ";
    var query = connection.query(
      sql, req.params.id, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
    console.log(query.sql);
}