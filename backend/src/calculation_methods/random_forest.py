import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestClassifier
from sklearn import tree
from sklearn.model_selection import train_test_split
from PIL import Image
from .data_processing import DataProcessing


def set_tree_numbers(data_size):
    if (data_size < 0):
        return -1

    forest_size = 0
    if (data_size < 50):
        forest_size = data_size
    elif (data_size < 500):
        forest_size = 50
    elif (data_size < 10000):
        forest_size = 100
    else:
        forest_size = 500
    return forest_size


def set_max_depth(data_size):
    if (data_size < 0):
        return -1

    max_depth = 0
    if (data_size < 50):
        max_depth = None
    elif (data_size < 1000):
        max_depth = 6
    else:
        max_depth = 10
    return max_depth


def set_best_alpha(x, y, test_x, test_y, depth):
    best_alpha = 0.0
    tree_classifier = tree.DecisionTreeClassifier(random_state=0,
                                                  max_depth=depth)
    alphas = tree_classifier.cost_complexity_pruning_path(x, y).ccp_alphas

    classifiers = []
    for alpha in alphas:
        classifier = tree.DecisionTreeClassifier(random_state=0,
                                                 ccp_alpha=alpha,
                                                 max_depth=depth)
        classifier.fit(x, y)
        classifiers.append(classifier)

    train_scores = [i.score(x, y) for i in classifiers]
    test_scores = [i.score(test_x, test_y) for i in classifiers]
    bestTestIndex = np.argmax(test_scores)

    if (train_scores[bestTestIndex] - test_scores[bestTestIndex] >= -0.05
            and abs(train_scores[0] - train_scores[bestTestIndex]) < 0.2):
        best_alpha = alphas[bestTestIndex]

    return best_alpha


def makeRanForest(data, classes):  # input pandas dataframe

    result = {}
    properties = {}

    columns = []
    for col in data.columns:
        columns.append(col)

    # get sample of original file for error handling
    sample = data.loc[:, data.columns != classes]
    sample = sample.iloc[:1, :]

    # load data
    data = data.to_numpy()
    data = DataProcessing.shuffleData(data)
    data = pd.DataFrame(data, columns=columns)
    dataX, dataY = data.loc[:, data.columns != classes], data[classes]

    # split for train set and test set
    trX, teX, trY, teY = train_test_split(dataX, dataY, test_size=0.3)
    result = {}

    # setting properties for classifier
    data_length = data.size
    properties['depth'] = set_max_depth(data_length)
    properties['forest_size'] = set_tree_numbers(data_length)
    properties['best_alpha'] = set_best_alpha(trX, trY, teX, teY, properties['depth'])

    # creating random forest classifier
    forest_classifier = RandomForestClassifier(n_estimators=properties['forest_size'],
                                               max_depth=properties['depth'],
                                               min_samples_split=5,
                                               ccp_alpha=properties['best_alpha'],
                                               bootstrap=False,
                                               n_jobs=-1,
                                               random_state=5)

    # using selected classifier for classification data
    forest_classifier.fit(trX, trY)
    train_score = forest_classifier.score(trX, trY)
    test_score = forest_classifier.score(teX, teY)
    names = []
    for name in forest_classifier.classes_:
        names.append(str(name))

    result['model'] = forest_classifier
    properties['train_score'] = train_score
    properties['test_score'] = test_score
    result['file'] = pd.DataFrame([properties])
    result["prediction_properties"] = {"pred_type": "tree"}
    result["original_file_sample"] = sample

    return result

# tests


# data = pd.read_csv('iris.csv', sep=',').drop('Id',axis=1)
# res = makeRanForest(data)
# print("Dokładność klasyfikacji lasu losowego na zbiorze treningowym wynosi "
#      f"{res['train_score'] * 100:3f}%, zaś na zbiorze testowym {res['test_score'] * 100:3f}%")
#
# sample = np.array([2.5, 3.5, 4.1, 3.2])
# predict_using_forest(res['classifier'],sample)
