FROM tensorflow/tensorflow:latest-py3
# FROM python:latest

ADD . /code

WORKDIR /code

RUN pip install -U pip

RUN pip install -r requirements.txt

RUN apt install -y tree

RUN tree

EXPOSE 5000

CMD ["python", "app.py"]