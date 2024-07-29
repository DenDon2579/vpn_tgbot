import { bot } from '../..';
import { mongoDB } from '../../../mongo';
import { IKeyboardEventPayload } from '../../../types/bot';

export default async ({ msgId, userId }: IKeyboardEventPayload) => {
  const message = 'БОГДАН, ПОРА РАБОТАТЬ!!!';
  setInterval(() => {
    bot.sendMessage('1505612749', message, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: '💪 НАЧАТЬ РАБОТАТЬ 💪', callback_data: 'page$home' }],
          [{ text: '💪 НАЧАТЬ РАБОТАТЬ 💪', callback_data: 'page$home' }],
          [{ text: '💪 НАЧАТЬ РАБОТАТЬ 💪', callback_data: 'page$home' }],
          [{ text: '💪 НАЧАТЬ РАБОТАТЬ 💪', callback_data: 'page$home' }],
          [{ text: '💪 НАЧАТЬ РАБОТАТЬ 💪', callback_data: 'page$home' }],
        ],
      },
    });
  }, 4000);

  bot.editMessageText('Админка', {
    chat_id: userId,
    message_id: msgId,
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Запросы на подписку', callback_data: 'page$subRequests$1' }],
        [{ text: 'Главная', callback_data: 'page$home' }],
      ],
    },
  });
};
