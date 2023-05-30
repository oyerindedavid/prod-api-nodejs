const conn = require('../database');

exports.create_search = (req, res, next) => {
  
    var post = {
        name : req.body.name,
        media_url : req.body.media_url,
        media_type : req.body.media_type,
        information : req.body.information,
        search_area : req.body.search_area,
        place_id : req.body.place_id,
        account_id : req.body.account_id,   //The id of the account creating the search
        category_id : req.body.category_id,
        profile_type_id: req.body.profile_type_id,
        visibility : req.body.visibility,
    };
      
    conn.beginTransaction(function(err){
        if(err){throw err;}
        conn.query(
          "INSERT INTO search SET ? ", post, function(error, results, fields) {
              if (error){
                return conn.rollback(function(){
                  throw error;
                });
              }
              res.json(results);
    
              var data = {
                post_id :  results.insertId,
                profile_type_id: req.body.profile_type_id,
                is_advert : req.body.is_advert,
                category_id : req.body.category_id,
                account_id : req.body.account_id,
                profile_id : req.body.account_id
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

exports.get_all_search = (req, res, next) => {
    const sql = "SELECT * FROM `search` ";
      conn.query(
        sql, function(error, results, fields) {
          if (error) throw error;
          res.json(results);
        }
      );
}

exports.get_search_by_id = (req, res, next) => {
    const sql = "SELECT * FROM `search` WHERE id = ? ";
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
        information : req.body.information,
        search_area : req.body.search_area,
        account_id : req.body.account_id,
        category_id : req.body.category_id,
        visibility : req.body.visibility,
        user_id : req.body.user_id
     };
     var values = [post, req.params.id];
     const sql = "UPDATE search SET ?  WHERE id = ? ";
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
    const sql = "UPDATE search SET ?? = ?  WHERE id = ? ";
    var query = conn.query(
      sql, values, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
    console.log(query.sql);
}

exports.delete_search = (req, res, next) =>{
    const sql = "DELETE FROM search WHERE id = ? ";
    var query = conn.query(
      sql, req.params.id, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
    console.log(query.sql);
}