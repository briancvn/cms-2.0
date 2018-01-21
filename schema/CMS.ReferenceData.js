use cms;
db.createCollection("ReferenceData", {
    validator: {
        $jsonSchema: {
			bsonType: "object",
			required: ["Kind", "ReferenceDataValues"],
			properties: {
                Version: {
                    bsonType: "int",
                    description: "Pin__int__required"
                },
                Kind: {
				   bsonType: "string",
				   pattern: "/^.{8,50}$/",
				   description: "Kind__string(8,50)__required"
				},
                ReferenceDataValues: {
				   bsonType: "array",
				   description: "ReferenceDataValues__array__required"
                }
			 }
		  }
	   }
	}
);

db.ReferenceData.insert({
    _id: ObjectId(),
    Version: NumberInt(1),
	Kind: "Boolean",
    ReferenceDataValues: [
		{ Code: true, Text: "True", Properties: {} },
        { Code: false, Text: "False", Properties: {} }
	]
})

db.ReferenceData.insert({
    _id: ObjectId(),
    Version: NumberInt(1),
	Kind: "Gender",
    ReferenceDataValues: [
		{ Code: "M", Text: "Male", Properties: {} },
        { Code: "F", Text: "Female", Properties: {} },
        { Code: "O", Text: "Other", Properties: {} }
	]
})
