FROM python:3.6

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

RUN python3 -m venv venv

COPY . . 

EXPOSE 80

CMD gunicorn --bind 0.0.0.0:80 wsgi:app

