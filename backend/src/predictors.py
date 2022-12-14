import pandas as pd
import numpy as np
from sklearn.naive_bayes import GaussianNB

def gnb_predictor(model, sample):
    sample_arr = sample.to_numpy()
    return model.predict(sample_arr)
