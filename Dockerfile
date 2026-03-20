FROM node:20

# Instalar Chromium e dependências
RUN apt-get update && apt-get install -y \
    chromium \
    libglib2.0-0 \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpangocairo-1.0-0 \
    libxshmfence1 \
    libgtk-3-0 \
    && rm -rf /var/lib/apt/lists/*

# Caminho do Chrome
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Diretório do app
WORKDIR /app

# Copia dependências
COPY package*.json ./
RUN npm install

# Copia tudo
COPY . .

# Rodar bot
CMD ["node", "bot.js"]