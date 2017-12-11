use cms;
db.createCollection("User", {
    validator: {
        $jsonSchema: {
			bsonType: "object",
			required: ["Username", "Password", "Profile"],
			properties: {
				Username: {
				   bsonType: "string",
				   pattern: "/^.{8,50}$/",
				   description: "Username__string(8,50)__required"
				},
				Email: {
					bsonType: "string",
					pattern: "/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/",
					description: "Email__email"
				},
				Phone: {
					bsonType: "string",
					pattern: "/^.{8,20}$/",
					description: "Phone__phone"
				},
				Password: {
				   bsonType: "string",
				   description: "Password__string__required"
				},
				Pin: {
				   bsonType: "int",
				   description: "Pin__int__required"
				}
			 }
		  }
	   }
	}
);

db.createCollection("Profile", {
	autoIndexId: false,
	validator: {
    	$jsonSchema: {
        	bsonType: "object",
         	required: ["Pin", "FirstName", "LastName", "Gender"],
	        properties: {
				Pin: {
				   bsonType: "int",
				   description: "Pin__int__required"
				},
				FirstName: {
				   bsonType: "string",
				   description: "FirstName__string__required"
				},
				LastName: {
				   bsonType: "string",
				   description: "LastName__string__required"
				},
				Birthday: {
				   bsonType: "date",
				   description: "Birthday__date"
				},
				Gender: {
				   enum: ["M", "F", "O"],
				   description: "Gender__enum(M|F|O)__Required"
				}
			 }
		  }
	   }
	}
);

userId1 = ObjectId()
db.User.insert({
	_id: userId1,
	Username: "admin",
	Email: "briancvn@gmail.com",
	Phone: "+84932727148",
	Password: "$2y$10$1/U1yo5yMdXsrsU3RaeULu7dm7UFX1qq3rnfpbQugv7uIPdo2kMcC",
	Role : "Administrator",
	Profile: {
        "$ref" : "Profile",
        "$id" : userId1,
        "$db" : "cms"
	}
})
db.Profile.insertOne({
  	_id: userId1,
	Pin: NumberInt(1),
	FirstName: "Brian",
	LastName: "Nguyen",
	Birthday: "1982-01-01 00:00:00",
	Gender: "M"
})


userId2 = ObjectId()
db.User.insert({
	_id: userId2,
	Username: "user",
	Email: "user@cms.com",
	Phone: null,
	Password: "$2y$10$1/U1yo5yMdXsrsU3RaeULu7dm7UFX1qq3rnfpbQugv7uIPdo2kMcC",
	Role : "User",
	Profile: {
        "$ref" : "Profile",
        "$id" : userId2,
        "$db" : "cms"
	}
})
db.Profile.insertOne({
  	_id: userId2,
	Pin: NumberInt(2),
	FirstName: "User",
	LastName : "Developer",
	Birthday: "2018-01-01 00:00:00",
	Gender: "M"
})
