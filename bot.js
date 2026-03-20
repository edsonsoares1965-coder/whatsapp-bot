const { Client, LocalAuth } = require('whatsapp-web.js');
const axios = require('axios');

// 🔥 SEU WEBHOOK
const WEBHOOK = "https://script.google.com/macros/s/AKfycbx_1bUc8zuoQKMu_sEsaF57H3U68_d69sbeWvKJeMZeyTVRvIggUnnifc1zlRD8s92q/exec";

// ✅ CLIENT CORRETO (COM SESSÃO)
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true // 👈 LOCAL (depois muda pra true no Railway)
    }
});

// 📱 QR
client.on('qr', qr => {
    const qrLink = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qr)}`;
    
    console.log('\n==============================');
    console.log('📱 ESCANEIE O QR CODE AQUI:');
    console.log(qrLink);
    console.log('==============================\n');
});

// ✅ CONECTADO
client.on('ready', () => {
    console.log('BOT CONECTADO 🚀');
});

// 🤖 CAPTURA SA
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