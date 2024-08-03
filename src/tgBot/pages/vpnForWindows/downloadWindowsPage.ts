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
  const message = `<b>Ne4Net - Windows приложение | Загрузка:</b>\n
	<b>Загрузите установщик: <a href="https://disk.yandex.ru/d/JPXz1QHEqPfshQ">Yandex диск</a></b>`;

  await bot.editMessageText(message, {
    parse_mode: 'HTML',
    chat_id: userId,
    message_id: msgId,
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Назад', callback_data: 'page$vpnForWindows' }],
      ],
    },
  });
};
