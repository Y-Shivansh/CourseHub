# official Node.js long-term support image
FROM node:lts 

# WORKDIR /app - Inside the container, it creates a folder called /app, and run everything from there. (root folder of docker backend)
WORKDIR /app

# ' * ' - wildcard, includes both: package.json, package-lock.json   ||   ' ./ ' - Current directory inside Docker = /app 
# So you’re copying those files into /app/
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

#   . (first) - Local machine's current folder = server/
#   . (second) - Container’s current folder = /app/ (from WORKDIR)  {Copy everything from local server/ folder into /app/ inside Docker container}
COPY . .

EXPOSE 3000

# CMD = Command to start your app inside container
CMD ["npm", "start"]