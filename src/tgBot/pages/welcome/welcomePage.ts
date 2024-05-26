import { bot } from '../..';
import { mongoDB } from '../../../mongo';

export default async (userId: number, userName: string) => {
  const userData = await mongoDB
    .collection('users')
    .findOne({ telegramID: userId });

  if (!userData) {
    await mongoDB.collection('users').insertOne({
      telegramID: userId,
      userName: userName,
      subscriptionExpiresAt: 0,
    });
  }

  const message = `<b>Ne4Net - Добро пожаловать:</b>\n
Это официальный бот <b>Ne4Net VPN</b>.\nЗдесь вы можете управлять подпиской.`;

  await bot.sendMessage(userId, message, {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [{ text: '💪 Продолжить 💪', callback_data: 'page$home' }],
      ],
    },
  });
};
