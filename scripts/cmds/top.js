
 module.exports = {
 config: {
 name: "topbal",
 version: "1.0",
 author: "Loufi",
 role: 0,
 shortDescription: {
 en: "Top 15 Bal Users"
 },
 longDescription: {
 en: ""
 },
 category: "group",
 guide: {
 en: "{pn}"
 }
 },
 onStart: async function ({ api, args, message, event, usersData }) {
 const allUsers = await usersData.getAll();

 const topUsers = allUsers.sort((a, b) => b.money - a.money).slice(0, 15);

 const topUsersList = topUsers.map((user, index) => `${index + 1}. ${user.name}: ${user.money}`);

 const messageText = `Top 15 Bal Users:\n${topUsersList.join('\n')}`;

 message.reply(messageText);
 }
};
