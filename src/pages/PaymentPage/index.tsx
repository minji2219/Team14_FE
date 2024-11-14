import React, { useState } from 'react';
import styled from 'styled-components';
import MyPoint from '@components/common/MyPoint';
import Button from '@components/common/Button';
import InputField from '@components/common/InputField';
import { Common } from '@styles/globalStyle';
import { fetchInstance } from '@api/instance/index';
import Cookies from 'js-cookie';

const PaymentPage: React.FC = () => {
  const [paymentAmount, setPaymentAmount] = useState('');

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentAmount(e.target.value);
  };

  const handlePaymentSubmit = () => {
    if (!paymentAmount) {
      alert('결제 금액을 입력해주세요.');
      return;
    }

    const token = Cookies.get('access_token');
    console.log(token);
    fetchInstance
      .put(
        'http://43.203.132.224:8080/api/v1/points',
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
      .then(() => {
        alert('결제가 완료되었습니다.');
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
            value={paymentAmount}
            onChange={handlePaymentChange}
            placeholder="결제 금액을 입력하세요"
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
