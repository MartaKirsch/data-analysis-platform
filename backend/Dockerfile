FROM python:latest

EXPOSE 5000

# copy src files
COPY src src/

# copy dependencies
COPY requirements.txt /

# install dependencies
RUN python -m pip install -r requirements.txt

# run flask
# RUN flask run
