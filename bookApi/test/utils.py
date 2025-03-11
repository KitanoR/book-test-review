import pytest
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient
from ..database import Base
from ..main import app
from ..models import Book, Author


SQLALCHEMY_DATABASE_URL = "sqlite:///./testdb.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

client = TestClient(app)

@pytest.fixture
def test_books():
    author = Author(name="Author1")
    db = TestingSessionLocal()
    db.add(author)
    db.commit()


    book1 = Book(
        title="Book1",
        author_id=author.id,
        year=2021,
    )
    book2 = Book(
        title="Book2",
        author_id=author.id,
        year=2021,
    )

    db.add(book1)
    db.add(book2)
    db.commit()

    yield book1
    with engine.connect() as con:
        con.execute(text("DELETE FROM books;"))
        con.execute(text("DELETE FROM authors;"))
        con.commit()

@pytest.fixture
def test_authors():
    author1 = Author(name="Author1")
    author2 = Author(name="Author2")
    db = TestingSessionLocal()
    db.add(author1)
    db.add(author2)
    db.commit()

    yield author1
    with engine.connect() as con:
        con.execute(text("DELETE FROM authors;"))
        con.commit()