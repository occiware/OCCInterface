# Use an official node base image
FROM node:latest

# Maintainer info
MAINTAINER Marc Dutoo, marc.dutoo@smile.fr

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Copy and execute the deployment script
ADD deploy.sh /tmp/deploy.sh
RUN /bin/bash -C /tmp/deploy.sh && rm /tmp/deploy.sh

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Copy and set the start script for when the container launches
COPY start.sh /app/start.sh
CMD /bin/bash start.sh

