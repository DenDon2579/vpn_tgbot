import { bot } from '../..';
import { mongoDB } from '../../../mongo';
import { IKeyboardEventPayload } from '../../../types/bot';

export default async ({ msgId, userId }: IKeyboardEventPayload) => {
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
