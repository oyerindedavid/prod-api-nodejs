const conn = require('../database');

exports.create_sale = (req, res, next) => {
    var post = {
      name : req.body.name,
      media_url: req.body.media_url,
      media_type: req.body.media_type,
      tag : req.body.tag,
      custom_tag : req.body.custom_tag,
      category_id : req.body.category_id,
      profile_type_id : req.body.profile_type_id,
      price_format : req.body.price_format,
      fixed_price : req.body.fixed_price,
      old_price : req.body.old_price,
      new_price : req.body.new_price,
      unit_price : req.body.unit_price,
      unit : req.body.unit,
      information : req.body.information,
      search_area : req.body.search_area,
      place_id : req.body.place_id,
      visibility : req.body.visibility,
      profile_id : req.body.seller_id,
      account_id : req.body.account_id,
   };
      
    conn.beginTransaction(function(err){
        if(err){throw err;}
        conn.query(
          "INSERT INTO sale SET ? ", post, function(error, results, fields) {
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
                profile_id : req.body.seller_id
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

exports.get_all_sale = (req, res, next) => {
    const sql = "SELECT * FROM sale ";
      conn.query(
        sql, function(error, results, fields) {
          if (error) throw error;
          res.json(results);
        }
      );
}

exports.get_sale_by_id = (req, res, next) => {
    const sql = "SELECT * FROM sale WHERE id = ? ";
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
    images: req.body.images,
    tag : req.body.tag,
    custom_tag : req.body.custom_tag,
    category_id : req.body.category_id,
    profile_type_id : req.body.profile_type_id,
    price_format : req.body.price_format,
    fixed_price : req.body.fixed_price,
    old_price : req.body.old_price,
    new_price : req.body.new_price,
    unit_price : req.body.unit_price,
    unit : req.body.unit,
    information : req.body.information,
    search_area : req.body.search_area,
    visibility : req.body.visibility,
    profile_id : req.body.seller_id,
    account_id : req.body.account_id,
    user_id : req.body.user_id
 };
     var values = [post, req.params.id];
     const sql = "UPDATE sale SET ?  WHERE id = ? ";
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
    const sql = "UPDATE sale SET ?? = ?  WHERE id = ? ";
    var query = conn.query(
      sql, values, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
    console.log(query.sql);
}

exports.delete_sale = (req, res, next) => {
    const sql = "DELETE FROM sale WHERE id = ? ";
    var query = conn.query(
      sql, req.params.id, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
    console.log(query.sql);
}