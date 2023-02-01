import pandas as pd
import numpy as np
from sklearn.naive_bayes import GaussianNB

def predictor(model, sample, labels):
    sample_arr = sample.to_numpy()
    prediction = model.predict(sample_arr)
    proba_pred = str(round(model.predict_proba(sample_arr).max()*100, 5)) + "%"
    # assign correct class label
    return {"predictedClass": labels[prediction][0], "predictedProbability": proba_pred}
