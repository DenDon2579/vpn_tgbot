import { bot } from '../..';
import { IKeyboardEventPayload } from '../../../types/bot';

export default async ({
  msgId,
  userId,
  userName,
  custom: isFirstTime,
}: IKeyboardEventPayload) => {
  const message = `<b>Ne4Net - VPN клиент для Windows:</b>\n
<b>Системные требования:</b>
Windows 10/11 (x64)
300 Мб свободного пространства

Для авторизации в клиенте используйте <b>одноразовый код</b>, который вы можете получить ниже.`;

  await bot.editMessageText(message, {
    parse_mode: 'HTML',
    chat_id: userId,
    message_id: msgId,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '💾 Установочный файл (.exe) 💾',
            callback_data: 'page$downloadWindows',
          },
        ],
        [
          {
            text: '🔐 Запросить одноразовый код 🔐',
            callback_data: 'page$authCode',
          },
        ],
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
