# Use an official Python runtime as a parent image
FROM python:3.10

# Install dependencies and packages needed for Django and related services
RUN apt-get update && apt-get install -y \
    build-essential \
    redis-server \
    celery \
    gunicorn \
    daphne \
    python3-dev \
    python3-venv \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Set up Python virtual environment
ARG PYTHON_ENV=venv
ENV PYTHON_ENV=$PYTHON_ENV
ENV PATH="/app/$PYTHON_ENV/bin:$PATH"

# Copy requirements and setup script
RUN mkdir reqs
COPY requirements.txt set_python_env.sh /reqs/

# Copy the application code into the container
COPY . /app
# THIS HAS BEEN MOVED, USED TO BE BELOW THE 4 DEBUG COMMANDS UNDER CREATION OF VIRTUAL ENVIRONMENT

# Create and activate the virtual environment, install dependencies
#RUN python3 -m venv /app/$PYTHON_ENV \
#    && ls -la /app/$PYTHON_ENV \
#    && /app/$PYTHON_ENV/bin/pip install --no-cache-dir -r /reqs/requirements.txt \
#    && ls -la /app/$PYTHON_ENV/bin
#TEST, maybe this works:
RUN python3 -m pip install  --no-cache-dir -r /reqs/requirements.txt

# Debug: Check that Django is installed in the virtual environment
RUN /app/$PYTHON_ENV/bin/python -m pip show django || echo "Django not found in venv"
RUN /app/$PYTHON_ENV/bin/python -c "import django" || echo "Failed to import Django in venv"
RUN /app/$PYTHON_ENV/bin/python -m pip show gunicorn || echo "Gunicorn not found in venv"
RUN /app/$PYTHON_ENV/bin/python -c "import gunicorn" || echo "Failed to import Gunicorn in venv"

# Expose port 8000 for the Django app
EXPOSE 8000

# Start the application using gunicorn from the virtual environment
CMD ["gunicorn", "--workers", "3", "--bind", "0.0.0.0:8000", "ServerBackend.wsgi:application"]

# Start Daphne
#CMD ["daphne", "-b", "0.0.0.0", "-p", "8001", "ServerBackend.asgi:application"]
