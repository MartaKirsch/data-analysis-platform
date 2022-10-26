from flask import Flask, request, jsonify, abort, send_file
import pandas as pd
from src import app
from .linear_regression import DataProcessing,change_learning_rate, SGD, makeLinReg
import json
import io


# function mappings, use them for file upload(multipart/form-data should have a key value named method so for ex. method="pca")
function_mappings = {
    'linear_regression': makeLinReg,
}

# dictionary of calculation results, probably should be a database tbh?
calculation_node_dict = {}

@app.errorhandler(400)
def resource_not_found(e):
    return jsonify(error=str(e)), 400

# node_id is the id of calculation node, method is the specific calculation
@app.route("/upload_file/<node_id>" , methods = ["POST"])
def upload_file(node_id):
    data = request.files['file']
    method = request.form['method']
    type = request.form['type']
    if data:
        if type == "text/csv":
            result = function_mappings[method](data)
            calculation_node_dict[str(node_id)] = result
            print(calculation_node_dict["h1"])
        else:
            abort(400, description="Wrong type of file")
    else:
        abort(400, description="File not found")
    return json.dumps({'success': True}), 200, {'ContentType':'application/json'}

# get plot png
@app.route("/get_plot/<node_id>" , methods = ["GET"])
def get_plot(node_id):
    try:
        dict = calculation_node_dict[str(node_id)]
        plot = io.BytesIO(dict[0]["plot"].read())
        img_name = str(node_id) + ".png"
        return send_file(io.BytesIO(plot.read()),
                            download_name=img_name,
                            mimetype='image/png')
    except:
        abort(400, description = "Node not found")


# get numeric results(later will change from json to csv probably)
@app.route("/get_numeric/<node_id>" , methods = ["GET"])
def get_numeric(node_id):
    try:
        dict = calculation_node_dict[str(node_id)]
        numeric = dict[0]["numeric"]
        return json.dumps(numeric), 200, {'ContentType':'application/json'}
    except:
        abort(400, description = "Node not found")