from fastapi import APIRouter, HTTPException, Path, Depends
from typing import Annotated, Optional
from pydantic import BaseModel
from sqlalchemy.orm import Session
from starlette import status
from .author import AuthorBase, validate_author
from ..models import Status, Book, Author
from ..database import get_db

router = APIRouter(
    prefix="/books",
    tags=["books"],
    responses={404: {"description": "Not found"}},
)

db_dependency = Annotated[Session, Depends(get_db)]

class BookVerification(BaseModel):
    title: str
    author_id: Optional[int] = None
    author_name: str 
    year: int
    status: Optional[Status] = None
    new_author: Optional[bool] = False


class BookBase(BaseModel):
    id: int
    title: str
    author_id: int
    year: int
    status: Status
    author: AuthorBase


@router.get("", status_code=status.HTTP_200_OK, response_model=list[BookBase])
async def get_all(db: db_dependency, author_name: str = None):
    query = db.query(Book).join(Author).filter(Book.is_active == True)

    if author_name:
        query = query.filter(Author.name.ilike(f"%{author_name}%"))  # Case-insensitive search

    books = query.all()
    return books

@router.get("/{book_id}", response_model=BookBase)
async def get_one(db: db_dependency, book_id: int = Path(gt=0)):
    book = db.query(Book).filter(Book.id == book_id, Book.is_active == True).join(Author).first()
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

@router.post("/", response_model=BookBase)
async def create(db: db_dependency, book: BookVerification):
    author_id = validate_author(book.author_id, book.author_name, db)
    book = Book(title=book.title, author_id=author_id, year=book.year, status=book.status)
    db.add(book)
    db.commit()
    return book

@router.put("/{book_id}")
async def update(db: db_dependency, book_request: BookVerification, book_id: int = Path(gt=0)):
    book = db.query(Book).filter(Book.id == book_id).first()
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")

    author_id = validate_author(book_request.author_id, book_request.author_name, db)
    book.title = book_request.title
    book.author_id = author_id
    book.year = book_request.year
    book.status = book_request.status or book.status
    db.add(book)
    db.commit()
    return {"message": "Book updated successfully"}

@router.delete("/{book_id}")
async def delete(db: db_dependency, book_id: int = Path(gt=0)):
    book = db.query(Book).filter(Book.id == book_id).first()
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    book.is_active = False
    db.add(book)
    db.commit()
    return {"message": "Book deleted successfully"}