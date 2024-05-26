import { bot } from '../..';
import { IKeyboardEventPayload } from '../../../types/bot';
import dotenv from 'dotenv';

export default async ({
  msgId,
  userId,
  userName,
  custom: isFirstTime,
}: IKeyboardEventPayload) => {
  dotenv.config();
  const fileID = process.env.SETUP_ID || '';

  // await bot.editMessageText(message, {
  //   parse_mode: 'HTML',
  //   chat_id: userId,
  //   message_id: msgId,
  //   reply_markup: {
  //     inline_keyboard: [
  //       [{ text: 'Назад', callback_data: 'page$vpnForWindows' }],
  //     ],
  //   },

  await bot.deleteMessage(userId, msgId);
  // });
  await bot.sendDocument(userId, fileID, {
    caption: '<b>Ваш установочный файл</b>',
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [{ text: '🏠 На главную 🏠', callback_data: '@page$home' }],
      ],
    },
  });
};
