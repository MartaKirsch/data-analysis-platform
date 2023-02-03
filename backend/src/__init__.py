from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
app.debug = True
CORS(app, expose_headers=["Content-Disposition"])

from .api import routes



