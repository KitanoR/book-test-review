from fastapi import APIRouter, Depends
from typing import Annotated
from starlette import status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from ..models import Author
from ..database import get_db


router = APIRouter(prefix="/authors", tags=["authors"])

db_dependency = Annotated[Session, Depends(get_db)]

class AuthorBase(BaseModel):
    id: int 
    name: str

def validate_author(author_id: int, author_name: str, db: Session):
    if author_id is None and author_name is None:
        raise ValueError("Author id or name is required")
    author = db.query(Author).filter(Author.id == author_id).first()
    if author is None:
        author = Author(name=author_name)
    else:
        author.name = author_name
        
    db.add(author)
    db.commit() 
    return author.id

@router.get("", status_code=status.HTTP_200_OK, response_model=list[AuthorBase])
async def get_all(db: db_dependency):
    authors = db.query(Author).all()
    return authors