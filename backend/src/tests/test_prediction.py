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

def test_pred(client):
    client.post("/calculate/1", data={
        "calculationType": "decision_tree",
        "classes": "Type",
        "file": (resources /"glass.csv").open("rb"),
    })
    response = client.post("/result/1", json={
        "resultType": "prediction",
        "RI": 1,
        "Na": 5.1,
        "Mg": 1.3,
        "Al": 1.3,
        "Si": 0.2,
        "K": 0.2,
        "Ca": 0.2,
        "Ba": 0.2,
        "Fe": 0.2

    })
    assert response.status_code == 200

#wrong data type in sample
def test_bad_sample_pred(client):
    client.post("/calculate/3", data={
            "calculationType": "decision_tree",
            "classes": "Type",
            "file": (resources / "glass.csv").open("rb"),
        })
    response = client.post("/result/3", json={
            "resultType": "prediction",
            "RI": 1,
            "Na": 5.1,
            "Mg": 1.3,
            "Al": 1.3,
            "Si": "test",
            "K": 0.2,
            "Ca": 0.2,
            "Ba": 0.2,
            "Fe": 0.2

        })
    assert response.json["response"] == 'Wrong data type in sample.'
