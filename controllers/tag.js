const connection = require('../database');

exports.create_tag = (req, res, next) => {
    var post = {
       name : req.body.name,
       visibility : req.body.visibility
    };
    
    const sql = "INSERT INTO tag SET ? ";
      
    var query = connection.query(
        sql, post, function(error, results, fields) {
            if (error) throw error;
            res.json(results);
        }
    );  
    console.log(query.sql);
}

exports.get_all_tag = (req, res, next) => {
    const sql = "SELECT * FROM `tag` ";
    connection.query(
      sql, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    ); 
}

exports.get_tag_by_id = (req, res, next) => {
    const sql = "SELECT * FROM `tag` WHERE id = ? ";
    connection.query(
        sql, req.params.id, function(error, results, fields) {
          if (error) throw error;
          res.json(results);
        }
    );
}

exports.update_tag_field = (req, res, next) => {
    var tbName = req.body.tablename;
    var tbValue = req.body.tablevalue;
    var values = [tbName, tbValue, req.params.id];
    const sql = "UPDATE tag SET ?? = ?  WHERE id = ? ";
    var query = connection.query(
      sql, values, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
    console.log(query.sql);
}

exports.delete_tag = (req, res, next) => {
    const sql = "DELETE FROM tag WHERE id = ? ";
    var query = connection.query(
      sql, req.params.id, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
    console.log(query.sql);
}