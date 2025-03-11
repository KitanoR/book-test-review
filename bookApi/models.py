from .database import Base
from sqlalchemy import Column, Integer, String, TIMESTAMP, Boolean, text, ForeignKey, Enum
from sqlalchemy.orm import relationship
from enum import Enum as PyEnum

class Status(PyEnum):
    DRAFT = 'draft'
    PUBLISHED = 'published'

class Author(Base):
    __tablename__ = 'authors'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    is_active = Column(Boolean, default=True)

    books = relationship('Book', back_populates='author')

class Book(Base):
    __tablename__ = 'books'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    author_id = Column(Integer, ForeignKey('authors.id'))
    author = relationship('Author', back_populates='books')
    year = Column(Integer)
    status = Column(Enum(Status), default=Status.DRAFT)
    is_active = Column(Boolean, default=True)

