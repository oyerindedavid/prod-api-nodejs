const connection = require('../database');

exports.create_subscription = (req, res, next) => {
    var post = {
        account_id : req.body.account_id,
        profile_id : req.body.profile_id,
        user_id : req.body.user_id
      };
     const sql = "INSERT INTO subscription SET ? ";
     var query = connection.query(
         sql, post, function(error, results, fields) {
           if (error) throw error;
           res.json(results);
         }
       );  
       console.log(query.sql);
}

exports.get_all_subscription = (req, res, next) => {
    const sql = "SELECT * FROM `subscription` ";
    connection.query(
      sql, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    ); 
}

exports.get_subscription_by_id = (req, res, next) => {
    const sql = "SELECT * FROM `subscription` WHERE id = ? ";
    connection.query(
        sql, req.params.id, function(error, results, fields) {
          if (error) throw error;
          res.json(results);
        }
    );
}

exports.update_subscription_field = (req, res, next) => {
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

exports.delete_subscription = (req, res, next) => {
    const sql = "DELETE FROM subscription WHERE id = ? ";
    var query = connection.query(
      sql, req.params.id, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
    console.log(query.sql);
}