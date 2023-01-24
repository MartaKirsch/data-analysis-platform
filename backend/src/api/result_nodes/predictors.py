import pandas as pd
import numpy as np
from sklearn.naive_bayes import GaussianNB


# prediction for Naive Bayes Classifier
def predictor(model, sample, prediction_properties):
    sample_arr = sample.to_numpy()
    # prediction for decision tree and random forest
    if prediction_properties["pred_type"] == "tree":
        x = sample_arr.reshape(1, -1)
        result = model.predict(x)
        return result
    # prediction for bayes
    elif prediction_properties["pred_type"] == "bayes":
        prediction = model.predict(sample_arr)
        label = prediction_properties["labels"]
        # assign correct class label
        return label[prediction]
