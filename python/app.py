from flask import Flask, request, Response, jsonify
import os
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config.from_pyfile('./config/appconfig.cfg')
CONF = f"postgresql://{app.config['PG_USER']}:{app.config['PG_PASSWORD']}@{app.config['PG_HOST']}:{app.config['PG_PORT']}/{app.config['PG_DATABASE']}"
app.config['SQLALCHEMY_DATABASE_URI'] = CONF

db = SQLAlchemy(app)

# Model
class Item(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(255), unique=True, nullable=False)
  content = db.Column(db.String(255), nullable=False)

  def __init__(self, title, content):
    self.title = title
    self.content = content

db.create_all()
db.session.commit()

@app.route('/', methods=['GET'])
def get():
  return ""

# Create item
@app.route('/items', methods=['POST'])
def itemadd():
  request_data = request.get_json()
  title = request_data['title']
  content = request_data['content']

  entry = Item(title, content)
  db.session.add(entry)
  db.session.commit()

  return "item created"
