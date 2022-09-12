from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/path")
def goOnPath():
    return "<p>This is path</p>"

@app.route("/data")
def getData():
    return [1,2,3,4]