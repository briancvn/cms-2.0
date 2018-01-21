use cms;
db.createCollection("User", {
    validator: {
        $jsonSchema: {
			bsonType: "object",
			required: ["Username", "Email", "Phone", "Pin", "Password", "Profile"],
			properties: {
                Version: {
                    bsonType: "int",
                    description: "Pin__int__required"
                },
				Username: {
				   bsonType: "string",
				   pattern: "/^.{8,50}$/",
				   description: "Username__string(8,50)__required"
				},
				Email: {
					bsonType: "string",
					pattern: "/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/",
					description: "Email__email__required"
				},
				Phone: {
					bsonType: "string",
					pattern: "/^.{8,20}$/",
					description: "Phone__phone__required"
				},
				Pin: {
				   bsonType: "int",
				   description: "Pin__int__required"
				},
				Password: {
				   bsonType: "string",
				   description: "Password__string__required"
                },
				RoleGroups: {
				   bsonType: "array",
				   description: "RoleGroups__array"
                },
				Profile: {
				   bsonType: "object",
				   description: "Profile__object__required"
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
         	required: ["Pin", "FirstName", "LastName", "Gender", "Language"],
	        properties: {
                Version: {
                    bsonType: "int",
                    description: "Pin__int__required"
                },
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
                },
                Language: {
                    bsonType: "string",
                    pattern: "/^.{2,3}$/",
                    description: "Language__string__required"
                },
			 }
		  }
	   }
	}
);

userId1 = ObjectId()
db.User.insert({
    _id: userId1,
    Version: NumberInt(1),
	Username: "admin",
	Email: "briancvn@gmail.com",
    Phone: "+84932727148",
    Pin: NumberInt(1),
    Password: "$2y$10$1/U1yo5yMdXsrsU3RaeULu7dm7UFX1qq3rnfpbQugv7uIPdo2kMcC",
	RoleGroups : ["ADMINISTRATOR"],
	Profile: {
        "$ref" : "Profile",
        "$id" : userId1,
        "$db" : "cms"
	}
})
db.Profile.insertOne({
    _id: userId1,
    Version: NumberInt(1),
	Pin: NumberInt(1),
	FirstName: "Brian",
	LastName: "Nguyen",
	Birthday: "1982-01-01 00:00:00",
    Gender: "M",
    Language: "vi"
})

userId2 = ObjectId()
db.User.insert({
    _id: userId2,
    Version: NumberInt(1),
	Username: "manager",
	Email: "manager@cms.com",
    Phone: null,
    Pin: NumberInt(2),
    Password: "$2y$10$1/U1yo5yMdXsrsU3RaeULu7dm7UFX1qq3rnfpbQugv7uIPdo2kMcC",
	RoleGroups : ["MANAGER"],
	Profile: {
        "$ref" : "Profile",
        "$id" : userId2,
        "$db" : "cms"
	}
})
db.Profile.insertOne({
    _id: userId2,
    Version: NumberInt(1),
	Pin: NumberInt(2),
	FirstName: "Manager",
	LastName : "Developer",
	Birthday: "2018-01-01 00:00:00",
	Gender: "F",
    Language: "en"
})

userId3 = ObjectId()
db.User.insert({
    _id: userId3,
    Version: NumberInt(1),
	Username: "user",
	Email: "user@cms.com",
    Phone: null,
    Pin: NumberInt(3),
    Password: "$2y$10$1/U1yo5yMdXsrsU3RaeULu7dm7UFX1qq3rnfpbQugv7uIPdo2kMcC",
	RoleGroups : [],
	Profile: {
        "$ref" : "Profile",
        "$id" : userId3,
        "$db" : "cms"
	}
})
db.Profile.insertOne({
    _id: userId3,
    Version: NumberInt(1),
	Pin: NumberInt(3),
	FirstName: "User",
	LastName : "Developer",
	Birthday: "2018-01-01 00:00:00",
    Gender: "M",
    Language: "vi"
})
