const TelegramBot = require('node-telegram-bot-api');
const request = require('request');

// replace the value below with the Telegram token you receive from @BotFather
const token = '5028575559:AAFlQW-7gNlzmkk3ws1VqbYsYZTYIby4RR8';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {
    polling: true
});

// Matches "/echo [whatever]"
bot.onText(/\/currencies/, (msg, match) => {

    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Brimi seçin:', {
        reply_markup: {
            inline_keyboard: [
                [{
                        text: 'EUR',
                        callback_data: 'EUR'
                    },
                    {
                        text: 'USD',
                        callback_data: 'USD'
                    },
                    {
                        text: 'RUB',
                        callback_data: 'RUB'
                    },
                    {
                        text: 'GBP',
                        callback_data: 'GBP'
                    }
                ]
            ]
        }
    });
});

bot.on('callback_query', query => {
    const id = query.message.chat.id;
    const data = request('https://api.genelpara.com/embed/doviz.json', (err, response, body) => {
        const data = JSON.parse(body);
        const result = data.filter(item => item.code === query.data)[0];
        let md = `
    Birim => ${result.USD}*
    24H Değişim => ${result.degisim}
    Alış Fiyatı => _${result.alis}_
    Satış Fiyatı => _${result.satis}_
    `
        bot.sendMessage(id, md, {
            parse_mode: 'Markdown'
        });
    });
});