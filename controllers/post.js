const connection = require('../database');
const util = require('util');

const query = util.promisify(connection.query).bind(connection);

exports.get_all_post = async(req, res, next) => {
    
    let search_list = [];
    let tbName;
    const result = await query("SELECT * FROM post ORDER BY id DESC");
    let res_length = result.length; //This will be used as the final length of result after filter
    if(res_length == 0){
        res.json([]);
    }

    for (let row of result){
        const profile_type_id = row.profile_type_id;
        const post_id = row.post_id;  //Getting the post id which is the same as primary key for sale and search
        
        try{
            //Getting the post type e.g search sale service
            const result2 = await query("SELECT * FROM profile_type WHERE id = ?", profile_type_id);

            const profile_type = result2[0].action;
            //console.log(profile_type);

            const values = [profile_type, post_id];
            const result3 = await query("SELECT * FROM ?? WHERE id = ?", values);
            //console.log(result3);

            let profileId;

            //Geting the profile infomation that created the post
            switch(profile_type){
                case 'search':
                    tbName = 'account';
                    profileId = result3[0].account_id;
                    break;
                case 'service':
                    tbName = 'service_provider';
                    profileId = result3[0].profile_id;
                    break;
                case 'sale':
                    tbName = 'seller';
                    profileId = result3[0].profile_id;
                    break;
            }

            const values2 = [tbName, profileId];
            //console.log(result3[0].profile_id);
            const profileInfo = await query("SELECT * FROM ?? WHERE id = ?", values2);
            
            //Nesting profile information to post
            result3[0]['profile_information'] = profileInfo[0]; 

            //get token info
            const tokenInfo = await query("SELECT * from push_token WHERE account_id = ?", row['account_id']);
            result3[0]['token_information'] = tokenInfo[0];

            if(result3[0].visibility === 0){
                res_length--; // Get the result length after filter
                continue;
            }
            search_list.push(result3[0]);
            if(search_list.length == res_length){
                res.json(search_list);
                //console.log(search_list); 
            }
            //console.log(result3[0].visibility);
        } catch(error){
           console.log(error)
        }
    }
   
}


exports.get_post_by_id = async(req, res, next) => {
    
    let search_list = [];
    let tbName;
    const result = await query("SELECT * FROM post WHERE post_id = ? ", req.params.id);
    let res_length = result.length; //This will be used as the final length of result after filter
    if(res_length == 0){
        res.json(search_list);
     }

    for (let row of result){
        const profile_type_id = row.profile_type_id;
        const post_id = row.post_id;
        try{
            const result2 = await query("SELECT * FROM profile_type WHERE id = ?", profile_type_id);

            const profile_type = result2[0].action;
            //console.log(profile_type);

            const values = [profile_type, post_id];
            const result3 = await query("SELECT * FROM ?? WHERE id = ?", values);
           
            // Geting the profile infomation that created the post
            switch(profile_type){
                case 'search':
                    tbName = 'account';
                    profileId = result3[0].account_id;
                    break;
                case 'service':
                    tbName = 'service_provider';
                    profileId = result3[0].profile_id;
                    break;
                case 'sale':
                    tbName = 'seller';
                    profileId = result3[0].profile_id;
                    break;
            }

            const values2 = [tbName, profileId];
            const profileInfo = await query("SELECT * FROM ?? WHERE id = ?", values2);

            //get token info
            const tokenInfo = await query("SELECT * from push_token WHERE account_id = ?", row['account_id']);
            result3[0]['token_information'] = tokenInfo[0];
            
            //Nesting profile information to post
            result3[0]['profile_information'] = profileInfo[0]; 

            if(result3[0].visibility === 0){
                res_length--; // Get the result length after filter
                continue;
            }
            search_list.push(result3[0]);
            if(search_list.length == res_length){
                res.json(search_list);
               
            }
            console.log(result3[0].visibility);
        } catch(error){
           console.log(error)
        }
    }
}

exports.get_post_by_accountId = async(req, res, next) => {
    
    let search_list = [];
    let tbName;
    const result = await query("SELECT * FROM post WHERE account_id = ? ", req.params.id);
    let res_length = result.length; //This will be used as the final length of result after filter
    if(res_length == 0){
        res.json(search_list);
     }

    for (let row of result){
        const profile_type_id = row.profile_type_id;
        const post_id = row.post_id;
        try{
            const result2 = await query("SELECT * FROM profile_type WHERE id = ?", profile_type_id);

            const profile_type = result2[0].action;
            //console.log(profile_type);

            const values = [profile_type, post_id];
            const result3 = await query("SELECT * FROM ?? WHERE id = ?", values);

            // Geting the profile infomation that created the post
            switch(profile_type){
                case 'search':
                    tbName = 'account';
                    profileId = result3[0].account_id;
                    break;
                case 'service':
                    tbName = 'service_provider';
                    profileId = result3[0].profile_id;
                    break;
                case 'sale':
                    tbName = 'seller';
                    profileId = result3[0].profile_id;
                    break;
            }

            const values2 = [tbName, profileId];
            const profileInfo = await query("SELECT * FROM ?? WHERE id = ?", values2);
            
            //Nesting profile information to post
            result3[0]['profile_information'] = profileInfo[0]; 

            //get token info
            const tokenInfo = await query("SELECT * from push_token WHERE account_id = ?", row['account_id']);
            result3[0]['token_information'] = tokenInfo[0];

            if(result3[0].visibility === 0){
                res_length--; // Get the result length after filter
                continue;
            }
            search_list.push(result3[0]);
            if(search_list.length == res_length){
                res.json(search_list);
               
            }
            
        } catch(error){
           console.log(error)
        }
    }
}

exports.get_post_by_limit = async(req, res, next) => {
    const values2 = [parseInt(req.params.limit), parseInt(req.params.offset)];
    
    let search_list = [];
    let tbName;
    const result = await query("SELECT * FROM post LIMIT ? OFFSET  ? ", values2);
    let res_length = result.length; //This will be used as the final length of result after filter

    if(res_length == 0){
      res.json(search_list);
    }
    
    for (let row of result){
        const profile_type_id = row.profile_type_id;
        const post_id = row.post_id;  //Getting the post id which is the same as primary key for sale and search
        
        try{
            const result2 = await query("SELECT * FROM profile_type WHERE id = ?", profile_type_id);

            const profile_type = result2[0].action;
            //console.log(profile_type);

            const values = [profile_type, post_id];
            const result3 = await query("SELECT * FROM ?? WHERE id = ?", values);

            // Geting the profile infomation that created the post
            switch(profile_type){
                case 'search':
                    tbName = 'account';
                    profileId = result3[0].account_id;

                    break;
                case 'service':
                    tbName = 'service_provider';
                    profileId = result3[0].profile_id;
                    break;
                case 'sale':
                    tbName = 'seller';
                    profileId = result3[0].profile_id;
                    break;
            }

            const values2 = [tbName, profileId];
            const profileInfo = await query("SELECT * FROM ?? WHERE id = ?", values2);
            
            //Nesting profile information to post
            result3[0]['profile_information'] = profileInfo[0]; 

            //get token info
            const tokenInfo = await query("SELECT * from push_token WHERE account_id = ?", row['account_id']);
            result3[0]['token_information'] = tokenInfo[0];

            if(result3[0].visibility === 0){
                res_length--; // Get the result length after filter
                continue;
            }
            search_list.push(result3[0]);
            if(search_list.length == res_length){
                res.json(search_list);
                
            }
        } catch(error){
           console.log(error)
        }
    }
}

exports.get_post_by_category_limit = async(req, res, next) => {
    const values2 = [parseInt(req.params.cid), parseInt(req.params.limit), parseInt(req.params.offset)];
    let search_list = [];
    let tbName;
    try{
        const result = await query("SELECT * FROM post WHERE category_id = ? LIMIT ? OFFSET  ? ", values2);
        let res_length = result.length; //This will be used as the final length of result after filter
        if(res_length == 0){
           res.json(search_list);
        }
    
        for (let row of result){
            const profile_type_id = row.profile_type_id;
            const post_id = row.post_id;  //Getting the post id which is the same as primary key for sale and search
            
            try{
                const result2 = await query("SELECT * FROM profile_type WHERE id = ?", profile_type_id);
    
                const profile_type = result2[0].action;
                //console.log(profile_type);
    
                const values = [profile_type, post_id];
                const result3 = await query("SELECT * FROM ?? WHERE id = ?", values);
    
                // Geting the profile infomation that created the post
                switch(profile_type){
                    case 'search':
                        tbName = 'account';
                        profileId = result3[0].account_id;
                        break;
                    case 'service':
                        tbName = 'service_provider';
                        profileId = result3[0].profile_id;
                        break;
                    case 'sale':
                        tbName = 'seller';
                        profileId = result3[0].profile_id;
                        break;
                }
                
                const values2 = [tbName, profileId];
                const profileInfo = await query("SELECT * FROM ?? WHERE id = ?", values2);
                
                //Nesting profile information to post
                result3[0]['profile_information'] = profileInfo[0]; 

                //get token info
                const tokenInfo = await query("SELECT * from push_token WHERE account_id = ?", row['account_id']);
                result3[0]['token_information'] = tokenInfo[0];
    
                if(result3[0].visibility === 0){
                    res_length--; // Get the result length after filter
                    continue;
                }
                
                search_list.push(result3[0]);
                if(search_list.length == res_length){
                    res.json(search_list);
                   
                }
                
            } catch(error){
                console.log(error)
            }
        }
    }catch(error){
        console.log(error);
    }
    
}

