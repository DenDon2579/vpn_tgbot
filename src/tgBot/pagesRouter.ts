import { IKeyboardEventPayload } from '../types/bot';
import adminPage from './pages/admin/adminPage';
import subscriptionRequestsPage from './pages/admin/subscriptionRequestsPage';
import homePage from './pages/home/homePage';
import subscriptionBuyPage from './pages/subscription/subscriptionBuyPage';
import subscriptionPayPage from './pages/subscription/subscriptionPayPage';
import subscriptionRequestOkPage from './pages/subscription/subscriptionRequestOkPage';
import authCodePage from './pages/vpnForWindows/authCodePage';
import downloadWindowsPage from './pages/vpnForWindows/downloadWindowsPage';
import vpnForWindowsPage from './pages/vpnForWindows/vpnForWindowsPage';

interface IRouter {
  [key: string]: (payload: IKeyboardEventPayload) => void;
}

const router: IRouter = {
  home: homePage,
  subscriptionBuy: subscriptionBuyPage,
  subscriptionPay: subscriptionPayPage,
  subscriptionRequestOk: subscriptionRequestOkPage,
  admin: adminPage,
  subRequests: subscriptionRequestsPage,
  vpnForWindows: vpnForWindowsPage,
  downloadWindows: downloadWindowsPage,
  authCode: authCodePage,
};

export default router;
