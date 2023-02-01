from flask import jsonify
import sys, os
import pandas as pd
import numpy as np
from .error_handler import ErrorHandler

sys.path.append('../')

from ..calculation_methods.linear_regression import makeLinReg
from ..calculation_methods.pca import makePCA
from ..calculation_methods.naive_bayes import makeNaiveBayes
from ..calculation_methods.decision_tree import makeDecTree
from ..calculation_methods.random_forest import makeRanForest



# linear regression error handling
def linear_regression_validator(data, request):
    col_indexes = request.form.getlist('columnIndexes')
    validator = ErrorHandler(2, 2, data.iloc[:, [int(col_indexes[0]), int(col_indexes[1])]])
    v_check_1, v_check_2 = validator.check_column_format(), validator.check_row_length()
    if v_check_1.status_code == 200:
        if v_check_2.status_code == 200:
            result = makeLinReg(data, int(col_indexes[0]), int(col_indexes[1]))
            return [ErrorHandler.request_handler("Success!", 200), result]
        else:
            return [v_check_2]
    else:
        return [v_check_1]

# pca error handling
def pca_validator(data, request):
    classes = request.form['classes']
    validator = ErrorHandler(2, 40, data.loc[:, data.columns != classes])
    unique_classes = data[classes].unique()
    v_check_1, v_check_2, v_check_3 = validator.check_column_format(), validator.check_column_number(), validator.check_row_length()
    if v_check_1.status_code == 200:
        if v_check_2.status_code == 200:
            if v_check_3.status_code == 200:
                if len(unique_classes) <= 8 and len(unique_classes) >= 2:
                    try:
                        result = makePCA(data, classes)
                        return [ErrorHandler.request_handler("Success!", 200), result]
                    except Exception as ex:
                        return ErrorHandler.request_handler(ex, 400)
                else:
                    return [ErrorHandler.request_handler("Too many or too few classes.", 422)]
            else:
                return [v_check_3]
        else:
            return [v_check_2]
    else:
        return [v_check_1]



def naive_bayes_validator(data, request):
    classes = request.form['classes']
    validator = ErrorHandler(2, 40, data.loc[:, data.columns != classes])
    unique_classes = data[classes].unique()
    v_check_1, v_check_2, v_check_3 = validator.check_column_format(), validator.check_column_number(), validator.check_row_length()
    if v_check_1.status_code == 200:
        if v_check_2.status_code == 200:
            if v_check_3.status_code == 200:
                if len(unique_classes) >= 2 and len(unique_classes) < 30:
                    try:
                        result = makeNaiveBayes(data, classes)
                        return [ErrorHandler.request_handler("Success!", 200), result]
                    except Exception as ex:
                        return ErrorHandler.request_handler(ex, 400)
                else:
                    return [ErrorHandler.request_handler("Too few classes.", 422)]
            else:
                return [v_check_3]
        else:
            return [v_check_2]
    else:
        return [v_check_1]



def decision_tree_validator(data, request):
    classes = request.form['classes']
    validator = ErrorHandler(2, 40, data.loc[:, data.columns != classes])
    unique_classes = data[classes].unique()
    v_check_1, v_check_2, v_check_3 = validator.check_column_format(), validator.check_column_number(), validator.check_row_length()
    if v_check_1.status_code == 200:
        if v_check_2.status_code == 200:
            if v_check_3.status_code == 200:
                if len(unique_classes) <= 12 and len(unique_classes) >= 2:
                    try:
                        result = makeDecTree(data, classes)
                        return [ErrorHandler.request_handler("Success!", 200), result]
                    except Exception as ex:
                        return ErrorHandler.request_handler(ex, 400)
                else:
                    return [ErrorHandler.request_handler("Too many or too few classes.", 422)]
            else:
                return [v_check_3]
        else:
            return [v_check_2]
    else:
        return [v_check_1]

def random_forest_validator(data, request):
    classes = request.form['classes']
    validator = ErrorHandler(2, 40, data.loc[:, data.columns != classes])
    unique_classes = data[classes].unique()
    v_check_1, v_check_2, v_check_3 = validator.check_column_format(), validator.check_column_number(), validator.check_row_length()
    if v_check_1.status_code == 200:
        if v_check_2.status_code == 200:
            if v_check_3.status_code == 200:
                if len(unique_classes) >= 2 and len(unique_classes) < 30:
                    try:
                        result = makeRanForest(data, classes)
                        return [ErrorHandler.request_handler("Success!", 200), result]
                    except Exception as ex:
                        return ErrorHandler.request_handler(ex, 400)
                else:
                    return [ErrorHandler.request_handler("Too few classes.", 422)]
            else:
                return [v_check_3]
        else:
            return [v_check_2]
    else:
        return [v_check_1]