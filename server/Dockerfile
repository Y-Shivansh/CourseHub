# official Node.js long-term support image
FROM node:lts-alpine

# WORKDIR /app - Inside the container, it creates a folder called /app, and run everything from there. (root folder of docker backend)
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# ' * ' - wildcard, includes both: package.json, package-lock.json   ||   ' ./ ' - Current directory inside Docker = /app 
# So you’re copying those files into /app/
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

#   . (first) - Local machine's current folder = server/
#   . (second) - Container’s current folder = /app/ (from WORKDIR)  {Copy everything from local server/ folder into /app/ inside Docker container}
COPY . .

# Change ownership to nodejs user:
RUN chown -R nodejs:nodejs /app

#Switch to non-root user
USER nodejs

EXPOSE 3000

# CMD = Command to start your app inside container
CMD ["npm", "start"]