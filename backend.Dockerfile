

FROM python:3.9


WORKDIR /app


COPY bookApi/requirements.txt /app/


RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt


COPY bookApi /app

CMD ["fastapi", "run", "main.py", "--port", "8000"]
