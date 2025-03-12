from fastapi import status
from .utils import *
from ..database import get_db

app.dependency_overrides[get_db] = override_get_db


def test_get_all_books(test_books):
    response = client.get("/books")
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == 2
    assert response.json()[0]["title"] == "Book1"
    assert response.json()[1]["title"] == "Book2"
    assert response.json()[0]["author"]["name"] == "Author1"
    assert response.json()[1]["author"]["name"] == "Author1"
    assert response.json()[0]["year"] == 2021
    assert response.json()[1]["year"] == 2021

def test_read_one_not_found():
    response = client.get("/books/12323")
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"detail": "Book not found"}

def test_read_one(test_books):
    response = client.get("/books/1")
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["title"] == "Book1"
    assert response.json()["author"]["name"] == "Author1"
    assert response.json()["year"] == 2021

def test_delete_book(test_books):
    response = client.get("/books/1")
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["title"] == "Book1"

    response = client.delete("/books/1")
    assert response.json() == {"message": "Book deleted successfully"}

    response = client.get("/books/1")
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"detail": "Book not found"}

def test_update_book(test_books):
    response = client.put("/books/1", json={"status":"draft","author_name":"Caye edited","title":"Book title","year":"1990","author_id":1,"new_author":False})
    assert response.json() == {"message": "Book updated successfully"}

    response = client.get("/books/1")
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["title"] == "Book title"
    assert response.json()["author"]["name"] == "Caye edited"
    assert response.json()["year"] == 1990
    assert response.json()["status"] == "draft"

def test_create_book(test_books):
    response = client.post("/books/", json={"title": "New Book", "author_id": 1, "author_name": "Author1",  "year": 2021})
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["title"] == "New Book"
    assert response.json()["author"]["name"] == "Author1"
    assert response.json()["year"] == 2021
    assert response.json()["status"] == "draft"

def test_create_book_with_edited_author(test_books):
    response = client.post("/books/", json={"title": "Book1", "author_id": 1, "author_name": "Author1",  "year": 2021})
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["title"] == "Book1"

    response = client.get("/books/1")
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["title"] == "Book1"
    assert response.json()["author"]["name"] == "Author1"

    response = client.post("/books/", json={"title": "New Book 2", "author_id": 1, "author_name": "Author1 edited",  "year": 2021})
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["title"] == "New Book 2"

    response = client.get("/books/1")
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["title"] == "Book1"
    assert response.json()["author"]["name"] == "Author1 edited"

def test_create_book_with_existing_author(test_books):
    response = client.post("/books/", json={"title": "Book1", "author_id": 1, "author_name": "Author1",  "year": 2021})
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["title"] == "Book1"

    response = client.get("/books/1")
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["title"] == "Book1"
    assert response.json()["author"]["name"] == "Author1"

    response = client.post("/books/", json={"title": "New Book 2", "author_id": 1,  "author_name": "Author1", "year": 2021})
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["title"] == "New Book 2"

    response = client.get("/books/1")
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["title"] == "Book1"
    assert response.json()["author"]["name"] == "Author1"