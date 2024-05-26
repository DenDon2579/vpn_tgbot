import { bot } from '../..';
import { IKeyboardEventPayload } from '../../../types/bot';

export default async ({
  msgId,
  userId,
  userName,
  custom: isFirstTime,
}: IKeyboardEventPayload) => {
  const message = `<b>Ваш установочный файл</b>`;

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
  await bot.sendDocument(
    userId,
    'BQACAgIAAxkBAAErnVxmUjHEsvGaAQ9d2_ugilvu1D8dpQACFUkAAhppmUp4VmtOKqGxZDUE',
    {
      caption: '<b>Ваш установочный файл</b>',
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🏠 На главную 🏠', callback_data: '@page$home' }],
        ],
      },
    }
  );
};
