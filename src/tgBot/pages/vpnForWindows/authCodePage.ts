import { bot } from '../..';
import { mongoDB } from '../../../mongo';
import { IKeyboardEventPayload } from '../../../types/bot';
import { randomBytes } from 'crypto';

export default async ({
  msgId,
  userId,
  userName,
  custom: isFirstTime,
}: IKeyboardEventPayload) => {
  const authCode = randomBytes(8).toString('base64url');
  console.log(authCode);
  await mongoDB
    .collection('users')
    .updateOne({ telegramID: userId }, { $set: { authCode } });

  const message = `<b>Ваш одноразовый код доступа:</b>\n\n<code>${authCode}</code>\n\nЭтот код можно использовать только 1 раз`;

  await bot.editMessageText(message, {
    parse_mode: 'HTML',
    chat_id: userId,
    message_id: msgId,
    reply_markup: {
      inline_keyboard: [
        [{ text: '🏠 На главную 🏠', callback_data: 'page$home' }],
      ],
    },
  });
};
