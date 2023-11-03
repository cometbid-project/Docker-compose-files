db.auth('admin', 'admin');

db = db.getSiblingDB("user_db");

db.createUser({
       user: 'user', 
       pwd: 'user_password', 
       roles:[
           {
           role:'dbOwner', 
           db: 'user_db'
          }
     ]
});