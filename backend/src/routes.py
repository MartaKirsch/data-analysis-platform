from flask import Flask, request, jsonify, abort, send_file, Response, make_response
import pandas as pd
from src import app
from .linear_regression import makeLinReg
import json
import io
import csv
from PIL import Image


# dictionary of function mappings
function_mappings = {
    'linear_regression': makeLinReg,
}


calculation_node_dict = {}

#basic error handling tbd
@app.errorhandler(400)
def resource_not_found(e):
    return jsonify(error=str(e)), 400

# node_id is the id of calculation node in all instances
@app.route("/calculate/<node_id>" , methods = ["POST"])
def upload_file(node_id):
    data = request.files['file']
    method = request.form['calculationType']
    #mimetype = data.content_type()
    mimetype = "text/csv"
    if data:
        if mimetype == "text/csv":
            result = function_mappings[method](data)
            calculation_node_dict[str(node_id)] = result
        else:
            abort(400, description="Wrong filetype.")
    else:
        abort(400, description="File not found.")
    return Response(response="Success!", status=200)

@app.route("/result/<node_id>" , methods=['GET', 'POST'])
def get_result(node_id):
    req = request.get_json()
    if req["resultType"] == "file":
        try:
            #prepare dictionary values for a csv file
            dict = calculation_node_dict[str(node_id)]
            numeric_dict = dict[0]["file"]

            bytes_file = io.BytesIO()
            numeric_dict.to_csv(bytes_file, index=False)
            bytes_file.seek(0)

            return send_file(bytes_file,
                             download_name=str(node_id) + ".csv",
                             mimetype='text/csv')

        except Exception as ex:
            abort(400, description = ex)

    elif req["resultType"] == "plot":
        try:
            dict = calculation_node_dict[str(node_id)]
            plot = dict[0]["plot"]

            bytes_image = io.BytesIO()
            plot.save(bytes_image, format = "PNG")
            bytes_image.seek(0)

            img_name = str(node_id) + ".png"

            return send_file(bytes_image,
                             download_name=img_name,
                             mimetype='image/png')

        except Exception as ex:
            abort(400, description = ex)

    else:
        abort(400, description="Incorrect type of result expected.")

#board wipe after exit
@app.route("/wipe_board" , methods=['POST'])
def wipe_board():
    calculation_node_dict.clear()
    return Response(response="Success!", status=200)