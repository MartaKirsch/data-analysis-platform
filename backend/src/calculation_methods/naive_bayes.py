import numpy as np
import pandas as pd
from .data_processing import DataProcessing, fig2img
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn import metrics


def naive_bayes(data, classes):
    result = {}

    columns = []
    for col in data.columns:
        columns.append(col)

    #get sample for prediction error checking
    sample = data.loc[:, data.columns != classes]
    sample = sample.iloc[:1, :]

    #transform class labels to allow for pca
    data = data.to_numpy()
    data = DataProcessing.shuffleData(data)
    data = pd.DataFrame(data, columns=columns)
    y, label = pd.factorize(data[classes])
    data[classes] = y

    dataX, dataY = data.loc[:, data.columns != classes], data[classes]

    #split data
    trX, teX, trY, teY = train_test_split(dataX, dataY, test_size = 0.2, random_state = 0)

    #Gaussian Naive-Bayes
    gnb = GaussianNB()
    gnb.fit(trX, trY)
    predY = gnb.predict(teX)

    #return predictions for test set
    preds = pd.DataFrame(label[pd.DataFrame(predY, columns = [classes])], columns = ["Predicted " + classes])
    target = pd.DataFrame(label[pd.DataFrame(teY)], columns = [classes])

    #calculate accuracy on test data
    accuracy = pd.DataFrame([str(metrics.accuracy_score(teY, predY) * 100) + "%"], columns=["Accuracy"])

    #reindex
    target.index= preds.index = teX.index
    accuracy.index = np.arange(teX.iloc[0].name, len(accuracy)+int(teX.iloc[0].name))

    result["file"] = pd.concat([teX, target, preds, accuracy], axis=1)
    result["model"] = gnb
    result["original_file_sample"] = sample
    result["labels"] = label

    return result