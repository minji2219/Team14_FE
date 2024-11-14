import styled from 'styled-components';
import OrderListItem from '@components/OrderHistory/OrderListItem';
import { useLocation } from 'react-router-dom';

import Menubar from '@components/mypage/Menubar';
import OrderDetailCreater from '@components/OrderHistoryDetail/OrderDetailCreater';
import OrderDetailMember from '@components/OrderHistoryDetail/OrderDetailMember';

// import { OrderDetailCreator } from '@components/OrderHistoryDetail/data';

interface Post {
  id: number;
  spotId: number;
  category: string;
  storeName: string;
  minimumOrderAmount: number;
  pickUpLocation: string;
  deliveryStatus: string;
  price?: number;
  isCreator: boolean;
}

const OrderDetailPage = () => {
  const location = useLocation();
  const isCreator: boolean = location.state.createrModeData;
  const orderData: Post = location.state.orderData;

  return (
    <Wrapper>
      <InnerWrapper>
        <Menubar />
        {/* <OrderListItem
          category={orderData.category}
          storeName={orderData.storeName}
          pickUpLocation={orderData.pickUpLocation}
          deliveryStatus={orderData.deliveryStatus}
          price={orderData.price}
        /> */}
      </InnerWrapper>
      <InnerWrapper>
        {isCreator ? (
          <OrderDetailCreater spotId={orderData.spotId} />
        ) : (
          <OrderDetailMember />
        )}
      </InnerWrapper>
    </Wrapper>
  );
};
export default OrderDetailPage;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InnerWrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;
