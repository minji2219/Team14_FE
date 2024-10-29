import styled from 'styled-components';
import Button from '@components/common/Button';
import { Common } from '@styles/globalStyle';

import { OrderDetailCreator } from '@components/OrderHistoryDetail/data';
import OrderHistoryDetailItem from '@components/OrderHistoryDetail/OrderHistoryDetailItem';

const OrderDetailCreater = () => {
  return (
    <Wrapper>
      <ButtonContainer>
        <Button
          label="+ 결제 주문서 등록"
          radius="20px"
          bgColor={Common.colors.primary}
        />
        <Space1 />
        <Button label="?" radius="50%" bgColor={Common.colors.button3} />
      </ButtonContainer>
      <ParticipantContainer>
        {OrderDetailCreator.memberInfo.map((data) => (
          <OrderHistoryDetailItem
            deliveryName={data.deliveryName}
            price={data.price}
            isPayed={data.isPayed}
          />
        ))}
      </ParticipantContainer>
      <Button label="수정하기" radius="20px" bgColor={Common.colors.primary} />
      <Space2 />
      <Button
        label="삭제하기"
        radius="20px"
        bgColor={Common.colors.primary05}
      />
    </Wrapper>
  );
};

export default OrderDetailCreater;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
  margin-top: 10px;
`;

const Space1 = styled.div`
  width: 10px;
`;
const Space2 = styled.div`
  height: 10px;
`;

const ParticipantContainer = styled.div`
  width: 100%;
  margin: 20px 0 30px;
`;
