const TelegramBot = require('node-telegram-bot-api');//ботту туташтырабыз
const debug = require('./helpers')
// const Telegram = require('./node-telegram-bot-api');
const token = '1402747559:AAFleYonWXKuGBm85BDc0vJvdjqtJCot-TQ' //токен
//TelegramBot тун экземпляр классын 
const bot = new TelegramBot(token, {
    // polling бул атайын технология сервер мн клиент суйлошуусу үчүн.
    // polling:true
    polling: {
        //сервер мн клиенттин ортосундагы запросун убактысы мили секунд
        interval: 3000,
        // autoStart бул бот запуск боло электе клиент кат келсе, биз ботту жандырганда ошол запросторду оброботка кылат
        autoStart: true,
        // params запростордун ортосундагы аралык
        params: {
            timeout: 10
        }

    }

})
// on() бул послушка кат келсе жооп берет. 'message' бул кат жонотуу учун  биринчи параметри 
// bot.on('message', (msg) => {
//     console.log(msg);
//     const { id } = msg.chat
//     // bot.sendMessage(id, JSON.stringify(msg) + msg.from.first_name)
//     // bot.sendMessage(id, debug(msg))
//     if (msg.text.toLowerCase() === "hello") {
//         bot.sendMessage(id, `Hello, ${msg.from.first_name}`)
//     } else {
//         bot.sendMessage(id, debug(msg))
//     }
// })

// bot.on('message', (msg)=>{
//     console.log(msg);
//     const markdown=`*
// hello, ${msg.from.first_name}*
//     _hi italic_ `
//     bot.sendMessage(msg.chat.id, markdown,{
//         parse_mode:'markdown'
//     })
//reply_markup
// bot.on('message', msg=>{
//     const chatid=msg.chat.id
//     bot.sendMessage(chatid, 'клавиатура',{
//         reply_markup:{
//             keyboard:[
//                 ['1','2'],
//                 ['3','4'],
//                 ['5']
//             ]
//         }
//     })
// })

// bot.on('message', msg=>{
//     chatid=msg.chat.id
//     if(msg.text==="Закрыть"){
//         bot.sendMessage(chatid,'Закрываю клавиатуру', {
//             reply_markup:{
//                 remove_keyboard:true
//             }
//         })
//     } else if (msg.text=== "Ответить"){
//         bot.sendMessage(chatid, 'Отвечаю', {
//             reply_markup: {
//                 force_reply: true
//             }
//         })
//     }else{
//             bot.sendMessage(chatid,'keyboard',{
//             reply_markup:{
//             keyboard:[
//                 //Жон эле команда жазбай объект да жазса болот
//                 [{
//                     text:'Отправить местоположене',
//                     request_location:true
//                 }],
//                 ['Ответить',"Закрыть"],
//                 [{
//                     text:'Отправить контакт',
//                     request_contact:true
//                 }]
//             ],
//             //Бул бир эле команда беруу 
//             one_time_keyboard:true
//         }
//         })
//     }
// // })

// // inline-Keyboard
// bot.on('message', msg=>{
//     const chatid=msg.chat.id
//         bot.sendMessage(chatid, 'inline-keyboard',{
//         reply_markup:{
//             inline_keyboard:[
//             [
//                 {
//                     text:"google",
//                     url:'www.google.com'
//                 }
//                 ],
//                 [
//                 {
//                     text:'you-tube',
//                     callback_data:'utube'
//                 } 
//                 ]
//             ]
//         }
//     })
    
// })
// // callback_data обработка
// bot.on('callback_query', query=>{
//     // bot.sendMessage(query.message.chat.id, debug(query))
//     bot.answerCallbackQuery(query.id, `${query.data}`)//it's work as alert .
// })

// Обработка инлайн запросов inline-query

// bot.on ('inline_query', query=>{

//     const results=[]
//     for ( let i=0; i<5; i++){
//         results.push({
//             type:'article',
//             id:i.toString(),
//             title:'title'+i,
//             input_message_content:{
//                 message_text:`article${i+1}`
//             }
//         })
//     }

//     bot.answerInlineQuery(query.id, results,{
//         cache_time:0
//     })
// })

const inline_keyboard=[
    [
        {
            text:'forwart',
            callback_data:'forward'
        },
        {
            text:'Reply',
            callback_data:'reply'
        }
    ],
    [
        {
            text: 'Edit',
            callback_data: 'edit'
        },
        {
            text: 'Delete',
            callback_data: 'delete'
        }
    ],
]

bot.on('callback_query',query=>{
    //бул биз кайсы сообщенядабыз жана кайсы кат, бар болгон чат.
    const {chat, message_id, text}=query.message
    //data да кнопканы басканда жоното турган маалымат бар. 
    switch(query.data){
        case 'forward':
            //кудаб откуда что chat.id(биздин айдиден ) chat.id(биздин айдиге), message_id(ошод каттын идентификаторру , which биз башка бироого foward кылганы  )
            bot.forwardMessage(chat.id, chat.id, message_id)
        break
        case'reply':
        bot.sendMessage(chat.id, 'answer',{
            reply_to_message_id:message_id
        })
        break
        case'edit':
        bot.editMessageText(`'${text}' (edited)`, {
            chat_id:chatid, // кайсы чатка жоното турган чаттын айдиси
            message_id:message_id// айди того сообшения чтобы отредактировать с помощю reply_markup можно отправить html .etc
        })
        break
        case'delet':
        bot.deleteMessage(chat_id, message_id) 
        break
    }
   

    bot.answerCallbackQuery({
        callback_query_data: query.id
    })
},

bot.onText(/\/start/, (msg,[source, match])=>{
    const chatid = msg.chat.id
    bot.sendMessage(chatid, 'keyboard',{
        reply_markup:{
            inline_keyboard
        },
    })
})
)