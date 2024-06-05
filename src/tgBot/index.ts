import TelegramBot from 'node-telegram-bot-api';
import pagesRouter from './pagesRouter';
import homePage from './pages/home/homePage';
import welcomePage from './pages/welcome/welcomePage';
import { TOKEN } from '../params';

export const bot = new TelegramBot(TOKEN, {
  polling: {
    interval: 300,
    autoStart: false,
  },
});

interface ILastBotMessageId {
  [key: string]: number;
}
export const lastBotMessageId: ILastBotMessageId = {};

export const startBot = async () => {
  bot.startPolling();
  bot.on('text', async (msg): Promise<void> => {
    try {
      if (msg.text === '/start') {
        await welcomePage(
          msg.chat.id,
          `${msg.chat.first_name}${
            msg.chat.last_name ? ` ${msg.chat.last_name}` : ''
          }`
        );
      } else {
        await homePage({ msgId: 0, userId: msg.chat.id, userName: '' });
      }

      await bot.deleteMessage(msg.chat.id, msg.message_id);
    } catch (e) {
      console.log(e);
    }
  });

  bot.on('callback_query', async (ctx): Promise<void> => {
    try {
      if (!ctx.message || !ctx.data) return;

      const [type, route, custom] = ctx.data.split('$');
      const routeHandler = pagesRouter[route as string];
      if (ctx.data[0] === '@') {
        await routeHandler({
          msgId: 0,
          userId: ctx.message.chat.id,
          userName: '',
        });
        await bot.deleteMessage(ctx.message.chat.id, ctx.message.message_id);
        return;
      }
      if (type === 'page' && routeHandler) {
        const payload = {
          msgId: ctx.message.message_id,
          userId: ctx.message.chat.id,
          userName: `${ctx.message.chat.first_name}${
            ctx.message.chat.last_name ? ` ${ctx.message.chat.last_name}` : ''
          }`,
          custom,
        };
        routeHandler(payload);
      }
    } catch (error) {
      console.log(error);
    }
  });
};
