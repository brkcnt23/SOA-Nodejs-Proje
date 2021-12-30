const TOKEN = process.env.TELEGRAM_TOKEN || '5028575559:AAFlQW-7gNlzmkk3ws1VqbYsYZTYIby4RR8';
const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
var http = require('http');
const axios = require('axios');
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var fx = require("money");
const { Telegraf } = require('telegraf')
const Promise = require('bluebird');
Promise.config({
  cancellation: true
});
const cheerio = require('cheerio');
const express = require('express');
const puppeteer = require('puppeteer');
const requestPromise = require('request-promise');
const app = express()
var mysql = require('mysql');
let text1 = 0;
let amount= 0; 
var connection = mysql.createConnection({
    host: "localhost",
  user: "cansoa",
  password: "123"
})

/*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
*/


const options = {
  polling: true
};
const bot = new TelegramBot(TOKEN, options);


            

            
          http.createServer(function (req, res) {
            res.write('dfghjkl\n'); //write a response to the client
            res.end(); //end the response
          }).listen(8080); //the server object listens on port 8080
          
          //fx.convert(12.99, {from: "GBP", to: "HKD"});
          //console.log(fx);


bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "SOA proje botuna hoşgeldiniz!\nKomutlar için /help yazınız...");
    
    });

    bot.onText(/\/help/, (msg) => {

        bot.sendMessage(msg.chat.id, "dolar için /dolar yaz");
        
        });
//msg.text.toString() kullanıcı mesajı
        bot.onText(/\/dolar/, (msg) => {
            
            const CC = require('currency-converter-lt');
            const { text, response } = require('express');
            let currencyConverter = new CC()
              currencyConverter.from("USD").to("TRY").amount(1).convert().then((response) => {
           amount = response;
           bot.sendMessage(msg.chat.id,"1 Dolar = "+amount.toString()+ "TRY ");
              })

            
        });
        bot.onText(/\/euro/, (msg) => {
            
            const CC = require('currency-converter-lt');
            const { text, response } = require('express');
            let currencyConverter = new CC()
            currencyConverter.from("EUR").to("TRY").amount(1).convert().then((response) => {
           amount = response;
           bot.sendMessage(msg.chat.id,"1 Euro = " +amount.toString()+ "TRY ");
          })

            
        });
        bot.onText(/\/gbp/, (msg) => {
            
            const CC = require('currency-converter-lt');
            const { text, response } = require('express');
            let currencyConverter = new CC()
            currencyConverter.from("GBP").to("TRY").amount(1).convert().then((response) => {
           amount = response;
           bot.sendMessage(msg.chat.id,"1 Pound = "+amount.toString()+ "TRY ");
          })

            
        });

// Matches /audio
bot.onText(/\/audio/, function onAudioText(msg) {
  // From HTTP request
  const url = '--';
  const audio = request(url);
  bot.sendAudio(msg.chat.id, audio);
});


// Matches /love
bot.onText(/\/love/, function onLoveText(msg) {
  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      keyboard: [
        ['Yes, you are the bot of my life ❤'],
        ['No, sorry there is another one...']
      ]
    })
  };
  bot.sendMessage(msg.chat.id, 'Do you love me?', opts);
});


// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, function onEchoText(msg, match) {
  const resp = match[1];
  bot.sendMessage(msg.chat.id, resp);
});



// Matches /editable
bot.onText(/\/editable/, function onEditableText(msg) {
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Edit Text',
            // we shall check for this value when we listen
            // for "callback_query"
            callback_data: 'edit'
          }
        ]
      ]
    }
  };
  bot.sendMessage(msg.from.id, 'Original Text', opts);
});


// Handle callback queries
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
  let text;

  if (action === 'edit') {
    text = 'Edited Text';
  }

  bot.editMessageText(text, opts);
});