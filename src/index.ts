import { startMongo } from './mongo';
import { startBot } from './tgBot';

(async () => {
  try {
    await startMongo();
    await startBot();
  } catch (e) {
    console.log(e);
  }
})();
