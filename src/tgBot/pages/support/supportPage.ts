import { bot } from '../..';
import { mongoDB } from '../../../mongo';
import { IKeyboardEventPayload } from '../../../types/bot';

export default async ({ msgId, userId }: IKeyboardEventPayload) => {
  const message = `<b>Ne4Net - Поддержка:</b>\n
	<b>По всем вопросам обращайтесь к: <a href="https://t.me/ne4net_support">@ne4net_support</a></b>`;

  bot.editMessageText(message, {
    chat_id: userId,
    message_id: msgId,
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [[{ text: 'Назад', callback_data: 'page$home' }]],
    },
  });
};
