FROM node:18-alpine

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN npm i

# Copy app files
COPY . .
# RUN npm i

# Expose port
EXPOSE 3000

# Start the app
CMD [ "yarn", "start" ]