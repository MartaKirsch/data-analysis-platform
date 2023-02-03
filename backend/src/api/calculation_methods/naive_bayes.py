import numpy as np
import pandas as pd
from .data_processing import DataProcessing, fig2img
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn import metrics

# input dataframe, string
def makeNaiveBayes(data, classes):
    result = {}

    columns = []
    for col in data.columns:
        columns.append(col)

    #get sample for prediction error checking
    sample = data.loc[:, data.columns != classes]
    sample = sample.iloc[:1, :]

    #transform class labels to allow for pca
    data = data.to_numpy()
    data = pd.DataFrame(data, columns=columns)
    y, label = pd.factorize(data[classes])
    data[classes] = pd.DataFrame(data=y)

    dataX, dataY = data.loc[:, data.columns != classes], data[classes]

    #split data
    trX, teX, trY, teY = train_test_split(dataX, dataY, test_size = 0.2, random_state = 0)

    #Gaussian Naive-Bayes
    gnb = GaussianNB()
    gnb.fit(trX, trY)

    #get evaluation
    eval = pd.DataFrame(pd.Series(gnb.class_count_), columns=["number of classes"])
    eval["classes detected"] = label[pd.Series(gnb.classes_)]
    eval["class prior probability (%)"] = pd.Series(np.round(gnb.class_prior_ * 100, 5))
    eval["number of features"] = pd.Series(gnb.n_features_in_)
    eval["mean accuracy (%)"] = pd.Series([round(gnb.score(teX, teY), 5) * 100])
    eval.fillna('')

    result["file"] = eval
    result["model"] = gnb
    result["original_file_sample"] = sample
    result["labels"] = label
    return result