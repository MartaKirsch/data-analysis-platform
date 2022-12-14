import pandas as pd
import numpy as np
from sklearn.naive_bayes import GaussianNB

def gnb_predictor(model, sample, label):
    sample_arr = sample.to_numpy()
    # assuming model is GaussianNB()
    prediction = model.predict(sample_arr)
    # assign correct class label
    return label[prediction]
