const connection = require('../database');

exports.create_push_token = (req, res, next) => {
    var post = {
        token : req.body.token,
        platform : req.body.platform,
        validity_status: req.body.validity_status,
        account_id : req.body.account_id,
    };

    const sql = "INSERT INTO push_token SET ? ";
    var query = connection.query(
      sql, post, function(error, results, fields) {
          if (error) throw error;
          res.json(results);
      }
    );  
    console.log(query.sql);
}

exports.get_all_push_token = (req, res, next) => {
    const sql = "SELECT * FROM `push_token` ";
    connection.query(
      sql, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    ); 
}

exports.get_push_token_by_account_id = (req, res, next) => {
  const sql = "SELECT * FROM `push_token` WHERE account_id = ? ";
  connection.query(
    sql, req.params.aid, function(error, results, fields) {
          if (error) throw error;
          res.json(results[0]);
    }
  );
}

exports.get_push_token_by_id = (req, res, next) => {
  const sql = "SELECT * FROM `push_token` WHERE id = ? ";
  connection.query(
    sql, req.params.id, function(error, results, fields) {
          if (error) throw error;
          res.json(results);
    }
  );
}

exports.update_push_token_field = (req, res, next) => {
    var tbName = req.body.tablename;
    var tbValue = req.body.tablevalue;
    var values = [tbName, tbValue, req.params.id];
    const sql = "UPDATE push_token SET ?? = ?  WHERE id = ? ";
    var query = connection.query(
      sql, values, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
    console.log(query.sql);
}

exports.update_all_fields = (req, res, next) => {
    var post = {
        token : req.body.token,
        platform : req.body.platform,
        validity_status: req.body.validity_status,
        account_id : req.body.account_id,
        user_id: req.body.user_id
      };
      var values = [post, req.params.id];
      const sql = "UPDATE push_token SET ?  WHERE id = ? ";
      var query = connection.query(
          sql, values, function(error, results, fields) {
            if (error) throw error;
            res.json(results);
          }
      );  
      console.log(query.sql);
}

exports.delete_push_token = (req, res, next) => {
    const sql = "DELETE FROM push_token WHERE id = ? ";
    var query = connection.query(
      sql, req.params.id, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
    console.log(query.sql);
}