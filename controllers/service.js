const conn = require('../database');

exports.create_service = (req, res, next) => {
  var post = {
    name : req.body.name,
    images : req.body.images,
    description : req.body.description,
    profile_type_id: req.body.profile_type_id,
    service_provider_id : req.body.seller_id,
    account_id : req.body.account_id,
    user_id : req.body.user_id
  };
      
    conn.beginTransaction(function(err){
        if(err){throw err;}
        conn.query(
          "INSERT INTO service SET ? ", post, function(error, results, fields) {
              if (error){
                return conn.rollback(function(){
                  throw error;
                });
              }
              res.json(results);
    
              var data = {
                post_id :  results.insertId,
                profile_type_id: req.body.profile_type_id,
                category_id : req.body.category_id,
                account_id : req.body.account_id,
                user_id : req.body.user_id
              }
                
             conn.query(
                  "INSERT INTO post SET ?", data, function(error, results, fields) {
                    if (error){
                      return conn.rollback(function(){
                        throw error;
                      });
                    }
                    conn.commit(function(err){
                      if(err){
                        return conn.rollback(function(){
                          throw err;
                        });
                      }
                      console.log('success')
                    })
                });
            });  
    })
}

exports.get_all_service = (req, res, next) => {
    const sql = "SELECT * FROM service ";
      conn.query(
        sql, function(error, results, fields) {
          if (error) throw error;
          res.json(results);
        }
      );
}

exports.get_service_by_id = (req, res, next) => {
    const sql = "SELECT * FROM service WHERE id = ? ";
      conn.query(
        sql, req.params.id, function(error, results, fields) {
          if (error) throw error;
          res.json(results);
        }
    );
}

exports.update_all_field = (req, res, next) => {
  var post = {
    name : req.body.name,
    images : req.body.images,
    description : req.body.description,
    profile_type_id: req.body.profile_type_id,
    service_provider_id : req.body.seller_id,
    account_id : req.body.account_id,
    user_id : req.body.user_id
  };
     var values = [post, req.params.id];
     const sql = "UPDATE service SET ?  WHERE id = ? ";
     var query = conn.query(
         sql, values, function(error, results, fields) {
           if (error) throw error;
           res.json(results);
         }
     );  
     console.log(query.sql);
}

exports.update_a_field = (req, res, next) => {
    var tbName = req.body.tablename;
    var tbValue = req.body.tablevalue;
    var values = [tbName, tbValue, req.params.id];
    const sql = "UPDATE service SET ?? = ?  WHERE id = ? ";
    var query = conn.query(
      sql, values, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
    console.log(query.sql);
}

exports.delete_service = (req, res, next) =>{
    const sql = "DELETE FROM service WHERE id = ? ";
    var query = conn.query(
      sql, req.params.id, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
    console.log(query.sql);
}