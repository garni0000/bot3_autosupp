require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

// Remplacez par votre token Telegram
const token = process.env.TELEGRAM_BOT_TOKEN;

// Créez une instance du bot
const bot = new TelegramBot(token, { polling: true });

// Liste des mots interdits
const forbiddenWords = ['ment', 'damn', 'fake', 'marche pas', 'faux', 'arnaque','rien','j\'ai perdu', 'perdu', 'menteure' , 'voleur', 'voleurs', 'mensonge', 'imbecile', 'j\ai perdu tout mon argent', 'affliation', 'm3nteur',    'c pas vrai',  'op vrai', 'c faux', 'arnaqueur', 'arnaqueurs', 'vole',   'dohi', 'ça marche pas', 'vas te faire ','rejoind ' , 'ptn' , 'putain' , 'canal','telegram'  , 'pas gagner','marche pas','pert', 'perd', 'perte' ];

// Écoute les nouveaux messages
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const text = msg.text ? msg.text.toLowerCase() : '';

    // Vérifie si le message contient un mot interdit
    const containsForbiddenWord = forbiddenWords.some(word => text.includes(word));

    if (containsForbiddenWord) {
        // Supprime le message
        bot.deleteMessage(chatId, messageId)
            .then(() => {
                console.log(`Message supprimé dans le chat ${chatId} : ${text}`);
            })
            .catch(err => {
                console.error('Erreur lors de la suppression du message :', err);
            });
    }
});

console.log('Bot Telegram en cours d\'exécution...');



const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("I'm alive");
    res.end();
});
server.listen(8080, () => { console.log("🌍 Server running on port 8080"); });
