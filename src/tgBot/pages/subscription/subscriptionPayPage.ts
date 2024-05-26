import TelegramBot from 'node-telegram-bot-api';
import { IKeyboardEventPayload } from '../../../types/bot';
import { subscriptionCost } from '../../../params';
import generatePaymentCode from '../../../utils/generatePaymentCode';
import { bot } from '../..';

export default async ({
  msgId,
  userId,
  userName,
  custom: days,
}: IKeyboardEventPayload) => {
  const paymentCode = generatePaymentCode();
  const subCost = subscriptionCost[days as keyof typeof subscriptionCost];
  const message = `<b>Ne4Net - Оплата подписки на <i>${days} дней</i>:</b>
--------------------------------------------------------------------
Переведите <b>${subCost}RUB</b> через <b>СБП 🇷🇺</b>\n
Номер: <code>+79897178319</code>
Банк: <b>Тинькофф</b>\n
В комментарии к переводу <b>ОБЯЗАТЕЛЬНО</b> укажите код: <code>${paymentCode}</code>\n
Подписка будет оформлена в течение 24 часов после оплаты`;

  await bot.editMessageText(message, {
    parse_mode: 'HTML',
    chat_id: userId,
    message_id: msgId,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🚀 Перевел(а) 🚀',
            callback_data: `page$subscriptionRequestOk$${days}/${subCost}/${paymentCode}`,
          },
        ],
        [{ text: 'Назад', callback_data: 'page$subscriptionBuy' }],
      ],
    },
  });
};
