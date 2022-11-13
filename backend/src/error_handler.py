import pandas as pd
import numpy as np

class ErrorHandler:
    def __init__(self, min_size, max_size, file):
        self.min_size = min_size
        self.max_size = max_size
        self.file = file

    def check_column_number(self):
        return len((self.file).columns) <= self.max_size and len((self.file).columns) >= self.min_size

    def check_column_format(self):
        return self.file.shape[1] == (self.file).select_dtypes(include=np.number).shape[1]
