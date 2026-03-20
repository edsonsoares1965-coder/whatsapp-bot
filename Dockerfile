FROM node:20-bullseye

# Instala Chromium + dependências
RUN apt-get update && apt-get install -y \
    chromium \
    chromium-driver \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    libgbm-dev \
    libxshmfence1 \
    libglib2.0-0 \
    --no-install-recommends

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Caminho do Chromium (ESSENCIAL)
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

CMD ["node", "bot.js"]