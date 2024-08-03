import TelegramBot from 'node-telegram-bot-api';
import { IKeyboardEventPayload } from '../../../types/bot';
import { bot } from '../..';
import { mongoDB } from '../../../mongo';
import { DateTime, Duration } from 'luxon';
import { adminId } from '../../../params';

export default async ({
  msgId,
  userId,
  userName,
  custom,
}: IKeyboardEventPayload) => {
  const userData = await mongoDB
    .collection('users')
    .findOne({ telegramID: userId });

  if (!userData) {
    bot.sendMessage(userId, 'Введите /start');
    return;
  }
  const subscriptionExpiresAtInDays = DateTime.fromSeconds(
    userData.subscriptionExpiresAt
  ).toFormat('dd.MM.yyyy');

  const subscribeDuration = Duration.fromObject({
    days: Math.floor(
      DateTime.fromSeconds(userData.subscriptionExpiresAt)
        .minus({
          seconds: DateTime.now().toUnixInteger(),
        })
        .toUnixInteger() / 86400
    ),
  })
    .normalize()
    .toHuman();

  const isSubActive =
    userData.subscriptionExpiresAt > DateTime.now().toUnixInteger();

  const message = `<b>Ne4Net - Информация:</b>\n
🔑 Статус подписки: <b>${isSubActive ? '🟢 Активна' : '🔴 Не активна'}</b>\n\n${
    isSubActive
      ? `⏳ Осталось: <b>${subscribeDuration} <i>(до ${subscriptionExpiresAtInDays})</i></b>`
      : ''
  }`;

  const isAdmin = userId === adminId;

  const keyboard: TelegramBot.InlineKeyboardButton[][] = [
    !isSubActive
      ? [
          {
            text: '🔑 Купить подписку 🔑',
            callback_data: `page$subscriptionBuy$${
              userData.subscriptionExpiresAt === 0
            }`,
          },
        ]
      : [
          {
            text: '🔑 Продлить подписку 🔑',
            callback_data: 'page$subscriptionBuy',
          },
        ],
    isSubActive
      ? [
          {
            text: '🖥 VPN для Windows 🖥',
            callback_data: 'page$vpnForWindows',
          },
        ]
      : [],
    isSubActive
      ? [
          {
            text: '📱 VPN для Android / IOS 📱',
            callback_data: 'page$vpnForMobile',
          },
        ]
      : [],
    isSubActive
      ? [
          {
            text: '🔐 Запросить одноразовый код 🔐',
            callback_data: 'page$authCode',
          },
        ]
      : [],
    [{ text: '❓ Поддержка ❓', callback_data: 'page$support' }],
    [{ text: '❓ Обновить меню ❓', callback_data: 'page$home$refresh' }],
    isAdmin ? [{ text: 'Админка', callback_data: 'page$admin' }] : [],
  ];

  if (custom === 'refresh' && msgId) {
    await bot.deleteMessage(userId, msgId);
    await bot.sendMessage(userId, message, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: keyboard,
      },
    });
    return;
  }

  if (msgId) {
    await bot.editMessageText(message, {
      parse_mode: 'HTML',
      chat_id: userId,
      message_id: msgId,
      reply_markup: {
        inline_keyboard: keyboard,
      },
    });
  } else {
    await bot.sendMessage(userId, message, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: keyboard,
      },
    });
  }
};
