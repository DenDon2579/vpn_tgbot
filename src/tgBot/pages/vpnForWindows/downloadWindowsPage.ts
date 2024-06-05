import { bot } from '../..';
import { SETUP_ID } from '../../../params';
import { IKeyboardEventPayload } from '../../../types/bot';
import homePage from '../home/homePage';

export default async ({
  msgId,
  userId,
  userName,
  custom: isFirstTime,
}: IKeyboardEventPayload) => {
  try {
    await bot.sendDocument(userId, SETUP_ID, {
      caption: '<b>Ваш установочный файл</b>',
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🏠 На главную 🏠', callback_data: '@page$home' }],
        ],
      },
    });

    await bot.deleteMessage(userId, msgId);
  } catch (e) {
    await homePage({ msgId: 0, userId: userId, userName: '' });
  }
};
