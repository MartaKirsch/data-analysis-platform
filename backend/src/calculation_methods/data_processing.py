import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
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

#funkcja konwertująca pyplot do PIL Image
def fig2img(fig):
    import io
    buf = io.BytesIO()
    fig.savefig(buf)
    buf.seek(0)
    img = Image.open(buf)
    return img