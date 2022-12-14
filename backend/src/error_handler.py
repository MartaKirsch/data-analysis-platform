from flask import Flask, jsonify
import pandas as pd
import numpy as np
from .calculation_methods.linear_regression import makeLinReg
from .calculation_methods.pca import do_pca
from .calculation_methods.naive_bayes import naive_bayes
from .predictors import gnb_predictor


# class for universal error checks
class ErrorHandler:
    def __init__(self, min_size, max_size, file):
        self.min_size = min_size
        self.max_size = max_size
        self.file = file

    # check if number of columns is correct
    def check_column_number(self):
        return self.max_size >= len(self.file.columns) >= self.min_size

    # check if data is of correct type(numeric only for now)
    def check_column_format(self):
        return self.file.shape[1] == self.file.select_dtypes(include=np.number).shape[1]


# handling requests
def request_handler(message, status_code):
    response = jsonify({'response': message})
    response.status_code = status_code
    return response


# linear regression error handling
def linear_regression_validator(data, request):
    validator = ErrorHandler(2, 2, data)
    if validator.check_column_format():
        if validator.check_column_number():
            result = makeLinReg(data)
            return [True, result]
        else:
            return [False, (request_handler("Incorrect number of columns.", 422))]
    else:
        return [False, (request_handler("Wrong data type in at least one of the columns.", 422))]


# pca error handling
def pca_validator(data, request):
    classes = request.form['classes']
    validator = ErrorHandler(3, 40, data.loc[:, data.columns != classes])
    if validator.check_column_format():
        if validator.check_column_number():
            try:
                result = do_pca(data, classes)
                return [True, result]
            except Exception as ex:
                return (request_handler(ex, 400))
        else:
            return [False, (request_handler("Incorrect number of columns.", 422))]
    else:
        return [False, (request_handler("Wrong data type in at least one of the columns.", 422))]


def naive_bayes_validator(data, request):
    classes = request.form['classes']
    validator = ErrorHandler(3, 40, data.loc[:, data.columns != classes])
    if validator.check_column_format():
        if validator.check_column_number():
            try:
                result = naive_bayes(data, classes)
                return [True, result]
            except Exception as ex:
                return (request_handler(ex, 400))
        else:
            return [False, (request_handler("Incorrect number of columns.", 422))]
    else:
        return [False, (request_handler("Wrong data type in at least one of the columns.", 422))]


def predictor_validator(model, sample, original_sample):
    # order sample according to original file
    original_columns = original_sample.columns
    sample_df = pd.DataFrame([sample])
    ordered_sample = sample_df.reindex(columns=original_columns)
    # get data types of columns
    orgDataType, dataType = original_sample.dtypes, ordered_sample.dtypes
    type_check = orgDataType == dataType
    if type_check.all() == True:
        try:
            result = gnb_predictor(model, ordered_sample)
            return [True, result[0]]
        except Exception as ex:
            return [False, (request_handler("Could not make a prediction.", 422))]
    else:
        return [False, (request_handler("Wrong data type in sample.", 422))]
    # check if data types are the same
