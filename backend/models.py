from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from cerberus import Validator  # Import Cerberus for schema validation

app = Flask(__name__)
CORS(app)

from config import db



# Define the collection for contact details
Contact = db.contactDetails

# Define the schema for contact details
contact_schema = {
    'firstName': {
        'type': 'string',
        'minlength': 1,
        'required': True,
        'coerce': str.capitalize
    },
    'lastName': {
        'type': 'string',
        'minlength': 1,
        'required': True,
        'coerce': str.capitalize
    },
    'email': {
        'type': 'string',
        'nullable': True,
        'coerce': str.lower,
        'regex': r'^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$'  # Regular expression for email validation
    },
    'phoneNo': {
        'type': 'integer',
        'required': True,
        
        
    }
}

# Validator instance for schema validation
validator = Validator(contact_schema)

# Example of using the validator to validate data
# data_to_validate = {
#     'firstName': 'John',
#     'lastName': 'Doe',
#     'email': 'john.doe@example.com',
#     'phoneNo': 1234567890
# }


def add(data_to_validate, model):
 is_valid = validator.validate(data_to_validate)
     
 if is_valid:
            model.insert_one(data_to_validate)
            return ('Data inserted successfully.')
 else:
            return ('Validation errors:', validator.errors)
    
   