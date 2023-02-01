import pytest
from src import app as org_app
from pathlib import Path


resources = Path(__file__).parent / "resources"

@pytest.fixture()
def app():
    app = org_app
    app.config.update({
        "TESTING": True,
    })
    yield app

@pytest.fixture()
def client(app):
    return app.test_client()

@pytest.fixture()
def runner(app):
    return app.test_cli_runner()


def test_bayes(client):
    response = client.post("/calculate/1", data={
        "calculationType": "naive_bayes",
        "classes": "Customer_Segment",
        "file": (resources / "Wine.csv").open("rb"),
    })
    assert response.status_code == 200
    response = client.post("/result/1", json={
        "resultType": "file",
    })
    assert response.status_code == 200

    response = client.post("/calculate/2", data={
        "calculationType": "naive_bayes",
        "classes": "Type",
        "file": (resources / "glass.csv").open("rb"),
    })
    assert response.status_code == 200
    response = client.post("/result/2", json={
        "resultType": "file",
    })
    assert response.status_code == 200

    response = client.post("/calculate/3", data={
        "calculationType": "naive_bayes",
        "classes": "Species",
        "file": (resources / "Iris.csv").open("rb"),
    })
    assert response.status_code == 200
    response = client.post("/result/3", json={
        "resultType": "file",
    })
    assert response.status_code == 200

def test_bayes_few_columns(client):
    response = client.post("/calculate/1", data={
        "calculationType": "naive_bayes",
        "classes": "X",
        "file": (resources / "Linear-Regression.csv").open("rb"),
    })
    assert response.json["response"] == "Incorrect number of columns."

def test_bayes_few_rows(client):
    response = client.post("/calculate/1", data={
        "calculationType": "naive_bayes",
        "classes": "Customer_Segment",
        "file": (resources / "few-rows.csv").open("rb"),
    })
    assert response.json["response"] == "Incorrect number of rows."

def test_bayes_wrong_datatype(client):
    response = client.post("/calculate/1", data={
        "calculationType": "naive_bayes",
        "classes": "SepalWidthCm",
        "file": (resources / "Iris.csv").open("rb"),
    })
    assert response.json["response"] == "Wrong data type in at least one of the columns."

def test_ranforest_bad_amount_classes(client):
    response = client.post("/calculate/1", data={
        "calculationType": "naive_bayes",
        "classes": "bloodpressure",
        "file": (resources / "Naive-Bayes-Classification-Data-Bad.csv").open("rb"),
    })
    assert response.json["response"] == 'Too many or too few classes.'