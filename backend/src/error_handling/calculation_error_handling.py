from flask import jsonify
import sys, os
import pandas as pd
import numpy as np
from .error_handler import ErrorHandler

sys.path.append('../')

from ..calculation_methods.linear_regression import makeLinReg
from ..calculation_methods.pca import do_pca
from ..calculation_methods.naive_bayes import naive_bayes
from ..calculation_methods.decision_tree import makeDecTree
from ..calculation_methods.random_forest import makeRanForest


# linear regression error handling
def linear_regression_validator(data, request):
    x_index = request.form['column_indexes[0]']
    y_index = request.form['column_indexes[1]']
    validator = ErrorHandler(2, 2, data.iloc[:, [int(x_index),int(y_index)]])
    if validator.check_column_format():
        result = makeLinReg(data, int(x_index), int(y_index))
        return [True, result]
    else:
        return [False, (ErrorHandler.request_handler("Wrong data type in at least one of the columns.", 422))]


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
                return (ErrorHandler.request_handler(ex, 400))
        else:
            return [False, (ErrorHandler.request_handler("Incorrect number of columns.", 422))]
    else:
        return [False, (ErrorHandler.request_handler("Wrong data type in at least one of the columns.", 422))]


def naive_bayes_validator(data, request):
    classes = request.form['classes']
    validator = ErrorHandler(3, 40, data.loc[:, data.columns != classes])
    if validator.check_column_format():
        if validator.check_column_number():
            try:
                result = naive_bayes(data, classes)
                return [True, result]
            except Exception as ex:
                return ErrorHandler.request_handler(ex, 400)
        else:
            return [False, (ErrorHandler.request_handler("Incorrect number of columns.", 422))]
    else:
        return [False, (ErrorHandler.request_handler("Wrong data type in at least one of the columns.", 422))]

def decision_tree_validator(data, request):
    classes = request.form['classes']
    validator = ErrorHandler(3, 40, data.loc[:, data.columns != classes])
    if validator.check_column_format():
        if validator.check_column_number():
            try:
                result = makeDecTree(data, classes)
                return [True, result]
            except Exception as ex:
                return ErrorHandler.request_handler(ex, 400)
        else:
            return [False, (ErrorHandler.request_handler("Incorrect number of columns.", 422))]
    else:
        return [False, (ErrorHandler.request_handler("Wrong data type in at least one of the columns.", 422))]

def random_forest_validator(data, request):
    classes = request.form['classes']
    validator = ErrorHandler(3, 40, data.loc[:, data.columns != classes])
    if validator.check_column_format():
        if validator.check_column_number():
            try:
                result = makeRanForest(data, classes)
                return [True, result]
            except Exception as ex:
                return ErrorHandler.request_handler(ex, 400)
        else:
            return [False, (ErrorHandler.request_handler("Incorrect number of columns.", 422))]
    else:
        return [False, (ErrorHandler.request_handler("Wrong data type in at least one of the columns.", 422))]

