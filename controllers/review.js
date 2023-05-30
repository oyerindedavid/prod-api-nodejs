const connection = require('../database');

exports.create_review = (req, res, next) => {
    var post = {
        profile_id : req.body.profile_id,
        rating : req.body.rating,
        message : req.body.message,
        visibility: req.body.visibility,
        account_id : req.body.user_id
      };
     const sql = "INSERT INTO review SET ? ";
     var query = connection.query(
         sql, post, function(error, results, fields) {
           if (error) throw error;
           res.json(results);
         }
       );  
       console.log(query.sql);
}

exports.get_all_review = (req, res, next) => {
    const sql = "SELECT * FROM `review` ";
    connection.query(
      sql, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    ); 
}

exports.get_review_by_id = (req, res, next) => {
    const sql = "SELECT * FROM `review` WHERE id = ? ";
    connection.query(
        sql, req.params.id, function(error, results, fields) {
          if (error) throw error;
          res.json(results);
        }
    );
}

exports.update_review_field = (req, res, next) => {
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

exports.update_all_fields = (req, res, next) => {
    var post = {
        profile_id : req.body.profile_id,
        rating : req.body.rating,
        message : req.body.message,
        visibility: req.body.visibility,
        user_id : req.body.user_id
    };
    var values = [post, req.params.id];
    const sql = "UPDATE review SET ?  WHERE id = ? ";
    var query = connection.query(
        sql, values, function(error, results, fields) {
          if (error) throw error;
          res.json(results);
        }
    );  
    console.log(query.sql);
}

exports.delete_review = (req, res, next) => {
    const sql = "DELETE FROM review WHERE id = ? ";
    var query = connection.query(
      sql, req.params.id, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
    console.log(query.sql);
}