import styled from 'styled-components';

import Button from '@components/common/Button';
import { Common } from '@styles/globalStyle';
import InputField from '@components/common/InputField';
import { FaPlus } from 'react-icons/fa';

import { OrderDetailMemberData } from '@components/OrderHistoryDetail/data';
import { useNavigate, useParams } from 'react-router-dom';
import OrderListItem from '@components/OrderHistory/OrderListItem';
import { useGetOrderDetailMemeber } from '@api/hooks/useGetOrderDetailMembers';
import { fetchAuthInstance } from '@api/instance';
import { useState } from 'react';
import { RouterPath } from '@routes/path';

const OrderDetailMember = () => {
  const { orderId } = useParams();
  const { data } = useGetOrderDetailMemeber(Number(orderId));
  const [price, setPrice] = useState<number>(0);
  const navigate = useNavigate();

  const deleteSpot = () => {
    fetchAuthInstance.delete(`/orders/${orderId}`).then((response) => {
      if (response.status === 200) {
        window.history.back();
      }
    });
  };

  return (
    <Wrapper>
      {data && (
        <OrderListItem
          category={data.category}
          storeName={data.storeName}
          pickUpLocation={data.pickUpLocation}
          deliveryStatus={data.delieveryStatus}
          price={data.price}
          date={data.orderDate}
        />
      )}
      <State>
        <Describe>※ 지금 바로 결제해 주세요.</Describe>
        <Button
          label="주문 취소하기"
          onClick={deleteSpot}
          radius="20px"
          padding="9px 40px"
          bgColor={Common.colors.primary}
        />
      </State>
      <PriceInputContainer>
        <MyPrice>
          <Des>주문 금액</Des>
          <InputField
            onChange={(e) => setPrice(Number(e.target.value))}
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
            value="500"
            style={{ fontSize: '18px' }}
            disabled
            bgColor={Common.colors.button3}
          />
        </Tip>
        <Result>
          <Des>최종 결제 금액</Des>
          <br />
          <ResultPrice>{price + 500}</ResultPrice>
        </Result>
      </PriceInputContainer>
      <Button
        label="결제"
        radius="30px"
        padding="15px 40px"
        bgColor={Common.colors.primary}
        onClick={() => {
          navigate(RouterPath.payment, {
            state: { price: price + 500, orderId: data?.orderId },
          });
        }}
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
