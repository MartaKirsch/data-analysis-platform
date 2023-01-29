from flask import request, jsonify, send_file
import pandas as pd
from src import app
from .error_handling.calculation_error_handling import linear_regression_validator, pca_validator, naive_bayes_validator, decision_tree_validator, random_forest_validator
from .error_handling.predictors_error_handling import predictor_validator
import io

# dictionary of function mappings
FUNCTION_MAPPINGS = {
    'linear_regression': linear_regression_validator,
    'pca': pca_validator,
    'naive_bayes': naive_bayes_validator,
    'decision_tree': decision_tree_validator,
    'random_forest': random_forest_validator
}

calculation_node_dict = {}


# basic error handling tbd
@app.errorhandler(400)
def resource_not_found(e):
    return jsonify(error=str(e)), 400


@app.errorhandler(500)
def resource_not_found(e):
    return jsonify(error=str(e)), 500


def request_handler(message, status_code):
    response = jsonify({'response': message})
    response.status_code = status_code
    return response


# node_id is the id of calculation node in all instances
@app.route("/calculate/<node_id>", methods=["POST"])
def upload_file(node_id):
    data = request.files['file']
    method = request.form['calculationType']
    mimetype = data.content_type

    # check if file is empty
    if data:
        # check if correct filetype
        if mimetype == "text/csv":
            # allow for multiple types of separators in csv
            try:
                df_data = pd.read_csv(data, sep='[;,,]')
            except:
                return request_handler("Could not read file.", 500)
            # check errors unique to functions
            result = FUNCTION_MAPPINGS[method](df_data, request)
            if result[0].status_code == 200:
                calculation_node_dict[str(node_id)] = result[1]
                return result[0]
            else:
                return result[0]
        else:
            return request_handler("Wrong filetype.", 415)
    else:
        return request_handler("File is empty.", 422)


@app.route("/result/<node_id>", methods=['GET', 'POST'])
def get_result(node_id):
    req = request.get_json()
    # for returning csv files
    if req["resultType"] == "file":
        try:
            # prepare dictionary values for a csv file
            dict = calculation_node_dict[str(node_id)]
            numeric_dict = dict["file"]

            bytes_file = io.BytesIO()
            numeric_dict.to_csv(bytes_file, index=False)
            bytes_file.seek(0)

            return send_file(bytes_file,
                             download_name=str(node_id) + ".csv",
                             mimetype='text/csv',
                             as_attachment=True)

        except Exception as ex:
            return request_handler("This calculation cannot return a file.", 500)
    # for returning images
    elif req["resultType"] == "plot":
        try:
            dict = calculation_node_dict[str(node_id)]
            plot = dict["plot"]

            bytes_image = io.BytesIO()
            plot.save(bytes_image, format="PNG")
            bytes_image.seek(0)

            img_name = str(node_id) + ".png"

            return send_file(bytes_image,
                             download_name=img_name,
                             mimetype='image/png',
                             as_attachment=True)

        except Exception as ex:
            return request_handler("This calculation cannot return a plot.", 500)

    elif req["resultType"] == "prediction":
        try:
            del req["resultType"]
            dict = calculation_node_dict[str(node_id)]
            model = dict["model"]
            original_sample = dict["original_file_sample"]
            labels = dict["labels"]

            result = predictor_validator(model, req, original_sample, labels)
            if result[0].status_code == 200:
                return request_handler(str(result[1]), 200)
            else:
                return result[0]
        except Exception as ex:
            return request_handler(ex, 500)
    else:
        return request_handler("Incorrect type of result expected.", 415)


# board wipe after exit
@app.route("/wipe_board", methods=['POST'])
def wipe_board():
    try:
        calculation_node_dict.clear()
        return request_handler("Board wiped!", 200)
    except Exception as ex:
        return request_handler(ex, 500)
