FROM node:24-alpine

# Install pnpm
RUN npm i -g pnpm

# Add package file
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install deps
RUN pnpm install

# Copy source
COPY src ./src
COPY tsconfig.json ./tsconfig.json

CMD ["pnpm", "run", "start"]

