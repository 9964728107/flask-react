from models import Contact,add
from flask import request,jsonify
from config import app,db
from bson.objectid import ObjectId
@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.find({})  # Retrieve all documents from the 'contact' collection
    output = {}
    for idx, contact in enumerate(contacts):
        # Create a key-value pair for each document
        contact_dict = {
            'id':str(contact['_id']),
            'firstName': contact['firstName'],
            'lastName': contact['lastName'],
            'email': contact['email'],
            'phoneNo': contact['phoneNo']
            # Add more fields as needed
        }
        # Use the index as the key
        output[idx] = contact_dict
    print(output)
    return jsonify(output)  # Return the dictionary as JSON

@app.route("/create",methods=["POST"])
def create_contacts():
    first_name= request.json.get('firstName')
    last_name=request.json.get("lastName")
    email=request.json.get('email')
    phone=int(request.json.get('phoneNo'))

    data={
        'firstName':first_name,
        'lastName':last_name,
        'email':email,
        'phoneNo':phone
    }
    
    # if not first_name or not last_name or not email:
    #     return (jsonify("include details nigger!"),400)
    
    newContact=add(data,Contact)
    print(newContact)
    return "added e, data to DB"

@app.route("/update/<userId>", methods=["PATCH"])
def update(userId):
    # # Assuming Contact is the collection in which you're storing contacts
    contact = Contact.find_one({'_id': ObjectId(userId)})
     
    print(contact)
    if contact:
        print("User is found")
        data = request.json
        update_data = {
            "$set": {
            "firstName": data.get("firstName", contact["firstName"]),
            "lastName": data.get("lastName", contact["lastName"]),
            "email": data.get("email", contact["email"]),
            "phoneNo": data.get("phoneNo", contact["phoneNo"])
        }
        }
        Contact.update_one({"_id": contact["_id"]}, update_data)
    
          
        return jsonify({"message":"user found","user":{'name':contact['firstName'],'lname':contact['lastName'],'gmail':contact['email']}}),201
      
        # Contact.find_one_and_update({id:ObjectId(userId)data})
    else:
        print("User is not found")
        return jsonify({"message":"user not found"}),404   
        
 
    
@app.route("/delete/<userId>",methods=["POST"])
def delete(userId):
    contact= Contact.find({'_id':ObjectId(userId)})

    if contact:
        print("suer is found")
        Contact.delete_one({'_id':ObjectId(userId)})
        return jsonify({'message':"object deleted succesfully"})
    if not contact:
        return jsonify({'message':'user not found brother!'})
    return "success"

data = {
    'firstName': 'Sayeem',
    'lastName': 'Ahmed',
    'email': 'john.doe@example.com',
    'phoneNo': 1234567890
 }

