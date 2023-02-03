import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn import tree
from sklearn.model_selection import train_test_split
from PIL import Image
from .data_processing import DataProcessing, fig2img


def makeDecTree(data, classes): # input pandas dataframe

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
    data = pd.DataFrame(data, columns=columns)
    y, label = pd.factorize(data[classes])
    data[classes] = pd.DataFrame(data=y)
    dataX, dataY = data.loc[:, data.columns != classes], data[classes]

    # split for train set and test set
    trX, teX, trY, teY = train_test_split(dataX,dataY, test_size = 0.3)

    # creating decision tree classifier
    tree_classifier = tree.DecisionTreeClassifier(random_state=0)

    # getting all alphas coef
    alphas = tree_classifier.cost_complexity_pruning_path(trX,trY).ccp_alphas

    # setting the best alphas coef
    classifiers = []
    for alpha in alphas:
        classifier = tree.DecisionTreeClassifier(random_state=0,
                                                 ccp_alpha=alpha)
        classifier.fit(trX, trY)
        classifiers.append(classifier)

    train_scores = [i.score(trX, trY) for i in classifiers]
    test_scores = [i.score(teX, teY) for i in classifiers]

    bestTestIndex = np.argmax(test_scores)

    if(train_scores[bestTestIndex] - test_scores[bestTestIndex] >= -0.05
       and abs(train_scores[0] - train_scores[bestTestIndex])<0.2):
        tree_classifier = classifiers[bestTestIndex]

    # using selected classifier for classification data
    tree_classifier.fit(trX, trY)
    train_score = tree_classifier.score(trX, trY)
    test_score = tree_classifier.score(teX, teY)
    names = []
    for name in tree_classifier.classes_:
        names.append(int(name))

    names = label[pd.DataFrame(names, columns=[classes])]
    names = str(names.tolist())
    names = [num for elem in names for num in elem]

    # set properties for result file
    properties["test_score"] = test_score
    properties["train_score"] = train_score

    # creating decision tree plot
    plt.figure(figsize=(8, 8))
    plt.title('Decision tree')
    tree.plot_tree(tree_classifier, filled=True, class_names = names)
    plot = fig2img(plt)
    result["plot"] = plot
    result['model'] = tree_classifier
    result['file'] = pd.DataFrame([properties])
    result["original_file_sample"] = sample
    result["labels"] = label

    return result
# result = {
#    "plot":  PIL image
#    "classifier": tree.DecisionTreeClassifier
# }
 

    
# result = {
#    "class":  str
# }
