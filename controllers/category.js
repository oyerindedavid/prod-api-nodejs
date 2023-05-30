const connection = require('../database');

exports.create_category = (req, res, next) => {
    var post = {
       name : req.body.name,
       visibility : req.body.visibility,
       user_id: req.body.user_id
    };
    
    const sql = "INSERT INTO category SET ? ";
      
    var query = connection.query(
        sql, post, function(error, results, fields) {
            if (error) throw error;
            res.json(results);
        }
    );  
    console.log(req.body);
}

exports.get_all_category = (req, res, next) => {
    const sql = "SELECT * FROM `category` ";
    connection.query(
      sql, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    ); 
}

exports.get_category_by_id = (req, res, next) => {
    const sql = "SELECT * FROM `category` WHERE id = ? ";
    connection.query(
        sql, req.params.id, function(error, results, fields) {
          if (error) throw error;
          res.json(results);
        }
    );
}

exports.update_category_field = (req, res, next) => {
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

exports.delete_category = (req, res, next) => {
    const sql = "DELETE FROM category WHERE id = ? ";
    var query = connection.query(
      sql, req.params.id, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
    console.log(query.sql);
}