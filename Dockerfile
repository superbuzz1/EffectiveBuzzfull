FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Enable corepack for modern package managers (optional)
RUN corepack enable

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application (client and server)
RUN npm run build

# Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy build artifacts and pre-generated Prisma client
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client

# Expose port (Coolify usually manages this via proxy, but we expose 3000)
EXPOSE 3000

# Start command
CMD ["npm", "start"]
