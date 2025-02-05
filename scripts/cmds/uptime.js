module.exports = {
  config: {
    name: "uptime",
aliases: ["upt","up"],
    version: "1.0",
    author: "RAFI",
    role: 0,
    shortDescription: {
      en: "Displays the total number of users of the bot and check uptime "
    },
    longDescription: {
      en: "Displays the total number of users who have interacted with the bot and check uptime."
    },
    category: "RUNNING-TIME",
    guide: {
      en: "Type {pn}"
    }
  },
  onStart: async function ({ api, event, args, usersData, threadsData }) {
    try {
      const allUsers = await usersData.getAll();
      const allThreads = await threadsData.getAll();
      const uptime = process.uptime();
      
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      
      const uptimeString = `
⏰:𝗛𝗢𝗨𝗥𝗦=${hours}
⌚:𝗠𝗜𝗡𝗨𝗧𝗘=${minutes}
⏳:𝗦𝗘𝗖𝗢𝗡𝗗𝗦=${seconds}`;
      
      api.sendMessage(`⚫︎──────────────────⚫︎\n➤𝐔𝐏𝐓𝐈𝐌𝐄..✅\n╭‣ 𝐀𝐝𝐦𝐢𝐧👑\n╰‣ 𝐑𝐀𝐅𝐈 くめ
\n⚫︎──────────────────⚫︎${uptimeString}\n👥:𝗧𝗢𝗧𝗔𝗟 𝗨𝗦𝗘𝗥 = ${allUsers.length}\n🗂️:𝗧𝗢𝗧𝗔𝗟 𝗧𝗛𝗥𝗘𝗔𝗗𝗦 = ${allThreads.length}
⚫︎──────────────────⚫︎`, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while retrieving data.", event.threadID);
    }
  }
};
