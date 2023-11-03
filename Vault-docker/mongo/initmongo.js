db = db.getSiblingDB("user_db");
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

db.ACTIVITY_LOG.insertOne({
	"USERNAME": "MY_NAME",
	"ACTIVITY_STMT": "STATEMENTS"
});
