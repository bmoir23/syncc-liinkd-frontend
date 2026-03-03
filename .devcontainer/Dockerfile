FROM oven/bun:1.1-alpine

WORKDIR /app

# Install Node.js for Next.js compatibility
RUN apk add --no-cache nodejs npm

# Copy package files
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile || bun install

# Copy source
COPY . .

EXPOSE 3000

CMD ["bun", "run", "dev"]
