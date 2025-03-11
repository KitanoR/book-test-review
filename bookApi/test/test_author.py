from fastapi import status
from .utils import *
from ..database import get_db

app.dependency_overrides[get_db] = override_get_db

def test_get_all_authors(test_authors):
    response = client.get("/authors")
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == 2
    assert response.json()[0]["name"] == "Author1"
    assert response.json()[1]["name"] == "Author2"
