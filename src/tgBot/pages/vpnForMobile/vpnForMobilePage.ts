import { bot } from '../..';
import { IKeyboardEventPayload } from '../../../types/bot';

export default async ({
  msgId,
  userId,
  userName,
  custom: isFirstTime,
}: IKeyboardEventPayload) => {
  const message = `<b>Ne4Net - VPN для Android / IOS:</b>\n
На данный момент у нас нет мобильного приложения, но даже так Ne4Net VPN можно пользоваться через приложение протокола WireGuard!\n
Обратитесь в поддержку и попросите выдать конфиг или QR-код для подключения, там же вы сможете получить инструкции по подключению для вашего устройства.
<b>Пишите сюда: <a href="https://t.me/ne4net_support">@ne4net_support</a></b>`;

  await bot.editMessageText(message, {
    parse_mode: 'HTML',
    chat_id: userId,
    message_id: msgId,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🏠 На главную 🏠',
            callback_data: 'page$home',
          },
        ],
      ],
    },
  });
};
