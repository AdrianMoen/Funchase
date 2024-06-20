# Use an official Python runtime as a parent image
FROM python:3.10

RUN apt-get update && apt-get install -y \
    build-essential \
    redis-server \
    celery \
    daphne \
    gunicorn \
    python3-dev \
    python3-venv \ 
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Run the venv
RUN python3 -m venv /app/venv

# Copy the current directory contents into the container at /app
COPY . /app

# Install in venv, we are not activating venv here
RUN /app/venv/bin/pip install --no-cache-dir -r requirements.txt

# Set PYTHONPATH to the working directory Lets remove this for now
#ENV PYTHONPATH=/app
ENV PYTHONPATH="/app/venv/bin:$PATH"


# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define environment variable
#ENV NAME World 	not sure if we need this

# Run gunicorn server
CMD ["/app/venv/bin/gunicorn", "--workers", "3", "--bind", "0.0.0.0:8000", "ServerBackend.wsgi:application"]
