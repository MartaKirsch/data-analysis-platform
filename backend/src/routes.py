from flask import Flask, request, jsonify, abort, send_file, Response, make_response
import pandas as pd
from src import app
from .calculation_methods.linear_regression import makeLinReg
from .error_handler import ErrorHandler
import json
import io
import csv
from PIL import Image


# dictionary of function mappings
FUNCTION_MAPPINGS = {
    'linear_regression': makeLinReg,
}

ERROR_CONSTRAINT_MAPPINGS = {
    'linear_regression': [2, 2],
}

calculation_node_dict = {}

#basic error handling tbd
@app.errorhandler(400)
def resource_not_found(e):
    return jsonify(error=str(e)), 400

@app.errorhandler(500)
def resource_not_found(e):
    return jsonify(error=str(e)), 500

# node_id is the id of calculation node in all instances
@app.route("/calculate/<node_id>" , methods = ["POST"])
def upload_file(node_id):
    data = request.files['file']
    method = request.form['calculationType']
    mimetype = data.content_type

    #check if file is empty
    if data:
        #check if correct filetype
        if mimetype == "text/csv":
            #allow for multiple types of separators in csv
            df_data = pd.read_csv(data, sep = '[;,,]')
            #check errors unique to functions
            validator = ErrorHandler(ERROR_CONSTRAINT_MAPPINGS[method][0],ERROR_CONSTRAINT_MAPPINGS[method][1], df_data)
            if validator.check_column_format():
                if validator.check_column_number():
                    result = FUNCTION_MAPPINGS[method](df_data)
                    calculation_node_dict[str(node_id)] = result
                else:
                    abort(422, description="Incorrect number of columns.")
            else:
                abort(422, description="Wrong data type in at least one of the columns.")
        else:
            abort(415, description="Wrong filetype.")
    else:
        abort(422, description="File is empty.")
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
                             mimetype='text/csv',
                             as_attachment=True)

        except Exception as ex:
            abort(500, description = ex)

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
                             mimetype='image/png',
                             as_attachment=True)

        except Exception as ex:
            abort(500, description = ex)

    else:
        abort(415, description="Incorrect type of result expected.")

#board wipe after exit
@app.route("/wipe_board" , methods=['POST'])
def wipe_board():
    try:
        calculation_node_dict.clear()
        return Response(response="Board wiped!", status=200)
    except Exception as ex:
        abort(500, description=ex)
