const connection = require('../database');
const util = require('util');

const query = util.promisify(connection.query).bind(connection);

exports.create_response = async(req, res, next) => {

    var post = {
        post_id : req.body.post_id,
        account_id : req.body.account_id,
        images: req.body.images,
        message: req.body.response_message,
        account_id : req.body.user_id
    };

    try{
      const result = await query("INSERT INTO response SET ?", post);
      
      res.json(result);
  
    } catch(err){
      console.log(err);
    }
} 

exports.get_all_response = async(req, res, next) => {
  const responseList = [];
  try{
    const result = await query("SELECT * FROM response ORDER BY id DESC");

    for(let row of result){
      const account_id = row.account_id;

      const result2 = await query("SELECT * FROM account WHERE id = ? ", account_id);

      row['profile_information'] = result2[0];

      responseList.push(row);
    }
    
    res.json(responseList);  

  } catch(err){
    console.log(err);
  }
}

exports.get_response_by_id = async(req, res, next) => {
  const responseList = [];
  try{
    const result = await query("SELECT * FROM response WHERE user_id = ? ORDER BY id DESC ", req.params.id);

    for(let row of result){
      const account_id = row.account_id;

      const result2 = await query("SELECT * FROM account WHERE id = ? ", account_id);

      row['profile_information'] = result2[0];

      responseList.push(row);
    }
    
    res.json(responseList); 
  } catch(err){
      console.log(err)
  }
}

exports.get_response_by_postid = async(req, res, next) => {
  const responseList = [];
  try{
    const result = await query(`SELECT * FROM response WHERE post_id = ? ORDER BY id DESC `, req.params.id);

    for(let row of result){
      const account_id = row.account_id;

      const result2 = await query("SELECT * FROM account WHERE id = ? ", account_id);

      row['profile_information'] = result2[0];

      responseList.push(row);
    }
    
    res.json(responseList); 
  } catch(err){
      console.log(err)
  }
}

exports.update_response_field = (req, res, next) => {
    var tbName = req.body.tablename;
    var tbValue = req.body.tablevalue;
    var values = [tbName, tbValue, req.params.id];
    const sql = "UPDATE response SET ?? = ?  WHERE id = ? ";
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
        account_id : req.body.account_id,
        images: req.body.images,
        response_message: req.body.response_message,
        user_id : req.body.user_id
    };
    var values = [post, req.params.id];
    const sql = "UPDATE response SET ?  WHERE id = ? ";
    var query = connection.query(
        sql, values, function(error, results, fields) {
          if (error) throw error;
          res.json(results);
        }
    );  
    console.log(query.sql);
}

exports.delete_response = (req, res, next) => {
    const sql = "DELETE FROM response WHERE id = ? ";
    var query = connection.query(
      sql, req.params.id, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
    console.log(query.sql);
}