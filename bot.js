const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

// 🔥 COLOQUE SEU LINK CERTO AQUI
const WEBHOOK = "https://script.google.com/macros/s/AKfycbx_1bUc8zuoQKMu_sEsaF57H3U68_d69sbeWvKJeMZeyTVRvIggUnnifc1zlRD8s92q/exec";

const client = new Client({
    puppeteer: {
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true
    }
});

client.on('qr', qr => {
    console.log('Escaneie o QR code abaixo:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('BOT CONECTADO 🚀');
});

client.on('message_create', async msg => {
    try {
        const texto = msg.body || "";

        const matches = texto.match(/SA-\d+/gi);

        if (!matches) return;

        for (let sa of matches) {
            const url = `${WEBHOOK}?texto=${encodeURIComponent(sa)}`;

            console.log("SA encontrada:", sa);
            console.log("Enviando para:", url);

            const response = await axios.get(url);

            console.log("Resposta:", response.data);
        }

    } catch (erro) {
        console.log("ERRO:", erro.message);
    }
});

client.initialize();