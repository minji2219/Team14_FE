import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from '@components/features/Layout/Layout';
import IntroducePage from '@pages/Introduce';
import SpotPage from '@pages/SpotPage';
import LoginPage from '@pages/LoginPage';
import SignupPage from '@pages/SignupPage';
import MyPage from '@pages/MyPage';
import OrderHistoryPage from '@pages/OrderHistoryPage';
import OrderDetailPage from '@pages/OrderDetailPage';
import PointPage from '@pages/PointPage';
import PaymentPage from '@pages/PaymentPage';

import SuccessPage from '@pages/PaymentPage/Sucess';
import FailPage from '@pages/PaymentPage/Fail';
import { RouterPath } from './path';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <IntroducePage />,
      },
      {
        path: RouterPath.spot,
        element: <SpotPage />,
      },
      {
        path: RouterPath.login,
        element: <LoginPage />,
      },
      {
        path: RouterPath.signup,
        element: <SignupPage />,
      },
      {
        path: RouterPath.myPage,
        element: <MyPage />,
      },
      {
        path: RouterPath.myPageOrderHistory,
        element: <OrderHistoryPage />,
      },
      {
        path: RouterPath.myPageOrderDetail,
        element: <OrderDetailPage />,
      },
      {
        path: RouterPath.myPagePoint,
        element: <PointPage />,
      },
      {
        path: RouterPath.payment,
        element: <PaymentPage />,
      },
      {
        path: RouterPath.success,
        element: <SuccessPage />,
      },
      {
        path: RouterPath.fail,
        element: <FailPage />,
      },
    ],
  },
]);

// eslint-disable-next-line
export const Routes = () => <RouterProvider router={router} />;
