import styled from 'styled-components';

import Button from '@components/common/Button';
import { Common } from '@styles/globalStyle';
import InputField from '@components/common/InputField';
import { FaPlus } from 'react-icons/fa';

import { OrderDetailMemberData } from '@components/OrderHistoryDetail/data';
import { useParams } from 'react-router-dom';
import OrderListItem from '@components/OrderHistory/OrderListItem';
import { useGetOrderDetailMemeber } from '@api/hooks/useGetOrderDetailMembers';

const OrderDetailMember = () => {
  const isDeliverable = OrderDetailMemberData.deliveryStatus;
  const { orderId } = useParams();
  const { data } = useGetOrderDetailMemeber(Number(orderId));
  return (
    <Wrapper>
      {data && (
        <OrderListItem
          category={data.category}
          storeName={data.storeName}
          pickUpLocation={data.pickUpLocation}
          deliveryStatus={data.delieveryStatus}
          price={data.price}
        />
      )}
      <State>
        <Describe>
          {isDeliverable
            ? '※ 모집 완료 되었습니다. 지금 바로 결제해 주세요.'
            : '※ 파티원 모집 중입니다. 잠시 후에 결제해 주세요.'}
        </Describe>
        {isDeliverable ? (
          <Button
            label="결제"
            radius="20px"
            padding="9px 30px"
            bgColor={Common.colors.primary}
          />
        ) : (
          <Button
            label="대기"
            radius="20px"
            padding="9px 30px"
            bgColor={Common.colors.primary}
          />
        )}
      </State>
      <PriceInputContainer>
        <MyPrice>
          <Des>주문 금액</Des>
          <InputField
            placeholder="함께주문에 담은 음식 가격을 입력해주세요."
            style={{ fontSize: '18px' }}
            bgColor={Common.colors.button3}
          />
        </MyPrice>
        <IconContainer>
          <FaPlus className="plus" />
        </IconContainer>
        <Tip>
          <Des>현재 배달팁</Des>
          <InputField
            placeholder="계산 중..."
            style={{ fontSize: '18px' }}
            disabled
            bgColor={Common.colors.button3}
          />
        </Tip>
        <Result>
          <Des>최종 결제 금액</Des>
          <br />
          <ResultPrice>계산 중...</ResultPrice>
        </Result>
      </PriceInputContainer>
      <Button
        label="주문 취소하기"
        radius="20px"
        padding="9px 60px"
        bgColor={Common.colors.primary}
      />
    </Wrapper>
  );
};

export default OrderDetailMember;

const Wrapper = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const IconContainer = styled.div`
  height: 100%;
  .plus {
    padding-top: 40px;
  }
`;

const State = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const Describe = styled.span`
  font-size: 24px;
`;

const PriceInputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px 0;
`;
const MyPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
`;
const Tip = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
`;
const Result = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
`;

const Des = styled.p`
  font-size: 13px;
`;

const ResultPrice = styled.span`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 20px;
`;
