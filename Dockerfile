FROM node:12.7.0-alpine

# Set the working directory to /app
WORKDIR '/app'

# Copy package.json to the working directory
COPY package.json .

# Install required packages
RUN yarn

# Copying the rest of the code to the working directory
COPY . .

# Expose interal docker port 3000
EXPOSE 3000

# Run start command to the node project
CMD ["npm", "start"]