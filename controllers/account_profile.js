const connection = require('../database');

const util = require('util');
const { json } = require('body-parser');

const query = util.promisify(connection.query).bind(connection);

exports.get_all_account_profile_profile = (req, res, next) => {
    const sql = "SELECT * FROM account_profile ORDER BY id DESC ";
    connection.query(
      sql, function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    ); 
}

exports.get_account_profile_by_id = async(req, res, next) => {
  let sql;
  //Get a particular account profile
  const result = await query("SELECT * FROM account_profile WHERE account_id = ? ", req.params.id);
  
  //If above query returns a result,
  
  if(result.length != 0 ){
    for(let row of result){
      const result2 = await query("SELECT * FROM profile_type WHERE id = ? ", row.profile_type_id);
      row.profile_type = result2[0];
    }
    console.log(result);
    res.json(result);
  }else{
      res.json([]);
  }

}
