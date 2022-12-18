from flask import jsonify
import numpy as np

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

    @staticmethod
    def request_handler(message, status_code):
        response = jsonify({'response': message})
        response.status_code = status_code
        return response
