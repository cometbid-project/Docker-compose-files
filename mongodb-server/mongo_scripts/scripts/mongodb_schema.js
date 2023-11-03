/*
 Docker command to create MongoDb image
$ docker run -d --name mongo -p 27017:27017 mongo

Check if it was successful
$ docker images

Start the MongoDb Docker image
$ docker run mongo:latest
*/
db.auth(${MONGO_INITDB_ROOT_USERNAME}, ${MONGO_INITDB_ROOT_PASSWORD});

db = db.getSiblingDB("user_db");

db.createUser({
       user: ${DB1_USERNAME}, 
       pwd: ${DB1_PASSWORD}, 
       roles:[
           {
            role:'dbOwner', 
            db: ${MONGO_INITDB_DATABASE}
          }
     ]
});
// db.article.drop();

/*
ACTIVITY_LOG
string USERNAME (required),
string ACTIVITY_STMT(required),
*/
//
db.createCollection( "ACTIVITY_LOG", {
   validator: { $jsonSchema: {
      bsonType: "object",
      required: [ "USERNAME", "ACTIVITY_STMT" ],
      properties: {
         USERNAME: {
            bsonType: "string",
            description: "must be a string and is required"
         },
         ACTIVITY_STMT: {
            bsonType : "string",
            description: "must be a string and is required"
         }
      }
   } }
} );

db.ACTIVITY_LOG.createIndex( { "ACTIVITY_STMT": 1 }, { name: "activity_stmt_indx_1" } );
db.ACTIVITY_LOG.createIndex( { "USERNAME": 1 }, { name: "activity_username_indx_1" } );

/*
ARCHIVED_ACTIVITY_LOG
string USERNAME (required),
string ACTIVITY_STMT(required),
*/
//
db.createCollection( "ARCHIVED_ACTIVITY_LOG", {
   validator: { $jsonSchema: {
      bsonType: "object",
      required: [ "USERNAME", "ACTIVITY_STMT" ],
      properties: {
         USERNAME: {
            bsonType: "string",
            description: "must be a string and is required"
         },
         ACTIVITY_STMT: {
            bsonType : "string",
            description: "must be a string and is required"
         }
      }
   } }
} );

db.ARCHIVED_ACTIVITY_LOG.createIndex( { "ACTIVITY_STMT": 1 }, { name: "arch_activity_stmt_indx_1" } );
db.ARCHIVED_ACTIVITY_LOG.createIndex( { "USERNAME": 1 }, { name: "arch_activity_username_indx_1" } );

/*
APP_USERS
string USERNAME (required),
string FIRST_NAME (required),
string LAST_NAME (required),
string GENDER (required),
string STAFF_NO (required),
*/

//
db.createCollection( "APP_USERS", {
   validator: { $jsonSchema: {
      bsonType: "object",
      required: [ "USERNAME", "FIRST_NAME", "LAST_NAME", "GENDER", "STAFF_NO" ],
      properties: {
         USERNAME: {
            bsonType: "string",
            description: "must be a string and is required"
         },
         FIRST_NAME: {
            bsonType : "string",
            description: "must be a string and is required"
         },
         LAST_NAME: {
            bsonType : "string",
            description: "must be a string and is required"
         },
         GENDER: {
            bsonType : "string",
            description: "must be a string and is required"
         },
         STAFF_NO: {
            bsonType : "string",
            description: "must be a string and is required"
         }
      }
   } }
} );

db.APP_USERS.createIndex( { "STAFF_NO": 1 }, { name: "app_user_staffNo_indx_1" } );
db.APP_USERS.createIndex( { "USERNAME": 1 }, { name: "app_user_username_indx_1" } );
db.APP_USERS.createIndex( { "BRANCH.BRANCH_CODE": 1, "BRANCH.RC_NO": 1 }, { name: "user_merchant_index_1" } );
db.APP_USERS.createIndex( { "BRANCH.BRANCH_CODE": 1, "BRANCH.RC_NO": 1, "STAFF_NO": 1 }, { name: "user_merchant_staffNoIndx_1" }, { unique: true } );
db.APP_USERS.createIndex( { "BRANCH.BRANCH_CODE": 1, "BRANCH.RC_NO": 1, "EMAIL": 1 }, { name: "user_merchant_emailIndx_1" }, { unique: true } );

/*
TRANZ_LOG
string TRANS_NO (required),
string TRANZ_DATE (required),
string BAL_BEFORE (required),
string BAL_AFTER (required),
string TRANZ_TYPE (required),
string TRANZ_STATUS (required),
string DEST_ACCTNO (required),
string SRC_ACCTNO (required),
*/

//
db.createCollection( "TRANZ_LOG", {
   validator: { $jsonSchema: {
      bsonType: "object",
      required: [ "TRANS_NO", "TRANZ_TYPE", "TRANZ_STATUS", "DEST_ACCTNO", "SRC_ACCTNO" ],
      properties: {
         TRANS_NO: {
            bsonType: "string",
            description: "must be a string and is required"
         },
         TRANZ_TYPE: {
            bsonType : "string",
            description: "must be a string and is required"
         },
         TRANZ_STATUS: {
            bsonType : "string",
            description: "must be a string and is required"
         },
         DEST_ACCTNO: {
            bsonType : "string",
            description: "must be a string and is required"
         },
         SRC_ACCTNO: {
            bsonType : "string",
            description: "must be a string and is required"
         }
      }
   } }
} );

db.TRANZ_LOG.createIndex( { "TRANS_NO": 1 }, { name: "tranz_transactionNo_indx_1" } );
db.TRANZ_LOG.createIndex( { "USER.USERNAME": 1 }, { name: "tranz_username_indx_1" } );

/*
ARCHIVED_TRANZ_LOG
string TRANS_NO (required),
string TRANZ_DATE (required),
string BAL_BEFORE (required),
string BAL_AFTER (required),
string TRANZ_TYPE (required),
string TRANZ_STATUS (required),
string DEST_ACCTNO (required),
string SRC_ACCTNO (required),
*/

//
db.createCollection( "ARCHIVED_TRANZ_LOG", {
   validator: { $jsonSchema: {
      bsonType: "object",
      required: [ "TRANS_NO", "TRANZ_TYPE", "TRANZ_STATUS", "DEST_ACCTNO", "SRC_ACCTNO" ],
      properties: {
         TRANS_NO: {
            bsonType: "string",
            description: "must be a string and is required"
         },
         TRANZ_TYPE: {
            bsonType : "string",
            description: "must be a string and is required"
         },
         TRANZ_STATUS: {
            bsonType : "string",
            description: "must be a string and is required"
         },
         DEST_ACCTNO: {
            bsonType : "string",
            description: "must be a string and is required"
         },
         SRC_ACCTNO: {
            bsonType : "string",
            description: "must be a string and is required"
         }
      }
   } }
} );

db.ARCHIVED_TRANZ_LOG.createIndex( { "TRANS_NO": 1 }, { name: "arch_tranz_transactionNo_indx_1" } );
db.ARCHIVED_TRANZ_LOG.createIndex( { "USER.USERNAME": 1 }, { name: "arch_tranz_username_indx_1" } );

//
db.createCollection( "acl_sid", {
   capped : true, 
   size : 9232768,
   validator: { $jsonSchema: {
      bsonType: "object",
      required: [ "_id", "principal", "sid" ],
      properties: {
         principal: {
            bsonType: "bool",
            description: "must be a boolean and is required"
         },
         sid: {
            bsonType : "string",
            pattern : "^ROLE_",
            description: "must be a string and match the regular expression pattern"
         }
      }
   } }
} );

//
db.getCollection("acl_sid").insert( 
   [
     { _id: 1, principal: false, sid: "ROLE_SECRETARY" },
     { _id: 2, principal: false, sid: "ROLE_MANAGER" },
     { _id: 3, principal: false, sid: "ROLE_APP_MANAGER" },
     { _id: 4, principal: false, sid: "ROLE_ADMIN" },
     { _id: 5, principal: false, sid: "ROLE_STAFF" },
     { _id: 6, principal: false, sid: "ROLE_DEVELOPER" }
   ]
 );

// Select All 
db.getCollection("acl_sid").find({});


// 
db.createCollection( "acl_class", {
   capped : true, 
   size : 9232768,
   validator: { $jsonSchema: {
      bsonType: "object",
      required: [ "_id", "class" ],
      properties: {
         class: {
            bsonType: "string",
            description: "must be a string and is required"
         }
      }
   } }
} );

db.getCollection("acl_class").insert( 
   [
     { _id: 1, class: "ActivityLog" },
     { _id: 2, class: "Address" },
     { _id: 3, class: "AppUser" },
     { _id: 4, class: "NextOfKin" },
     { _id: 5, class: "PhoneNo" },
     { _id: 6, class: "TransactionLog" },
     { _id: 7, class: "UserImage" },
     { _id: 8, class: "ArchivedTransactionLog" },
     { _id: 9, class: "ArchivedActivityLog" }
   ]
 );

// Select All 
db.getCollection("acl_class").find({});

// 
db.createCollection( "acl_object_identity", {
   capped : true, 
   size : 923276843,
   validator: { $jsonSchema: {
      bsonType: "object",
      required: [ "_id", "object_id_class", "object_id_identity", "owner_sid", "entries_inheriting" ],
      properties: {
         object_id_class: {
            bsonType: "int",
            description: "must be a number and is required"
         },
         object_id_identity: {
            bsonType: "int",
            description: "must be a number and is required"
         },
         owner_sid: {
            bsonType: "int",
            description: "must be a number and is required"
         },
         entries_inheriting: {
            bsonType: "bool",
            description: "must be a boolean and is required"
         },
      }
   } }
} );

db.getCollection("acl_object_identity")
.insert( 
   [
     { _id: 1, object_id_class: NumberInt(1), object_id_identity: NumberInt(0), parent_object: null, owner_sid: NumberInt(4), entries_inheriting: false },
     { _id: 2, object_id_class: NumberInt(2), object_id_identity: NumberInt(0), parent_object: null, owner_sid: NumberInt(4), entries_inheriting: false },
     { _id: 3, object_id_class: NumberInt(3), object_id_identity: NumberInt(0), parent_object: null, owner_sid: NumberInt(4), entries_inheriting: false },
     { _id: 4, object_id_class: NumberInt(4), object_id_identity: NumberInt(0), parent_object: null, owner_sid: NumberInt(4), entries_inheriting: false },
     { _id: 5, object_id_class: NumberInt(5), object_id_identity: NumberInt(0), parent_object: null, owner_sid: NumberInt(4), entries_inheriting: false },
     { _id: 6, object_id_class: NumberInt(6), object_id_identity: NumberInt(0), parent_object: null, owner_sid: NumberInt(4), entries_inheriting: false },
     { _id: 7, object_id_class: NumberInt(7), object_id_identity: NumberInt(0), parent_object: null, owner_sid: NumberInt(4), entries_inheriting: false },
     { _id: 8, object_id_class: NumberInt(8), object_id_identity: NumberInt(0), parent_object: null, owner_sid: NumberInt(4), entries_inheriting: false },
     { _id: 9, object_id_class: NumberInt(9), object_id_identity: NumberInt(0), parent_object: null, owner_sid: NumberInt(4), entries_inheriting: false }
   ]
 );

// Select All 
db.acl_object_identity.find({});

// 
db.createCollection( "acl_entry", {
   capped : true, 
   size : 9232768,
   validator: { $jsonSchema: {
      bsonType: "object",
      required: [ "_id", "acl_object_identity", "ace_order", "sid", "class_id", "mask", "granting", "audit_success", "audit_failure" ],
      properties: {
         object_id_class: {
            bsonType: "int",
            description: "must be a number and is required"
         },
         object_id_identity: {
            bsonType: "int",
            description: "must be a number and is required"
         },
         sid: {
            bsonType: "int",
            description: "must be a number and is required"
         },
         mask: {
            bsonType: "string",
            description: "must be a string and is required"
         },
         granting: {
            bsonType: "bool",
            description: "must be a boolean and is required"
         },
      }
   } }
} );

//
//-- For SECRETARY type PERMISSIONS
db.getCollection("acl_entry").insert( 
   [
     { _id: 1, acl_object_identity: NumberInt(1), ace_order: NumberInt(1), sid: NumberInt(1), mask: 'READ', class_id: NumberInt(1), granting: false, audit_success: true, audit_failure: true },
     { _id: 2, acl_object_identity: NumberInt(1), ace_order: NumberInt(2), sid: NumberInt(1), mask: 'WRITE', class_id: NumberInt(1), granting: false, audit_success: true, audit_failure: true },
     { _id: 3, acl_object_identity: NumberInt(1), ace_order: NumberInt(3), sid: NumberInt(1), mask: 'CREATE', class_id: NumberInt(1), granting: false, audit_success: true, audit_failure: true },
     { _id: 4, acl_object_identity: NumberInt(1), ace_order: NumberInt(4), sid: NumberInt(1), mask: 'DELETE', class_id: NumberInt(1), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 5, acl_object_identity: NumberInt(2), ace_order: NumberInt(5), sid: NumberInt(1), mask: 'READ', class_id: NumberInt(2), granting: false, audit_success: true, audit_failure: true },
     { _id: 6, acl_object_identity: NumberInt(2), ace_order: NumberInt(6), sid: NumberInt(1), mask: 'WRITE', class_id: NumberInt(2), granting: false, audit_success: true, audit_failure: true },
     { _id: 7, acl_object_identity: NumberInt(2), ace_order: NumberInt(7), sid: NumberInt(1), mask: 'CREATE', class_id: NumberInt(2), granting: false, audit_success: true, audit_failure: true },
     { _id: 8, acl_object_identity: NumberInt(2), ace_order: NumberInt(8), sid: NumberInt(1), mask: 'DELETE', class_id: NumberInt(2), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 9, acl_object_identity: NumberInt(3), ace_order: NumberInt(9), sid: NumberInt(1), mask: 'READ', class_id: NumberInt(3), granting: false, audit_success: true, audit_failure: true },
     { _id: 10, acl_object_identity: NumberInt(3), ace_order: NumberInt(10), sid: NumberInt(1), mask: 'WRITE', class_id: NumberInt(3), granting: false, audit_success: true, audit_failure: true },
     { _id: 11, acl_object_identity: NumberInt(3), ace_order: NumberInt(11), sid: NumberInt(1), mask: 'CREATE', class_id: NumberInt(3), granting: false, audit_success: true, audit_failure: true },
     { _id: 12, acl_object_identity: NumberInt(3), ace_order: NumberInt(12), sid: NumberInt(1), mask: 'DELETE', class_id: NumberInt(3), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 13, acl_object_identity: NumberInt(4), ace_order: NumberInt(13), sid: NumberInt(1), mask: 'READ', class_id: NumberInt(4), granting: false, audit_success: true, audit_failure: true },
     { _id: 14, acl_object_identity: NumberInt(4), ace_order: NumberInt(14), sid: NumberInt(1), mask: 'WRITE', class_id: NumberInt(4), granting: false, audit_success: true, audit_failure: true },
     { _id: 15, acl_object_identity: NumberInt(4), ace_order: NumberInt(15), sid: NumberInt(1), mask: 'CREATE', class_id: NumberInt(4), granting: false, audit_success: true, audit_failure: true },
     { _id: 16, acl_object_identity: NumberInt(4), ace_order: NumberInt(16), sid: NumberInt(1), mask: 'DELETE', class_id: NumberInt(4), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 17, acl_object_identity: NumberInt(5), ace_order: NumberInt(17), sid: NumberInt(1), mask: 'READ', class_id: NumberInt(5), granting: false, audit_success: true, audit_failure: true },
     { _id: 18, acl_object_identity: NumberInt(5), ace_order: NumberInt(18), sid: NumberInt(1), mask: 'WRITE', class_id: NumberInt(5), granting: false, audit_success: true, audit_failure: true },
     { _id: 19, acl_object_identity: NumberInt(5), ace_order: NumberInt(19), sid: NumberInt(1), mask: 'CREATE', class_id: NumberInt(5), granting: false, audit_success: true, audit_failure: true },
     { _id: 20, acl_object_identity: NumberInt(5), ace_order: NumberInt(20), sid: NumberInt(1), mask: 'DELETE', class_id: NumberInt(5), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 21, acl_object_identity: NumberInt(6), ace_order: NumberInt(21), sid: NumberInt(1), mask: 'READ', class_id: NumberInt(6), granting: false, audit_success: true, audit_failure: true },
     { _id: 22, acl_object_identity: NumberInt(6), ace_order: NumberInt(22), sid: NumberInt(1), mask: 'WRITE', class_id: NumberInt(6), granting: false, audit_success: true, audit_failure: true },
     { _id: 23, acl_object_identity: NumberInt(6), ace_order: NumberInt(23), sid: NumberInt(1), mask: 'CREATE', class_id: NumberInt(6), granting: false, audit_success: true, audit_failure: true },
     { _id: 24, acl_object_identity: NumberInt(6), ace_order: NumberInt(24), sid: NumberInt(1), mask: 'DELETE', class_id: NumberInt(6), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 25, acl_object_identity: NumberInt(7), ace_order: NumberInt(25), sid: NumberInt(1), mask: 'READ', class_id: NumberInt(7), granting: false, audit_success: true, audit_failure: true },
     { _id: 26, acl_object_identity: NumberInt(7), ace_order: NumberInt(26), sid: NumberInt(1), mask: 'WRITE', class_id: NumberInt(7), granting: false, audit_success: true, audit_failure: true },
     { _id: 27, acl_object_identity: NumberInt(7), ace_order: NumberInt(27), sid: NumberInt(1), mask: 'CREATE', class_id: NumberInt(7), granting: false, audit_success: true, audit_failure: true },
     { _id: 28, acl_object_identity: NumberInt(7), ace_order: NumberInt(28), sid: NumberInt(1), mask: 'DELETE', class_id: NumberInt(7), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 29, acl_object_identity: NumberInt(8), ace_order: NumberInt(29), sid: NumberInt(1), mask: 'READ', class_id: NumberInt(8), granting: false, audit_success: true, audit_failure: true },
     { _id: 30, acl_object_identity: NumberInt(8), ace_order: NumberInt(30), sid: NumberInt(1), mask: 'WRITE', class_id: NumberInt(8), granting: false, audit_success: true, audit_failure: true },
     { _id: 31, acl_object_identity: NumberInt(8), ace_order: NumberInt(31), sid: NumberInt(1), mask: 'CREATE', class_id: NumberInt(8), granting: false, audit_success: true, audit_failure: true },
     { _id: 32, acl_object_identity: NumberInt(8), ace_order: NumberInt(32), sid: NumberInt(1), mask: 'DELETE', class_id: NumberInt(8), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 33, acl_object_identity: NumberInt(9), ace_order: NumberInt(33), sid: NumberInt(1), mask: 'READ', class_id: NumberInt(9), granting: false, audit_success: true, audit_failure: true },
     { _id: 34, acl_object_identity: NumberInt(9), ace_order: NumberInt(34), sid: NumberInt(1), mask: 'WRITE', class_id: NumberInt(9), granting: false, audit_success: true, audit_failure: true },
     { _id: 35, acl_object_identity: NumberInt(9), ace_order: NumberInt(35), sid: NumberInt(1), mask: 'CREATE', class_id: NumberInt(9), granting: false, audit_success: true, audit_failure: true },
     { _id: 36, acl_object_identity: NumberInt(9), ace_order: NumberInt(36), sid: NumberInt(1), mask: 'DELETE', class_id: NumberInt(9), granting: false, audit_success: true, audit_failure: true }
   ]
 );

//-- For MANAGER type PERMISSIONS
db.getCollection("acl_entry").insert( 
   [
     { _id: 37, acl_object_identity: NumberInt(1), ace_order: NumberInt(37), sid: NumberInt(2), mask: 'READ', class_id: NumberInt(1), granting: false, audit_success: true, audit_failure: true },
     { _id: 38, acl_object_identity: NumberInt(1), ace_order: NumberInt(38), sid: NumberInt(2), mask: 'WRITE', class_id: NumberInt(1), granting: false, audit_success: true, audit_failure: true },
     { _id: 39, acl_object_identity: NumberInt(1), ace_order: NumberInt(39), sid: NumberInt(2), mask: 'CREATE', class_id: NumberInt(1), granting: false, audit_success: true, audit_failure: true },
     { _id: 40, acl_object_identity: NumberInt(1), ace_order: NumberInt(40), sid: NumberInt(2), mask: 'DELETE', class_id: NumberInt(1), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 41, acl_object_identity: NumberInt(2), ace_order: NumberInt(41), sid: NumberInt(2), mask: 'READ', class_id: NumberInt(2), granting: false, audit_success: true, audit_failure: true },
     { _id: 42, acl_object_identity: NumberInt(2), ace_order: NumberInt(42), sid: NumberInt(2), mask: 'WRITE', class_id: NumberInt(2), granting: false, audit_success: true, audit_failure: true },
     { _id: 43, acl_object_identity: NumberInt(2), ace_order: NumberInt(43), sid: NumberInt(2), mask: 'CREATE', class_id: NumberInt(2), granting: false, audit_success: true, audit_failure: true },
     { _id: 44, acl_object_identity: NumberInt(2), ace_order: NumberInt(44), sid: NumberInt(2), mask: 'DELETE', class_id: NumberInt(2), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 45, acl_object_identity: NumberInt(3), ace_order: NumberInt(45), sid: NumberInt(2), mask: 'READ', class_id: NumberInt(3), granting: false, audit_success: true, audit_failure: true },
     { _id: 46, acl_object_identity: NumberInt(3), ace_order: NumberInt(46), sid: NumberInt(2), mask: 'WRITE', class_id: NumberInt(3), granting: false, audit_success: true, audit_failure: true },
     { _id: 47, acl_object_identity: NumberInt(3), ace_order: NumberInt(47), sid: NumberInt(2), mask: 'CREATE', class_id: NumberInt(3), granting: false, audit_success: true, audit_failure: true },
     { _id: 48, acl_object_identity: NumberInt(3), ace_order: NumberInt(48), sid: NumberInt(2), mask: 'DELETE', class_id: NumberInt(3), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 49, acl_object_identity: NumberInt(4), ace_order: NumberInt(49), sid: NumberInt(2), mask: 'READ', class_id: NumberInt(4), granting: false, audit_success: true, audit_failure: true },
     { _id: 50, acl_object_identity: NumberInt(4), ace_order: NumberInt(50), sid: NumberInt(2), mask: 'WRITE', class_id: NumberInt(4), granting: false, audit_success: true, audit_failure: true },
     { _id: 51, acl_object_identity: NumberInt(4), ace_order: NumberInt(51), sid: NumberInt(2), mask: 'CREATE', class_id: NumberInt(4), granting: false, audit_success: true, audit_failure: true },
     { _id: 52, acl_object_identity: NumberInt(4), ace_order: NumberInt(52), sid: NumberInt(2), mask: 'DELETE', class_id: NumberInt(4), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 53, acl_object_identity: NumberInt(5), ace_order: NumberInt(53), sid: NumberInt(2), mask: 'READ', class_id: NumberInt(5), granting: false, audit_success: true, audit_failure: true },
     { _id: 54, acl_object_identity: NumberInt(5), ace_order: NumberInt(54), sid: NumberInt(2), mask: 'WRITE', class_id: NumberInt(5), granting: false, audit_success: true, audit_failure: true },
     { _id: 55, acl_object_identity: NumberInt(5), ace_order: NumberInt(55), sid: NumberInt(2), mask: 'CREATE', class_id: NumberInt(5), granting: false, audit_success: true, audit_failure: true },
     { _id: 56, acl_object_identity: NumberInt(5), ace_order: NumberInt(56), sid: NumberInt(2), mask: 'DELETE', class_id: NumberInt(5), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 57, acl_object_identity: NumberInt(6), ace_order: NumberInt(57), sid: NumberInt(2), mask: 'READ', class_id: NumberInt(6), granting: false, audit_success: true, audit_failure: true },
     { _id: 58, acl_object_identity: NumberInt(6), ace_order: NumberInt(58), sid: NumberInt(2), mask: 'WRITE', class_id: NumberInt(6), granting: false, audit_success: true, audit_failure: true },
     { _id: 59, acl_object_identity: NumberInt(6), ace_order: NumberInt(59), sid: NumberInt(2), mask: 'CREATE', class_id: NumberInt(6), granting: false, audit_success: true, audit_failure: true },
     { _id: 60, acl_object_identity: NumberInt(6), ace_order: NumberInt(60), sid: NumberInt(2), mask: 'DELETE', class_id: NumberInt(6), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 61, acl_object_identity: NumberInt(7), ace_order: NumberInt(61), sid: NumberInt(2), mask: 'READ', class_id: NumberInt(7), granting: false, audit_success: true, audit_failure: true },
     { _id: 62, acl_object_identity: NumberInt(7), ace_order: NumberInt(62), sid: NumberInt(2), mask: 'WRITE', class_id: NumberInt(7), granting: false, audit_success: true, audit_failure: true },
     { _id: 63, acl_object_identity: NumberInt(7), ace_order: NumberInt(63), sid: NumberInt(2), mask: 'CREATE', class_id: NumberInt(7), granting: false, audit_success: true, audit_failure: true },
     { _id: 64, acl_object_identity: NumberInt(7), ace_order: NumberInt(64), sid: NumberInt(2), mask: 'DELETE', class_id: NumberInt(7), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 65, acl_object_identity: NumberInt(8), ace_order: NumberInt(65), sid: NumberInt(2), mask: 'READ', class_id: NumberInt(8), granting: false, audit_success: true, audit_failure: true },
     { _id: 66, acl_object_identity: NumberInt(8), ace_order: NumberInt(66), sid: NumberInt(2), mask: 'WRITE', class_id: NumberInt(8), granting: false, audit_success: true, audit_failure: true },
     { _id: 67, acl_object_identity: NumberInt(8), ace_order: NumberInt(67), sid: NumberInt(2), mask: 'CREATE', class_id: NumberInt(8), granting: false, audit_success: true, audit_failure: true },
     { _id: 68, acl_object_identity: NumberInt(8), ace_order: NumberInt(68), sid: NumberInt(2), mask: 'DELETE', class_id: NumberInt(8), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 69, acl_object_identity: NumberInt(9), ace_order: NumberInt(69), sid: NumberInt(2), mask: 'READ', class_id: NumberInt(9), granting: false, audit_success: true, audit_failure: true },
     { _id: 70, acl_object_identity: NumberInt(9), ace_order: NumberInt(70), sid: NumberInt(2), mask: 'WRITE', class_id: NumberInt(9), granting: false, audit_success: true, audit_failure: true },
     { _id: 71, acl_object_identity: NumberInt(9), ace_order: NumberInt(71), sid: NumberInt(2), mask: 'CREATE', class_id: NumberInt(9), granting: false, audit_success: true, audit_failure: true },
     { _id: 72, acl_object_identity: NumberInt(9), ace_order: NumberInt(72), sid: NumberInt(2), mask: 'DELETE', class_id: NumberInt(9), granting: false, audit_success: true, audit_failure: true }
   ]
 );


 //-- For APP_MANAGER type PERMISSIONS
db.getCollection("acl_entry").insert( 
   [
     { _id: 73, acl_object_identity: NumberInt(1), ace_order: NumberInt(73), sid: NumberInt(3), mask: 'READ', class_id: NumberInt(1), granting: false, audit_success: true, audit_failure: true },
     { _id: 74, acl_object_identity: NumberInt(1), ace_order: NumberInt(74), sid: NumberInt(3), mask: 'WRITE', class_id: NumberInt(1), granting: false, audit_success: true, audit_failure: true },
     { _id: 75, acl_object_identity: NumberInt(1), ace_order: NumberInt(75), sid: NumberInt(3), mask: 'CREATE', class_id: NumberInt(1), granting: false, audit_success: true, audit_failure: true },
     { _id: 76, acl_object_identity: NumberInt(1), ace_order: NumberInt(76), sid: NumberInt(3), mask: 'DELETE', class_id: NumberInt(1), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 77, acl_object_identity: NumberInt(2), ace_order: NumberInt(77), sid: NumberInt(3), mask: 'READ', class_id: NumberInt(2), granting: false, audit_success: true, audit_failure: true },
     { _id: 78, acl_object_identity: NumberInt(2), ace_order: NumberInt(78), sid: NumberInt(3), mask: 'WRITE', class_id: NumberInt(2), granting: false, audit_success: true, audit_failure: true },
     { _id: 79, acl_object_identity: NumberInt(2), ace_order: NumberInt(79), sid: NumberInt(3), mask: 'CREATE', class_id: NumberInt(2), granting: false, audit_success: true, audit_failure: true },
     { _id: 80, acl_object_identity: NumberInt(2), ace_order: NumberInt(80), sid: NumberInt(3), mask: 'DELETE', class_id: NumberInt(2), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 81, acl_object_identity: NumberInt(3), ace_order: NumberInt(81), sid: NumberInt(3), mask: 'READ', class_id: NumberInt(3), granting: false, audit_success: true, audit_failure: true },
     { _id: 82, acl_object_identity: NumberInt(3), ace_order: NumberInt(82), sid: NumberInt(3), mask: 'WRITE', class_id: NumberInt(3), granting: false, audit_success: true, audit_failure: true },
     { _id: 83, acl_object_identity: NumberInt(3), ace_order: NumberInt(83), sid: NumberInt(3), mask: 'CREATE', class_id: NumberInt(3), granting: false, audit_success: true, audit_failure: true },
     { _id: 84, acl_object_identity: NumberInt(3), ace_order: NumberInt(84), sid: NumberInt(3), mask: 'DELETE', class_id: NumberInt(3), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 85, acl_object_identity: NumberInt(4), ace_order: NumberInt(85), sid: NumberInt(3), mask: 'READ', class_id: NumberInt(4), granting: false, audit_success: true, audit_failure: true },
     { _id: 86, acl_object_identity: NumberInt(4), ace_order: NumberInt(86), sid: NumberInt(3), mask: 'WRITE', class_id: NumberInt(4), granting: false, audit_success: true, audit_failure: true },
     { _id: 87, acl_object_identity: NumberInt(4), ace_order: NumberInt(87), sid: NumberInt(3), mask: 'CREATE', class_id: NumberInt(4), granting: false, audit_success: true, audit_failure: true },
     { _id: 88, acl_object_identity: NumberInt(4), ace_order: NumberInt(88), sid: NumberInt(3), mask: 'DELETE', class_id: NumberInt(4), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 89, acl_object_identity: NumberInt(5), ace_order: NumberInt(89), sid: NumberInt(3), mask: 'READ', class_id: NumberInt(5), granting: false, audit_success: true, audit_failure: true },
     { _id: 90, acl_object_identity: NumberInt(5), ace_order: NumberInt(90), sid: NumberInt(3), mask: 'WRITE', class_id: NumberInt(5), granting: false, audit_success: true, audit_failure: true },
     { _id: 91, acl_object_identity: NumberInt(5), ace_order: NumberInt(91), sid: NumberInt(3), mask: 'CREATE', class_id: NumberInt(5), granting: false, audit_success: true, audit_failure: true },
     { _id: 92, acl_object_identity: NumberInt(5), ace_order: NumberInt(92), sid: NumberInt(3), mask: 'DELETE', class_id: NumberInt(5), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 93, acl_object_identity: NumberInt(6), ace_order: NumberInt(93), sid: NumberInt(3), mask: 'READ', class_id: NumberInt(6), granting: false, audit_success: true, audit_failure: true },
     { _id: 94, acl_object_identity: NumberInt(6), ace_order: NumberInt(94), sid: NumberInt(3), mask: 'WRITE', class_id: NumberInt(6), granting: false, audit_success: true, audit_failure: true },
     { _id: 95, acl_object_identity: NumberInt(6), ace_order: NumberInt(95), sid: NumberInt(3), mask: 'CREATE', class_id: NumberInt(6), granting: false, audit_success: true, audit_failure: true },
     { _id: 96, acl_object_identity: NumberInt(6), ace_order: NumberInt(96), sid: NumberInt(3), mask: 'DELETE', class_id: NumberInt(6), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 97, acl_object_identity: NumberInt(7), ace_order: NumberInt(97), sid: NumberInt(3), mask: 'READ', class_id: NumberInt(7), granting: false, audit_success: true, audit_failure: true },
     { _id: 98, acl_object_identity: NumberInt(7), ace_order: NumberInt(98), sid: NumberInt(3), mask: 'WRITE', class_id: NumberInt(7), granting: false, audit_success: true, audit_failure: true },
     { _id: 99, acl_object_identity: NumberInt(7), ace_order: NumberInt(99), sid: NumberInt(3), mask: 'CREATE', class_id: NumberInt(7), granting: false, audit_success: true, audit_failure: true },
     { _id: 100, acl_object_identity: NumberInt(7), ace_order: NumberInt(100), sid: NumberInt(3), mask: 'DELETE', class_id: NumberInt(7), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 101, acl_object_identity: NumberInt(8), ace_order: NumberInt(101), sid: NumberInt(3), mask: 'READ', class_id: NumberInt(8), granting: false, audit_success: true, audit_failure: true },
     { _id: 102, acl_object_identity: NumberInt(8), ace_order: NumberInt(102), sid: NumberInt(3), mask: 'WRITE', class_id: NumberInt(8), granting: false, audit_success: true, audit_failure: true },
     { _id: 103, acl_object_identity: NumberInt(8), ace_order: NumberInt(103), sid: NumberInt(3), mask: 'CREATE', class_id: NumberInt(8), granting: false, audit_success: true, audit_failure: true },
     { _id: 104, acl_object_identity: NumberInt(8), ace_order: NumberInt(104), sid: NumberInt(3), mask: 'DELETE', class_id: NumberInt(8), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 105, acl_object_identity: NumberInt(9), ace_order: NumberInt(105), sid: NumberInt(3), mask: 'READ', class_id: NumberInt(9), granting: false, audit_success: true, audit_failure: true },
     { _id: 106, acl_object_identity: NumberInt(9), ace_order: NumberInt(106), sid: NumberInt(3), mask: 'WRITE', class_id: NumberInt(9), granting: false, audit_success: true, audit_failure: true },
     { _id: 107, acl_object_identity: NumberInt(9), ace_order: NumberInt(107), sid: NumberInt(3), mask: 'CREATE', class_id: NumberInt(9), granting: false, audit_success: true, audit_failure: true },
     { _id: 108, acl_object_identity: NumberInt(9), ace_order: NumberInt(108), sid: NumberInt(3), mask: 'DELETE', class_id: NumberInt(9), granting: false, audit_success: true, audit_failure: true }
   ]
 );

 
 //-- For ADMIN type PERMISSIONS
db.getCollection("acl_entry").insert( 
   [
     { _id: 109, acl_object_identity: NumberInt(1), ace_order: NumberInt(109), sid: NumberInt(4), mask: 'READ', class_id: NumberInt(1), granting: false, audit_success: true, audit_failure: true },
     { _id: 110, acl_object_identity: NumberInt(1), ace_order: NumberInt(110), sid: NumberInt(4), mask: 'WRITE', class_id: NumberInt(1), granting: false, audit_success: true, audit_failure: true },
     { _id: 111, acl_object_identity: NumberInt(1), ace_order: NumberInt(111), sid: NumberInt(4), mask: 'CREATE', class_id: NumberInt(1), granting: false, audit_success: true, audit_failure: true },
     { _id: 112, acl_object_identity: NumberInt(1), ace_order: NumberInt(112), sid: NumberInt(4), mask: 'DELETE', class_id: NumberInt(1), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 113, acl_object_identity: NumberInt(2), ace_order: NumberInt(113), sid: NumberInt(4), mask: 'READ', class_id: NumberInt(2), granting: false, audit_success: true, audit_failure: true },
     { _id: 114, acl_object_identity: NumberInt(2), ace_order: NumberInt(114), sid: NumberInt(4), mask: 'WRITE', class_id: NumberInt(2), granting: false, audit_success: true, audit_failure: true },
     { _id: 115, acl_object_identity: NumberInt(2), ace_order: NumberInt(115), sid: NumberInt(4), mask: 'CREATE', class_id: NumberInt(2), granting: false, audit_success: true, audit_failure: true },
     { _id: 116, acl_object_identity: NumberInt(2), ace_order: NumberInt(116), sid: NumberInt(4), mask: 'DELETE', class_id: NumberInt(2), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 117, acl_object_identity: NumberInt(3), ace_order: NumberInt(117), sid: NumberInt(4), mask: 'READ', class_id: NumberInt(3), granting: false, audit_success: true, audit_failure: true },
     { _id: 118, acl_object_identity: NumberInt(3), ace_order: NumberInt(118), sid: NumberInt(4), mask: 'WRITE', class_id: NumberInt(3), granting: false, audit_success: true, audit_failure: true },
     { _id: 119, acl_object_identity: NumberInt(3), ace_order: NumberInt(119), sid: NumberInt(4), mask: 'CREATE', class_id: NumberInt(3), granting: false, audit_success: true, audit_failure: true },
     { _id: 120, acl_object_identity: NumberInt(3), ace_order: NumberInt(120), sid: NumberInt(4), mask: 'DELETE', class_id: NumberInt(3), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 121, acl_object_identity: NumberInt(4), ace_order: NumberInt(121), sid: NumberInt(4), mask: 'READ', class_id: NumberInt(4), granting: false, audit_success: true, audit_failure: true },
     { _id: 122, acl_object_identity: NumberInt(4), ace_order: NumberInt(122), sid: NumberInt(4), mask: 'WRITE', class_id: NumberInt(4), granting: false, audit_success: true, audit_failure: true },
     { _id: 123, acl_object_identity: NumberInt(4), ace_order: NumberInt(123), sid: NumberInt(4), mask: 'CREATE', class_id: NumberInt(4), granting: false, audit_success: true, audit_failure: true },
     { _id: 124, acl_object_identity: NumberInt(4), ace_order: NumberInt(124), sid: NumberInt(4), mask: 'DELETE', class_id: NumberInt(4), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 125, acl_object_identity: NumberInt(5), ace_order: NumberInt(125), sid: NumberInt(4), mask: 'READ', class_id: NumberInt(5), granting: false, audit_success: true, audit_failure: true },
     { _id: 126, acl_object_identity: NumberInt(5), ace_order: NumberInt(126), sid: NumberInt(4), mask: 'WRITE', class_id: NumberInt(5), granting: false, audit_success: true, audit_failure: true },
     { _id: 127, acl_object_identity: NumberInt(5), ace_order: NumberInt(127), sid: NumberInt(4), mask: 'CREATE', class_id: NumberInt(5), granting: false, audit_success: true, audit_failure: true },
     { _id: 128, acl_object_identity: NumberInt(5), ace_order: NumberInt(128), sid: NumberInt(4), mask: 'DELETE', class_id: NumberInt(5), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 129, acl_object_identity: NumberInt(6), ace_order: NumberInt(129), sid: NumberInt(4), mask: 'READ', class_id: NumberInt(6), granting: false, audit_success: true, audit_failure: true },
     { _id: 130, acl_object_identity: NumberInt(6), ace_order: NumberInt(130), sid: NumberInt(4), mask: 'WRITE', class_id: NumberInt(6), granting: false, audit_success: true, audit_failure: true },
     { _id: 131, acl_object_identity: NumberInt(6), ace_order: NumberInt(131), sid: NumberInt(4), mask: 'CREATE', class_id: NumberInt(6), granting: false, audit_success: true, audit_failure: true },
     { _id: 132, acl_object_identity: NumberInt(6), ace_order: NumberInt(132), sid: NumberInt(4), mask: 'DELETE', class_id: NumberInt(6), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 133, acl_object_identity: NumberInt(7), ace_order: NumberInt(133), sid: NumberInt(4), mask: 'READ', class_id: NumberInt(7), granting: false, audit_success: true, audit_failure: true },
     { _id: 134, acl_object_identity: NumberInt(7), ace_order: NumberInt(134), sid: NumberInt(4), mask: 'WRITE', class_id: NumberInt(7), granting: false, audit_success: true, audit_failure: true },
     { _id: 135, acl_object_identity: NumberInt(7), ace_order: NumberInt(135), sid: NumberInt(4), mask: 'CREATE', class_id: NumberInt(7), granting: false, audit_success: true, audit_failure: true },
     { _id: 136, acl_object_identity: NumberInt(7), ace_order: NumberInt(136), sid: NumberInt(4), mask: 'DELETE', class_id: NumberInt(7), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 137, acl_object_identity: NumberInt(8), ace_order: NumberInt(137), sid: NumberInt(4), mask: 'READ', class_id: NumberInt(8), granting: false, audit_success: true, audit_failure: true },
     { _id: 138, acl_object_identity: NumberInt(8), ace_order: NumberInt(138), sid: NumberInt(4), mask: 'WRITE', class_id: NumberInt(8), granting: false, audit_success: true, audit_failure: true },
     { _id: 139, acl_object_identity: NumberInt(8), ace_order: NumberInt(139), sid: NumberInt(4), mask: 'CREATE', class_id: NumberInt(8), granting: false, audit_success: true, audit_failure: true },
     { _id: 140, acl_object_identity: NumberInt(8), ace_order: NumberInt(140), sid: NumberInt(4), mask: 'DELETE', class_id: NumberInt(8), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 141, acl_object_identity: NumberInt(9), ace_order: NumberInt(141), sid: NumberInt(4), mask: 'READ', class_id: NumberInt(9), granting: false, audit_success: true, audit_failure: true },
     { _id: 142, acl_object_identity: NumberInt(9), ace_order: NumberInt(142), sid: NumberInt(4), mask: 'WRITE', class_id: NumberInt(9), granting: false, audit_success: true, audit_failure: true },
     { _id: 143, acl_object_identity: NumberInt(9), ace_order: NumberInt(143), sid: NumberInt(4), mask: 'CREATE', class_id: NumberInt(9), granting: false, audit_success: true, audit_failure: true },
     { _id: 144, acl_object_identity: NumberInt(9), ace_order: NumberInt(144), sid: NumberInt(4), mask: 'DELETE', class_id: NumberInt(9), granting: false, audit_success: true, audit_failure: true }
   ]
 );


  //-- For STAFF type PERMISSIONS
db.getCollection("acl_entry").insert( 
   [
     { _id: 145, acl_object_identity: NumberInt(1), ace_order: NumberInt(145), sid: NumberInt(5), mask: 'READ', class_id: NumberInt(1), granting: false, audit_success: true, audit_failure: true },
     { _id: 146, acl_object_identity: NumberInt(1), ace_order: NumberInt(146), sid: NumberInt(5), mask: 'WRITE', class_id: NumberInt(1), granting: false, audit_success: true, audit_failure: true },
     { _id: 147, acl_object_identity: NumberInt(1), ace_order: NumberInt(147), sid: NumberInt(5), mask: 'CREATE', class_id: NumberInt(1), granting: false, audit_success: true, audit_failure: true },
     { _id: 148, acl_object_identity: NumberInt(1), ace_order: NumberInt(148), sid: NumberInt(5), mask: 'DELETE', class_id: NumberInt(1), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 149, acl_object_identity: NumberInt(2), ace_order: NumberInt(149), sid: NumberInt(5), mask: 'READ', class_id: NumberInt(2), granting: false, audit_success: true, audit_failure: true },
     { _id: 150, acl_object_identity: NumberInt(2), ace_order: NumberInt(150), sid: NumberInt(5), mask: 'WRITE', class_id: NumberInt(2), granting: false, audit_success: true, audit_failure: true },
     { _id: 151, acl_object_identity: NumberInt(2), ace_order: NumberInt(151), sid: NumberInt(5), mask: 'CREATE', class_id: NumberInt(2), granting: false, audit_success: true, audit_failure: true },
     { _id: 152, acl_object_identity: NumberInt(2), ace_order: NumberInt(152), sid: NumberInt(5), mask: 'DELETE', class_id: NumberInt(2), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 153, acl_object_identity: NumberInt(3), ace_order: NumberInt(153), sid: NumberInt(5), mask: 'READ', class_id: NumberInt(3), granting: false, audit_success: true, audit_failure: true },
     { _id: 154, acl_object_identity: NumberInt(3), ace_order: NumberInt(154), sid: NumberInt(5), mask: 'WRITE', class_id: NumberInt(3), granting: false, audit_success: true, audit_failure: true },
     { _id: 155, acl_object_identity: NumberInt(3), ace_order: NumberInt(155), sid: NumberInt(5), mask: 'CREATE', class_id: NumberInt(3), granting: false, audit_success: true, audit_failure: true },
     { _id: 156, acl_object_identity: NumberInt(3), ace_order: NumberInt(156), sid: NumberInt(5), mask: 'DELETE', class_id: NumberInt(3), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 157, acl_object_identity: NumberInt(4), ace_order: NumberInt(157), sid: NumberInt(5), mask: 'READ', class_id: NumberInt(4), granting: false, audit_success: true, audit_failure: true },
     { _id: 158, acl_object_identity: NumberInt(4), ace_order: NumberInt(158), sid: NumberInt(5), mask: 'WRITE', class_id: NumberInt(4), granting: false, audit_success: true, audit_failure: true },
     { _id: 159, acl_object_identity: NumberInt(4), ace_order: NumberInt(159), sid: NumberInt(5), mask: 'CREATE', class_id: NumberInt(4), granting: false, audit_success: true, audit_failure: true },
     { _id: 160, acl_object_identity: NumberInt(4), ace_order: NumberInt(160), sid: NumberInt(5), mask: 'DELETE', class_id: NumberInt(4), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 161, acl_object_identity: NumberInt(5), ace_order: NumberInt(161), sid: NumberInt(5), mask: 'READ', class_id: NumberInt(5), granting: false, audit_success: true, audit_failure: true },
     { _id: 162, acl_object_identity: NumberInt(5), ace_order: NumberInt(162), sid: NumberInt(5), mask: 'WRITE', class_id: NumberInt(5), granting: false, audit_success: true, audit_failure: true },
     { _id: 163, acl_object_identity: NumberInt(5), ace_order: NumberInt(163), sid: NumberInt(5), mask: 'CREATE', class_id: NumberInt(5), granting: false, audit_success: true, audit_failure: true },
     { _id: 164, acl_object_identity: NumberInt(5), ace_order: NumberInt(164), sid: NumberInt(5), mask: 'DELETE', class_id: NumberInt(5), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 165, acl_object_identity: NumberInt(6), ace_order: NumberInt(165), sid: NumberInt(5), mask: 'READ', class_id: NumberInt(6), granting: false, audit_success: true, audit_failure: true },
     { _id: 166, acl_object_identity: NumberInt(6), ace_order: NumberInt(166), sid: NumberInt(5), mask: 'WRITE', class_id: NumberInt(6), granting: false, audit_success: true, audit_failure: true },
     { _id: 167, acl_object_identity: NumberInt(6), ace_order: NumberInt(167), sid: NumberInt(5), mask: 'CREATE', class_id: NumberInt(6), granting: false, audit_success: true, audit_failure: true },
     { _id: 168, acl_object_identity: NumberInt(6), ace_order: NumberInt(168), sid: NumberInt(5), mask: 'DELETE', class_id: NumberInt(6), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 169, acl_object_identity: NumberInt(7), ace_order: NumberInt(169), sid: NumberInt(5), mask: 'READ', class_id: NumberInt(7), granting: false, audit_success: true, audit_failure: true },
     { _id: 170, acl_object_identity: NumberInt(7), ace_order: NumberInt(170), sid: NumberInt(5), mask: 'WRITE', class_id: NumberInt(7), granting: false, audit_success: true, audit_failure: true },
     { _id: 171, acl_object_identity: NumberInt(7), ace_order: NumberInt(171), sid: NumberInt(5), mask: 'CREATE', class_id: NumberInt(7), granting: false, audit_success: true, audit_failure: true },
     { _id: 172, acl_object_identity: NumberInt(7), ace_order: NumberInt(172), sid: NumberInt(5), mask: 'DELETE', class_id: NumberInt(7), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 173, acl_object_identity: NumberInt(8), ace_order: NumberInt(173), sid: NumberInt(5), mask: 'READ', class_id: NumberInt(8), granting: false, audit_success: true, audit_failure: true },
     { _id: 174, acl_object_identity: NumberInt(8), ace_order: NumberInt(174), sid: NumberInt(5), mask: 'WRITE', class_id: NumberInt(8), granting: false, audit_success: true, audit_failure: true },
     { _id: 175, acl_object_identity: NumberInt(8), ace_order: NumberInt(175), sid: NumberInt(5), mask: 'CREATE', class_id: NumberInt(8), granting: false, audit_success: true, audit_failure: true },
     { _id: 176, acl_object_identity: NumberInt(8), ace_order: NumberInt(176), sid: NumberInt(5), mask: 'DELETE', class_id: NumberInt(8), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 177, acl_object_identity: NumberInt(9), ace_order: NumberInt(177), sid: NumberInt(5), mask: 'READ', class_id: NumberInt(9), granting: false, audit_success: true, audit_failure: true },
     { _id: 178, acl_object_identity: NumberInt(9), ace_order: NumberInt(178), sid: NumberInt(5), mask: 'WRITE', class_id: NumberInt(9), granting: false, audit_success: true, audit_failure: true },
     { _id: 179, acl_object_identity: NumberInt(9), ace_order: NumberInt(179), sid: NumberInt(5), mask: 'CREATE', class_id: NumberInt(9), granting: false, audit_success: true, audit_failure: true },
     { _id: 180, acl_object_identity: NumberInt(9), ace_order: NumberInt(180), sid: NumberInt(5), mask: 'DELETE', class_id: NumberInt(9), granting: false, audit_success: true, audit_failure: true }
   ]
 );


  //-- For DEVELOPER type PERMISSIONS
db.getCollection("acl_entry").insert( 
   [
     { _id: 181, acl_object_identity: NumberInt(1), ace_order: NumberInt(181), sid: NumberInt(6), mask: 'READ', class_id: NumberInt(1), granting: false, audit_success: true, audit_failure: true },
     { _id: 182, acl_object_identity: NumberInt(1), ace_order: NumberInt(182), sid: NumberInt(6), mask: 'WRITE', class_id: NumberInt(1), granting: false, audit_success: true, audit_failure: true },
     { _id: 183, acl_object_identity: NumberInt(1), ace_order: NumberInt(183), sid: NumberInt(6), mask: 'CREATE', class_id: NumberInt(1), granting: false, audit_success: true, audit_failure: true },
     { _id: 184, acl_object_identity: NumberInt(1), ace_order: NumberInt(184), sid: NumberInt(6), mask: 'DELETE', class_id: NumberInt(1), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 185, acl_object_identity: NumberInt(2), ace_order: NumberInt(185), sid: NumberInt(6), mask: 'READ', class_id: NumberInt(2), granting: false, audit_success: true, audit_failure: true },
     { _id: 186, acl_object_identity: NumberInt(2), ace_order: NumberInt(186), sid: NumberInt(6), mask: 'WRITE', class_id: NumberInt(2), granting: false, audit_success: true, audit_failure: true },
     { _id: 187, acl_object_identity: NumberInt(2), ace_order: NumberInt(187), sid: NumberInt(6), mask: 'CREATE', class_id: NumberInt(2), granting: false, audit_success: true, audit_failure: true },
     { _id: 188, acl_object_identity: NumberInt(2), ace_order: NumberInt(188), sid: NumberInt(6), mask: 'DELETE', class_id: NumberInt(2), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 189, acl_object_identity: NumberInt(3), ace_order: NumberInt(189), sid: NumberInt(6), mask: 'READ', class_id: NumberInt(3), granting: false, audit_success: true, audit_failure: true },
     { _id: 190, acl_object_identity: NumberInt(3), ace_order: NumberInt(190), sid: NumberInt(6), mask: 'WRITE', class_id: NumberInt(3), granting: false, audit_success: true, audit_failure: true },
     { _id: 191, acl_object_identity: NumberInt(3), ace_order: NumberInt(191), sid: NumberInt(6), mask: 'CREATE', class_id: NumberInt(3), granting: false, audit_success: true, audit_failure: true },
     { _id: 192, acl_object_identity: NumberInt(3), ace_order: NumberInt(192), sid: NumberInt(6), mask: 'DELETE', class_id: NumberInt(3), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 193, acl_object_identity: NumberInt(4), ace_order: NumberInt(193), sid: NumberInt(6), mask: 'READ', class_id: NumberInt(4), granting: false, audit_success: true, audit_failure: true },
     { _id: 194, acl_object_identity: NumberInt(4), ace_order: NumberInt(194), sid: NumberInt(6), mask: 'WRITE', class_id: NumberInt(4), granting: false, audit_success: true, audit_failure: true },
     { _id: 195, acl_object_identity: NumberInt(4), ace_order: NumberInt(195), sid: NumberInt(6), mask: 'CREATE', class_id: NumberInt(4), granting: false, audit_success: true, audit_failure: true },
     { _id: 196, acl_object_identity: NumberInt(4), ace_order: NumberInt(196), sid: NumberInt(6), mask: 'DELETE', class_id: NumberInt(4), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 197, acl_object_identity: NumberInt(5), ace_order: NumberInt(197), sid: NumberInt(6), mask: 'READ', class_id: NumberInt(5), granting: false, audit_success: true, audit_failure: true },
     { _id: 198, acl_object_identity: NumberInt(5), ace_order: NumberInt(198), sid: NumberInt(6), mask: 'WRITE', class_id: NumberInt(5), granting: false, audit_success: true, audit_failure: true },
     { _id: 199, acl_object_identity: NumberInt(5), ace_order: NumberInt(199), sid: NumberInt(6), mask: 'CREATE', class_id: NumberInt(5), granting: false, audit_success: true, audit_failure: true },
     { _id: 200, acl_object_identity: NumberInt(5), ace_order: NumberInt(200), sid: NumberInt(6), mask: 'DELETE', class_id: NumberInt(5), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 201, acl_object_identity: NumberInt(6), ace_order: NumberInt(201), sid: NumberInt(6), mask: 'READ', class_id: NumberInt(6), granting: false, audit_success: true, audit_failure: true },
     { _id: 202, acl_object_identity: NumberInt(6), ace_order: NumberInt(202), sid: NumberInt(6), mask: 'WRITE', class_id: NumberInt(6), granting: false, audit_success: true, audit_failure: true },
     { _id: 203, acl_object_identity: NumberInt(6), ace_order: NumberInt(203), sid: NumberInt(6), mask: 'CREATE', class_id: NumberInt(6), granting: false, audit_success: true, audit_failure: true },
     { _id: 204, acl_object_identity: NumberInt(6), ace_order: NumberInt(204), sid: NumberInt(6), mask: 'DELETE', class_id: NumberInt(6), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 205, acl_object_identity: NumberInt(7), ace_order: NumberInt(205), sid: NumberInt(6), mask: 'READ', class_id: NumberInt(7), granting: false, audit_success: true, audit_failure: true },
     { _id: 206, acl_object_identity: NumberInt(7), ace_order: NumberInt(206), sid: NumberInt(6), mask: 'WRITE', class_id: NumberInt(7), granting: false, audit_success: true, audit_failure: true },
     { _id: 207, acl_object_identity: NumberInt(7), ace_order: NumberInt(207), sid: NumberInt(6), mask: 'CREATE', class_id: NumberInt(7), granting: false, audit_success: true, audit_failure: true },
     { _id: 208, acl_object_identity: NumberInt(7), ace_order: NumberInt(208), sid: NumberInt(6), mask: 'DELETE', class_id: NumberInt(7), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 209, acl_object_identity: NumberInt(8), ace_order: NumberInt(209), sid: NumberInt(6), mask: 'READ', class_id: NumberInt(8), granting: false, audit_success: true, audit_failure: true },
     { _id: 210, acl_object_identity: NumberInt(8), ace_order: NumberInt(210), sid: NumberInt(6), mask: 'WRITE', class_id: NumberInt(8), granting: false, audit_success: true, audit_failure: true },
     { _id: 211, acl_object_identity: NumberInt(8), ace_order: NumberInt(211), sid: NumberInt(6), mask: 'CREATE', class_id: NumberInt(8), granting: false, audit_success: true, audit_failure: true },
     { _id: 212, acl_object_identity: NumberInt(8), ace_order: NumberInt(212), sid: NumberInt(6), mask: 'DELETE', class_id: NumberInt(8), granting: false, audit_success: true, audit_failure: true },
     
     { _id: 213, acl_object_identity: NumberInt(9), ace_order: NumberInt(213), sid: NumberInt(6), mask: 'READ', class_id: NumberInt(9), granting: false, audit_success: true, audit_failure: true },
     { _id: 214, acl_object_identity: NumberInt(9), ace_order: NumberInt(214), sid: NumberInt(6), mask: 'WRITE', class_id: NumberInt(9), granting: false, audit_success: true, audit_failure: true },
     { _id: 215, acl_object_identity: NumberInt(9), ace_order: NumberInt(215), sid: NumberInt(6), mask: 'CREATE', class_id: NumberInt(9), granting: false, audit_success: true, audit_failure: true },
     { _id: 216, acl_object_identity: NumberInt(9), ace_order: NumberInt(216), sid: NumberInt(6), mask: 'DELETE', class_id: NumberInt(9), granting: false, audit_success: true, audit_failure: true }
   ]
 );


//
db.acl_entry.find({ sid: 1, class_id: 1, mask: 'READ' } , 
  { 
    "_id": 1,
    "mask": 1,
    "sid": 1, 
    "class_id": 1,
    "granting": 1,
    "audit_success": 1,
    "audit_failure": 1
} );

