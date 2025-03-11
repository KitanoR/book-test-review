from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import book, author
from .models import Base
from .database import engine

app = FastAPI()

Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/healthy")
def health_check():
    return {"status": "ok"}

app.include_router(book.router)
app.include_router(author.router)
