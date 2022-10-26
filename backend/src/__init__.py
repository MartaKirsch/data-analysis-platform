from flask import Flask
from flask_cors import CORS


app = Flask(__name__)

from src import linear_regression
from src import routes


app.debug = True
CORS(app)
