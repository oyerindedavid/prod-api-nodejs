const connection = require('../database');

exports.create_report = (req, res, next) => {
    var post = {
        post_id : req.body.post_id,
        status : req.body.status,
        account_id : req.body.account_id,
        user_id : req.body.user_id
      };
     const sql = "INSERT INTO report SET ? ";
     var query = connection.query(
         sql, post, function(error, results, fields) {
           if (error) throw error;
           res.json(results);
         }
       );  
       console.log(query.sql);
}

exports.get_all_report = (req, res, next) => {
    const sql = "SELECT * FROM `report` ";
    connection.query(
      sql, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    ); 
}

exports.get_report_by_id = (req, res, next) => {
    const sql = "SELECT * FROM `report` WHERE id = ? ";
    connection.query(
        sql, req.params.id, function(error, results, fields) {
          if (error) throw error;
          res.json(results);
        }
    );
}

exports.update_report_field = (req, res, next) => {
    var tbName = req.body.tablename;
    var tbValue = req.body.tablevalue;
    var values = [tbName, tbValue, req.params.id];
    const sql = "UPDATE report SET ?? = ?  WHERE id = ? ";
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
        post_id : req.body.post_id,
        status : req.body.status,
        account_id : req.body.account_id,
        user_id : req.body.user_id
      };
    var values = [post, req.params.id];
    const sql = "UPDATE report SET ?  WHERE id = ? ";
    var query = connection.query(
        sql, values, function(error, results, fields) {
          if (error) throw error;
          res.json(results);
        }
    );  
    console.log(query.sql);
}

exports.delete_report = (req, res, next) => {
    const sql = "DELETE FROM report WHERE id = ? ";
    var query = connection.query(
      sql, req.params.id, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
    console.log(query.sql);
}