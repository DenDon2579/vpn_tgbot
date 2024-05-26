import TelegramBot from 'node-telegram-bot-api';
import { bot } from '../..';
import { mongoDB } from '../../../mongo';
import { IKeyboardEventPayload } from '../../../types/bot';
import { ObjectId } from 'mongodb';
import { DateTime } from 'luxon';
import homePage from '../home/homePage';
import { adminId } from '../../../params';

export default async ({ msgId, userId, custom }: IKeyboardEventPayload) => {
  // const subscriptionRequestsCursor = await mongoDB
  //   .collection('subscriptionRequests')
  //   .find({});
  // // .sort;

  // console.log(await subscriptionRequestsCursor.toArray());
  // if (await subscriptionRequestsCursor.hasNext()) {
  //   await subscriptionRequestsCursor.next();
  //   console.log(await subscriptionRequestsCursor.toArray());
  // }
  const [page, action, requestId, tgId] = custom.split('/');

  if (requestId) {
    if (action === 'rej') {
      await mongoDB
        .collection('subscriptionRequests')
        .deleteOne({ _id: new ObjectId(requestId as string) });

      await bot.sendMessage(
        tgId,
        '⛔ <b>Оплата не подтверждена</b>\n\nЕсли вы уверены, что перевели деньги, обратитесь в поддержку',
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: '🏠 На главную 🏠', callback_data: '@page$home' }],
            ],
          },
        }
      );
      // homePage({ msgId: 0, userId: +tgId, userName: '' });
    } else {
      const requestData = await mongoDB
        .collection('subscriptionRequests')
        .findOne({ _id: new ObjectId(requestId as string) });
      if (!requestData) return;

      const userSubscriptionExpiresAt = (
        await mongoDB.collection('users').findOne({ telegramID: +tgId })
      )?.subscriptionExpiresAt;

      const isSubscriptionExpired =
        DateTime.now().toUnixInteger() > userSubscriptionExpiresAt;

      if (isSubscriptionExpired || !userSubscriptionExpiresAt) {
        await mongoDB.collection('users').updateOne(
          { telegramID: +tgId },
          {
            $set: {
              subscriptionExpiresAt: DateTime.now()
                .plus({
                  days: requestData.subPeriod,
                })
                .toUnixInteger(),
            },
          }
        );
      } else {
        console.log('ADD MORE');
        await mongoDB.collection('users').updateOne(
          { telegramID: +tgId },
          {
            $set: {
              subscriptionExpiresAt: DateTime.fromSeconds(
                userSubscriptionExpiresAt
              )
                .plus({
                  days: requestData.subPeriod,
                })
                .toUnixInteger(),
            },
          }
        );
      }
      await mongoDB
        .collection('subscriptionRequests')
        .deleteOne({ _id: new ObjectId(requestId as string) });
      bot.sendMessage(tgId, '✅ <b>Подписка оформлена</b>\n\nСпасибо 😊', {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: '🏠 На главную 🏠', callback_data: '@page$home' }],
          ],
        },
      });
    }
  }

  const subscriptionRequests = await mongoDB
    .collection('subscriptionRequests')
    .find({})
    .skip((page - 1) * 5)
    .limit(5)
    .toArray();

  const isNextPageExist =
    (
      await mongoDB
        .collection('subscriptionRequests')
        .find({})
        .skip(page * 5)
        .limit(1)
        .toArray()
    ).length > 0;

  const keyboard: TelegramBot.InlineKeyboardButton[][] = [];

  subscriptionRequests.forEach((request) => {
    keyboard.push(
      [
        {
          text: `${request.userName} | ${request.telegramID} | (${request.subPeriod}d - ${request.subCost}RUB) --> ${request.paymentCode}`,
          callback_data: 'void',
        },
      ],
      [
        {
          text: '❌',
          callback_data: `page$subRequests$${page}/rej/${request._id}/${request.telegramID}`,
        },
        {
          text: '✅',
          callback_data: `page$subRequests$${page}/res/${request._id}/${request.telegramID}`,
        },
      ]
    );
  });

  keyboard.push([
    page > 1
      ? { text: '<<<', callback_data: `page$subRequests$${+page - 1}` }
      : { text: 'ᅠ', callback_data: `void` },
    isNextPageExist
      ? { text: '>>>', callback_data: `page$subRequests$${+page + 1}` }
      : { text: 'ᅠ', callback_data: `void` },
  ]);
  keyboard.push([{ text: 'Назад', callback_data: 'page$admin' }]);

  if (msgId) {
    bot.editMessageText(`Запросы | Страница: ${page}`, {
      chat_id: adminId,
      message_id: msgId,
      reply_markup: {
        inline_keyboard: keyboard,
      },
    });
  } else {
    bot.sendMessage(adminId, `Запросы | Страница: ${page}`, {
      reply_markup: {
        inline_keyboard: keyboard,
      },
    });
  }
};
