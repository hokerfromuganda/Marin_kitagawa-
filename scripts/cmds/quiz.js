const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: ["q"],
    version: "2.0",
    author: "itz Aryan",
    countDown: 2,
    role: 0,
    longDescription: {
      en: ""
    },
    category: "games",
    guide: {
      en: "{pn} <category>"
    },
    envConfig: {
      reward: 10000 
    }
  }, 
  langs: {
    en: {
      reply: "⚙ 𝗤𝘂𝗶𝘇 ( 𝖻𝖾𝗍𝖺 )\n━━━━━━━━━━━━━\n\nPlease reply with the letter corresponding to your answer\n━━━━━━━━━━━━━",
      correctMessage: "⚙ 𝗤𝘂𝗶𝘇 ( 𝖻𝖾𝗍𝖺 )\n━━━━━━━━━━━━━\n\n🎉 Congratulations ${userName}! ,You are Fire 🔥, You provided the correct answer and won ${reward} $.",
      wrongMessage: "⚙ 𝗤𝘂𝗶𝘇 ( 𝖻𝖾𝗍𝖺 )\n━━━━━━━━━━━━━\n\nOops, ${userName}, that's not quite right. Could you try again?"
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const category = args[0] ? args[0].toLowerCase() : '';

    if (!['english', 'math', 'physics', 'filipino', 'biology', 'chemistry', 'history', 'philosophy', 'random', 'science', 'anime', 'country', 'torf', 'coding', 'sports', 'minecraft', 'space', 'food', 'animal', 'country', 'electronic', 'youtuber', 'javascript', 'python', 'music', 'hindi', 'css', 'french', 'html', 'spanish', 'freefire', 'pubg', 'roblox', 'gta-v', 'fortnite', 'demonslayer', 'doraemon', 'one-piece', 'naruto', 'deathnote', 'dragon-ball', 'attack-on-titan', 'java', 'ruby', 'c', 'c-plus', 'php', 'xml', 'typescript', 'nodejs', 'express', 'vietnamese', 'bengali', 'japanese'].includes(category)) {
      const { getPrefix } = global.utils;
      const p = getPrefix(event.threadID);
      message.reply(`⚙ 𝗤𝘂𝗶𝘇 ( 𝖻𝖾𝗍𝖺 )\n━━━━━━━━━━━━━\n\nPlease add a valid category\nHere's the list of categories:\n\n━━━━━━━━━━━━━\n\n📚 𝗚𝗲𝗻𝗲𝗿𝗮𝗹\n➜ english\n➜ math\n➜ physics\n➜ chemistry\n➜ history\n➜ philosophy\n➜ random\n➜ science\n\n🖥 𝗣𝗿𝗼𝗴𝗿𝗮𝗺𝗺𝗶𝗻𝗴\n➜ coding\n➜ javascript\n➜ html\n➜ java\n➜ ruby\n➜ python\n➜ css\n➜ c\n➜ c-plus\n➜ php\n➜ xml\n➜ typescript\n➜ nodejs\n➜ express\n\n🎲 𝗚𝗮𝗺𝗲\n➜ minecraft\n➜ freefire\n➜ roblox\n➜ pubg\n➜ gta-v\n➜ fortnite\n\n🛸 𝗢𝘁𝗵𝗲𝗿\n➜ music\n➜ youtuber\n➜ space\n➜ animal\n➜ food\n➜ country\n➜ electronic\n➜ sports\n\n🎀 𝗔𝗻𝗶𝗺𝗲\n➜ demonslayer\n➜ doraemon ( doremon )\n➜ anime\n➜ one-piece\n➜ naruto\n➜ deathnote\n➜ dragon-ball\n➜ attack-on-titan\n\n🌐 𝗟𝗮𝗻𝗴𝘂𝗮𝗴𝗲𝘀\n➜ hindi\n➜ english\n➜ french\n➜ filipino\n➜ spanish\n➜ bengali\n➜ vietnamese\n➜ japanese\n\n ${p}${commandName} torf <true or false>\n-react only to answer for torf\n\n━━━━━━━━━━━━━\nExample usage: ${p}${commandName} ( category )\n\n🥳 Soon I will add more categories and features.`);
      return;
    }

    try {
      let response;
      if (category === 'torf') {
        response = await axios.get(`https://quizzzz-nhbt.onrender.com/api/quiz?category=torf`);
        const data = response.data;

        const quizz = {
          commandName,
          author: event.senderID,
          question: data.question,
          answer: data.answer === "true",
          messageID: null, 
          reacted: false 
        };

        const info = await message.reply(`⚙ 𝗤𝘂𝗶𝘇 ( 𝖻𝖾𝗍𝖺 )\n━━━━━━━━━━━━━\n\n${data.question}\n\n😆: true 😮: false`);
        quizz.messageID = info.messageID;
        global.GoatBot.onReaction.set(info.messageID, quizz);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000); 
      } else if (category === 'anime') {
        response = await axios.get(`https://quizzzz-nhbt.onrender.com/api/quiz?category=anime`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.photoUrl || !Qdata.animeName) {
          return;
        }

        const imageUrl = Qdata.photoUrl;
        const characterName = Qdata.animeName;

        message.reply({
          attachment: await global.utils.getStreamFromURL(imageUrl),
          body: `⚙ 𝗤𝘂𝗶𝘇 ( 𝖻𝖾𝗍𝖺 )\n━━━━━━━━━━━━━\n\nPlease reply with the character's name from the anime.`
        }, async (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: characterName,
            answered: false,
            category,
          });

          setTimeout(() => {
            const reply = global.GoatBot.onReply.get(info.messageID);
            if (!reply.answered) {
              message.unsend(info.messageID);
              global.GoatBot.onReply.delete(info.messageID);
            }
          }, 30000); 
        });
      } else {
        response = await axios.get(`https://quizzzz-nhbt.onrender.com/api/quiz?category=${category}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const { question, options, answer } = Qdata;

        const formattedOptions = options.map((opt, index) => `${String.fr 
