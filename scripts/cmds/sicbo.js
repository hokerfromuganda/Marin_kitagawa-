module.exports = {
  config: {
    name: "sicbo",
    aliases: ["sic"],
    version: "1.0",
    author: "Loid Butter",
    countDown: 10,
    role: 0,
    shortDescription: "Play Sicbo, the oldest gambling game",
    longDescription: "Play Sicbo, the oldest gambling game, and earn money",
    category: "game",
    guide: "{pn} <Small/Big> <amount of money>"
  },

  onStart: async function ({ args, message, usersData, event }) {
    const betType = args[0];
    const betAmount = parseInt(args[1]);
    const user = event.senderID;
    const userData = await usersData.get(event.senderID);

    if (!["small", "big"].includes(betType)) {
      return message.reply("🙊 | 𝐂𝐡𝐨𝐨𝐬𝐞 '𝐬𝐦𝐚𝐥𝐥' 𝐨𝐫 '𝐛𝐢𝐠'.");
    }

    if (!Number.isInteger(betAmount) || betAmount < 50) {
      return message.reply("❌ | 𝐏𝐥𝐞𝐚𝐬𝐞 𝐛𝐞𝐭 𝐚𝐧 𝐚𝐦𝐨𝐮𝐧𝐭 𝐨𝐟 50 𝐨𝐫 𝐦𝐨𝐫𝐞.");
    }

    if (betAmount > userData.money) {
      return message.reply("❌ | 𝐘𝐨𝐮 𝐝𝐨𝐧'𝐭 𝐡𝐚𝐯𝐞 𝐞𝐧𝐨𝐮𝐠𝐡 𝐦𝐨𝐧𝐞𝐲 𝐭𝐨 𝐦𝐚𝐤𝐞 𝐭𝐡𝐚𝐭 𝐛𝐞𝐭.");
    }

    const dice = [1, 2, 3, 4, 5, 6];
    const results = [];

    for (let i = 0; i < 3; i++) {
      const result = dice[Math.floor(Math.random() * dice.length)];
      results.push(result);
    }

    const winConditions = {
      small: results.filter((num, index, arr) => num >= 1 && num <= 3 && arr.indexOf(num) !== index).length > 0,
      big: results.filter((num, index, arr) => num >= 4 && num <= 6 && arr.indexOf(num) !== index).length > 0,
    };

    const resultString = results.join(" | ");

    if ((winConditions[betType] && Math.random() <= 0.4) || (!winConditions[betType] && Math.random() > 0.4)) {
      const winAmount = 1 * betAmount;
      userData.money += winAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(`(\\_/)\n( •_•)\n// >[ ${resultString} ]\n\n🎉 | 𝐂𝐨𝐧𝐠𝐫𝐚𝐭𝐮𝐥𝐚𝐭𝐢𝐨𝐧𝐬! 𝐘𝐨𝐮 𝐰𝐨𝐧 ${winAmount}!`);
    } else {
      userData.money -= betAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(`(\\_/)\n( •_•)\n// >[ ${resultString} ]\n\n😿 | 𝐘𝐨𝐮 𝐋𝐨𝐬𝐭 ${betAmount}.`);
    }
  }
};
