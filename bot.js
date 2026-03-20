const { Client, LocalAuth } = require('whatsapp-web.js');
const axios = require('axios');

// 🔥 SEU WEBHOOK (Google Sheets)
const WEBHOOK = "https://script.google.com/macros/s/AKfycbx_1bUc8zuoQKMu_sEsaF57H3U68_d69sbeWvKJeMZeyTVRvIggUnnifc1zlRD8s92q/exec";

// 🚀 CLIENTE WHATSAPP
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: '/usr/bin/chromium', // 👈 CORRIGIDO PARA RAILWAY
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process'
        ],
        headless: true
    }
});

// 📱 QR CODE
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

// ❌ ERRO
client.on('auth_failure', msg => {
    console.error('❌ Falha na autenticação:', msg);
});

client.on('disconnected', reason => {
    console.log('⚠️ Desconectado:', reason);
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

// 🚀 INICIAR BOT
client.initialize();