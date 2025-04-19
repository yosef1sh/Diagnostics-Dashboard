import pytest
from fastapi.testclient import TestClient
from app.main import app
from datetime import datetime

client = TestClient(app)

def test_healthcheck():
    response = client.get("/healthcheck")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_create_and_get_insight():
    payload = {
        "created_at": "2025-04-17T12:00:00Z",
        "type": "bearing",
        "severity": "alarm"
    }
    post_response = client.post("/insights", json=payload)
    assert post_response.status_code == 200
    assert "diagnostic_id" in post_response.json()

    get_response = client.get("/insights", params={"from_date": "2025-04-17T00:00:00Z"})
    assert get_response.status_code == 200
    insights = get_response.json()
    assert any(i["created_at"] == payload["created_at"] and i["type"] == payload["type"] and i["severity"] == payload["severity"] for i in insights)

def test_get_insights_empty():
    response = client.get("/insights", params={"from_date": "2100-01-01T00:00:00Z"})
    assert response.status_code == 200
    assert response.json() == []

def test_create_insight_invalid_type():
    payload = {
        "created_at": "2025-04-17T12:00:00Z",
        "type": "invalid_type",
        "severity": "alarm"
    }
    response = client.post("/insights", json=payload)
    assert response.status_code == 422

def test_create_insight_invalid_severity():
    payload = {
        "created_at": "2025-04-17T12:00:00Z",
        "type": "bearing",
        "severity": "not_a_severity"
    }
    response = client.post("/insights", json=payload)
    assert response.status_code == 422
