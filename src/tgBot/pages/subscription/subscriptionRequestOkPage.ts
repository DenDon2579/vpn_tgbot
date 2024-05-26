import TelegramBot from 'node-telegram-bot-api';
import { IKeyboardEventPayload } from '../../../types/bot';
import { bot } from '../..';
import { mongoDB } from '../../../mongo';
import { adminId } from '../../../params';
import homePage from '../home/homePage';
import subscriptionRequestsPage from '../admin/subscriptionRequestsPage';

export default async ({
  msgId,
  userId,
  userName,
  custom,
}: IKeyboardEventPayload) => {
  const [subDays, subCost, paymentCode] = custom.split('/');
  const message = `<b>✅ Ваш запрос принят</b>\n\n<b>Спасибо</b>\nНам нужно некоторое время чтобы проверить платёж.\nЭто займёт не более суток.\n\nПосле подтверждения вы получите уведомление 🔔`;

  await mongoDB.collection('subscriptionRequests').insertOne({
    telegramID: userId,
    subPeriod: +subDays,
    subCost: +subCost,
    userName: userName,
    paymentCode,
  });

  await bot.sendMessage(
    adminId,
    `Новый запрос на подписку\n${userId}\n${userName}\n${subDays}d - ${subCost}RUB\n${paymentCode}`
  );

  await subscriptionRequestsPage({
    msgId: 0,
    userId: adminId,
    userName: '',
    custom: '1',
  });

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
