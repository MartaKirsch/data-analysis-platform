import pandas as pd
from pandas.api.types import is_numeric_dtype
import numpy as np
from .error_handler import ErrorHandler
import sys, os

sys.path.append('../')

from ..result_nodes.predictors import predictor

# sample = dict, original_sample = dataframe
def predictor_validator(model, sample, original_sample, prediction_properties):
    # order sample according to original file
    original_columns = original_sample.columns
    sample_df = pd.DataFrame([sample])
    ordered_sample = sample_df.reindex(columns=original_columns)
    # get data types of columns
    orgDataType, dataType = original_sample.dtypes, ordered_sample.dtypes
    # check if types are the same
    for i in range(0, len(orgDataType)):
        if orgDataType[i] != dataType[i]:
            if not (is_numeric_dtype(orgDataType[i]) and is_numeric_dtype(dataType[i])):
                return [False, (ErrorHandler.request_handler("Wrong data type in sample.", 422))]
    # prediction
    try:
        result = predictor(model, ordered_sample, prediction_properties)
        return [True, result[0]]
    except Exception as ex:
        return [False, (ErrorHandler.request_handler("Could not make a prediction.", 422))]
