import pandas as pd
import numpy as np
from sklearn.naive_bayes import GaussianNB

def predictor(model, sample, labels):
    sample_arr = sample.to_numpy()
    prediction = model.predict(sample_arr)
    # assign correct class label
    return labels[prediction]
