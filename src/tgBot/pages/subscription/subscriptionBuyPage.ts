import TelegramBot from 'node-telegram-bot-api';
import { IKeyboardEventPayload } from '../../../types/bot';
import { bot } from '../..';

export default async ({
  msgId,
  userId,
  userName,
  custom,
}: IKeyboardEventPayload) => {
  let isFirstTime = false;

  if (custom) {
    isFirstTime = JSON.parse(custom);
  }

  const message = `<b>Ne4Net - Оформление подписки:</b>\n
<b>Выберите срок подписки 🗓:</b>${
    isFirstTime
      ? `\n
<i>Вы можете оформить пробную подписку на 3 часа для проверки работоспособности\n(рекомендуем сделать это перед покупкой)</i>`
      : ''
  }`;

  await bot.editMessageText(message, {
    parse_mode: 'HTML',
    chat_id: userId,
    message_id: msgId,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '💵 +30 дней. - 200 руб',
            callback_data: 'page$subscriptionPay$30',
          },
          {
            text: '💵 +60 дней. - 360 руб',
            callback_data: 'page$subscriptionPay$60',
          },
        ],
        [
          {
            text: '💵 +90 дней. - 500 руб',
            callback_data: 'page$subscriptionPay$90',
          },
          {
            text: '💵 +365 дней. - 1450 руб',
            callback_data: 'page$subscriptionPay$365',
          },
        ],
        isFirstTime
          ? [
              {
                text: '🕙 Пробная подписка на 3 часа 🕙',
                callback_data: 'page$subscriptionPay$trial',
              },
            ]
          : [],
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
