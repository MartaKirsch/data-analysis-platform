import numpy as np
import matplotlib.pyplot as plt
import pandas as pd #do obslugi plikow CSV
from sklearn.linear_model import LinearRegression
from statistics import mean
import math
import io
from PIL import Image


class DataProcessing:
    @staticmethod
    def shuffleData(data):
        shuffled = data.copy()
        for i in range(len(shuffled) - 1, 0, -1):
            j = np.random.randint(0, i)
            temp = shuffled[i].copy()
            shuffled[i] = shuffled[j].copy()
            shuffled[j] = temp
        return shuffled

    @staticmethod
    def splitData(data, split_rate):
        splited = data.copy()
        split_at = int(split_rate * len(splited))
        train = splited[:split_at, :]
        test = splited[split_at:, :]
        return train[:, :-1].reshape(-1, 1), train[:, -1].reshape(-1, 1), test[:, :-1].reshape(-1, 1), test[:,
                                                                                                       -1].reshape(-1,
                                                                                                                   1)

#funkcja odpwoiedzialna za zmianę wartości współczynnika uczenia
def change_learning_rate(t, t0, t1):
        return t0 / (t + t1)

#funkcja konwertująca pyplot do PIL Image
def fig2img(fig):
    import io
    buf = io.BytesIO()
    fig.savefig(buf)
    buf.seek(0)
    img = Image.open(buf)
    return img

# funkcja implementująca metodę stochastycznego spadku wzdłuż gradientu
def SGD(X_train,
        y_train,
        epochsNr):
    # Poczatkowa wartosc thety będzie wartością pseudolosową z rozkładu normalnego standardowego, tj. N(0, 1)
    theta = np.random.randn(2, 1)
    length = len(X_train)
    indexes = np.arange(length)

    for epoch in range(epochsNr):
        # W każdej epoce tworzymy losową kolejność indeksów
        np.random.shuffle(indexes)
        for i in range(length):
            # Tworzymy dodatkowy wymiar na potrzeby wykonywania działań
            X_sample = np.expand_dims(X_train[indexes[i]], axis=0)
            y_sample = np.expand_dims(y_train[indexes[i]], axis=0)
            # jedna próbka, stąd mnożenie tylko przez 2.
            gradient = 2 * X_sample.T.dot(X_sample.dot(theta) - y_sample)
            # aktualizacja współczynnika uczenia
            learning_rate = change_learning_rate(epoch * length + i, 1, 50)
            # aktualizacja parametrów theta

            theta = theta - learning_rate * gradient

    return theta

def makeLinReg(csvFile):
    # słownik rozwiązań ("plot" i "numeric")
    result = {}
    # wczytanie danych
    data = np.loadtxt(csvFile, delimiter=';', skiprows=1)

    # wymieszanie i podzial na zbior treningowy i testowy
    data = DataProcessing.shuffleData(data)
    trX, trY, teX, teY = DataProcessing.splitData(data, 0.6)
    # dodajemy jeden wymiar do próbek, a mianowicie "1" odpowiadające za współczynnik przy wyrazie wolnym
    trXplus = np.c_[np.ones((trX.shape[0], 1)), trX]
    # wykorzystanie algorytmu SGD
    coef = SGD(trXplus, trY, 10)

    # predykcja wyuczonego modelu na zbiorze testowym
    pred = coef[1] * teX + coef[0]

    plt.figure(figsize=(5, 5))
    plt.title('Linear Regression')
    plt.scatter(teX, teY, color='red')
    plt.plot(teX, pred, color='blue', linewidth=2)
    # plt.show()

    #konwertowanie wyników na odpowiedni format
    plot = fig2img(plt)
    result["plot"] = plot
    coef_dict = {"a": [float(coef[1])],
                "b": [float(coef[0])]}
    coef_df = pd.DataFrame.from_dict(coef_dict)
    result["file"] = coef_df


    plt.close()

    # print(f'Współczynniki regresji y=a*x + b;  a={coef[1]}, b={coef[0]}')

    return [result]

# format zwracanych wartości:
# result = {
#    "plot":  PIL image
#    "file": dataframe
# }