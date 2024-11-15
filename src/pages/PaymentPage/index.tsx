import React, { useState } from 'react';
import styled from 'styled-components';
import MyPoint from '@components/common/MyPoint';
import Button from '@components/common/Button';
import InputField from '@components/common/InputField';
import { Common } from '@styles/globalStyle';
import { fetchInstance } from '@api/instance/index';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import { usePostIsPayed } from '@api/hooks/usePostIspayed';
import { usePostPayPrice } from '@api/hooks/usePostpayPrice';

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const [paymentAmount, setPaymentAmount] = useState(location.state.price);
  const { mutate: postIsPayed } = usePostIsPayed();
  const { mutate: postPayPrice } = usePostPayPrice();
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentAmount(e.target.value);
  };

  const handlePaymentSubmit = () => {
    if (!paymentAmount) {
      alert('결제 금액을 입력해주세요.');
      return;
    }

    const token = Cookies.get('access_token');
    fetchInstance
      .put(
        '/points',
        {
          paymentPoint: parseInt(paymentAmount, 10),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(async () => {
        alert('결제가 완료되었습니다.');
        postIsPayed({ orderId: location.state.orderId });
        await postPayPrice({
          orderId: location.state.orderId,
          price: location.state.price,
        });
        setPaymentAmount('');
      })
      .catch((error) => {
        console.error('결제 실패:', error);
        alert('결제에 실패했습니다. 다시 시도해주세요.');
      });
  };

  return (
    <Container>
      <Title>결제하기</Title>
      <MyPoint showRechargeButton />
      <PaymentSection>
        <Label>결제 금액</Label>
        <InputWrapper>
          <StyledInputField
            type="text"
            disabled
            value={paymentAmount}
            onChange={handlePaymentChange}
            width="80%"
            bgColor="#ededed"
          />
          <Currency>원</Currency>
        </InputWrapper>
        <Button
          label="결제하기"
          bgColor={Common.colors.primary}
          radius="20px"
          padding="12px 24px"
          onClick={handlePaymentSubmit}
        />
      </PaymentSection>
    </Container>
  );
};

export default PaymentPage;

const Container = styled.div`
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  margin-top: 100px;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const PaymentSection = styled.div`
  margin-top: 50px;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: bold;
  font-family: 'PaperlogyBold';
  display: block;
  margin-bottom: 10px;
  text-align: left;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const StyledInputField = styled(InputField)<{ padding?: string }>`
  background-color: #ededed;
  font-family: 'PaperlogyBold';
  border: none !important;
  padding: 17px 30px !important;
`;

const Currency = styled.span`
  font-size: 1.2rem;
  font-family: 'PaperlogyBold';
  margin-left: 10px;
`;
