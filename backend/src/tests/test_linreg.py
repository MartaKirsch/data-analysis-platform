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

##########################################
#tests for calculations with correct data
##########################################

def test_request_example(client):
    response = client.post("/wipe_board")
    assert response.json["response"] =="Board wiped!"

def test_linreg(client):
    response = client.post("/calculate/1", data={
        "calculationType": "linear_regression",
        "columnIndexes": ["0","1"],
        "file": (resources /"Linear-Regression.csv").open("rb"),
    })
    assert response.status_code == 200
    response = client.post("/result/1", json={
        "resultType": "plot",
    })
    assert response.status_code == 200
    response = client.post("/result/1", json={
        "resultType": "file",
    })
    assert response.status_code == 200

    response = client.post("/calculate/2", data={
        "calculationType": "linear_regression",
        "columnIndexes": ["2", "3"],
        "file": (resources / "glass.csv").open("rb"),
    })
    assert response.status_code == 200
    response = client.post("/result/1", json={
        "resultType": "plot",
    })
    assert response.status_code == 200
    response = client.post("/result/1", json={
        "resultType": "file",
    })
    assert response.status_code == 200

def test_linreg_few_rows(client):
    response = client.post("/calculate/1", data={
        "calculationType": "linear_regression",
        "columnIndexes": ["1", "2"],
        "file": (resources / "few-rows.csv").open("rb"),
    })
    assert response.json["response"] == "Incorrect number of rows."

def test_linreg_wrong_datatype(client):
    response = client.post("/calculate/1", data={
        "calculationType": "linear_regression",
        "columnIndexes": ["4", "5"],
        "file": (resources / "Iris.csv").open("rb"),
    })
    assert response.json["response"] == "Wrong data type in at least one of the columns."

