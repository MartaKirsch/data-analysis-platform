from flask import jsonify
import numpy as np

# class for universal error checks
class ErrorHandler:
    def __init__(self, min_size, max_size, file):
        self.min_size = min_size
        self.max_size = max_size
        self.file = file
        self.max_row_length = 2000
        self.min_row_length = 2

    # check if number of columns is correct
    def check_column_number(self):
        if self.max_size >= len(self.file.columns) >= self.min_size:
            return self.request_handler("", 200)
        else:
            return self.request_handler("Incorrect number of columns.", 422)

    def check_row_length(self):
        if self.max_row_length >= len(self.file) >= self.min_row_length:
            return self.request_handler("", 200)
        else:
            return self.request_handler("Incorrect number of rows.", 422)

    # check if data is of correct type(numeric only for now)
    def check_column_format(self):
        if self.file.shape[1] == self.file.select_dtypes(include=np.number).shape[1]:
            return self.request_handler("", 200)
        else:
            return self.request_handler("Wrong data type in at least one of the columns.", 422)


    @staticmethod
    def request_handler(message, status_code):
        response = jsonify({'response': message})
        response.status_code = status_code
        return response
