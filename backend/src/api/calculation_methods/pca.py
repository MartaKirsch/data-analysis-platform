import numpy as np
import matplotlib.pyplot as plt
from matplotlib.colors import ListedColormap
import pandas as pd
import seaborn as sns
from .data_processing import DataProcessing, fig2img
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

# input dataframe, string
def makePCA(data, classes):
    result = {}

    columns = []
    for col in data.columns:
        columns.append(col)

    # transform class labels to allow for pca
    data = data.to_numpy()
    data = pd.DataFrame(data, columns=columns)
    y, label = pd.factorize(data[classes])
    data[classes] = y

    dataX, dataY = data.loc[:, data.columns != classes], data[classes]

    # split and standardize data
    trX, teX, trY, teY = train_test_split(dataX, dataY, test_size=0.2, random_state=0)
    scaler = StandardScaler()
    trX = scaler.fit_transform(trX)
    teX = scaler.transform(teX)

    # pca
    pca = PCA()
    trX = pca.fit_transform(trX)
    teX = pca.transform(teX)

    X_set, y_set = np.concatenate((trX, teX), axis=0), np.concatenate((label[trY], label[teY]), axis=0)
    X1, X2 = np.meshgrid(np.arange(start=X_set[:, 0].min() - 1,
                                   stop=X_set[:, 0].max() + 1),
                         np.arange(start=X_set[:, 1].min() - 1,
                                   stop=X_set[:, 1].max() + 1))

    # colormaps
    palette = sns.color_palette(None, len(data[classes].unique()))
    cmap = ListedColormap(sns.color_palette(palette).as_hex())

    # create plot
    plt.figure(figsize=(5, 5))
    plt.xlim(X1.min(), X1.max())
    plt.ylim(X2.min(), X2.max())

    # draw points
    for i, j in enumerate(np.unique(y_set)):
        plt.scatter(X_set[y_set == j, 0], X_set[y_set == j, 1],
                    c=cmap(i), label=j)
    plt.title(str(classes))
    plt.xlabel('PC1')
    plt.ylabel('PC2')
    plt.legend()

    plot = fig2img(plt)
    result["plot"] = plot

    plt.close()

    # append components
    components_columns = []
    explained_variance_columns = []
    additional_info = [pca.n_samples_, pca.n_features_, pca.n_features_in_]
    for i in range(len(X_set[0])):
        components_columns.append("PC{}".format(i+1))
        explained_variance_columns.append("PC{} explained variance".format(i+1))

    explained_variance = pd.DataFrame(data = [pca.explained_variance_ratio_], columns = explained_variance_columns)
    additional_info = pd.DataFrame(data=[additional_info],
                                   columns=["number of samples", "number of features", "number of features during fitting"])
    component_df = pd.concat([explained_variance, additional_info], axis=1)
    result["file"] = component_df

    return result
