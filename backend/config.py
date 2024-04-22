from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient

app= Flask(__name__)
CORS(app)

app.config['MONGODB_URI']=""

client = MongoClient(app.config['MONGODB_URI'])

db = client.get_database()

