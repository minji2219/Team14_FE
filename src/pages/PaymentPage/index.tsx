import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MyPoint from '@components/common/MyPoint';
import Button from '@components/common/Button';
import InputField from '@components/common/InputField';
import { Common } from '@styles/globalStyle';
import { fetchInstance } from '@api/instance/index';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePostPayPrice } from '@api/hooks/usePostpayPrice';
import { RouterPath } from '@routes/path';

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const { mutate: postPayPrice } = usePostPayPrice();
  const [paymentAmount, setPaymentAmount] = useState<number>(
    location.state.price || 0,
  );
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!Number.isNaN(Number(value))) {
      setPaymentAmount(Number(value));
    }
  };

  const handlePaymentSubmit = () => {
    if (!paymentAmount || paymentAmount <= 0) {
      alert('유효한 결제 금액을 입력해주세요.');
      return;
    }

    const token = Cookies.get('access_token');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    setLoading(true);
    fetchInstance
      .put(
        '/points',
        {
          paymentPoint: paymentAmount,
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
        postPayPrice({
          orderId: location.state.orderId,
          price: location.state.price,
        });
        setPaymentAmount(0);
        navigate(RouterPath.myPageOrderHistory);
        setRefreshKey((prev) => prev + 1);
      })
      .catch((error) => {
        console.error('결제 실패:', error);
        alert('결제에 실패했습니다. 다시 시도해주세요.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <Container>
      <Title>결제하기</Title>

      <MyPoint showRechargeButton refreshKey={refreshKey} />
      <PaymentSection>
        <Label>결제 금액</Label>
        <InputWrapper>
          <StyledInputField
            type="text"
            value={paymentAmount}
            onChange={handlePaymentChange}
            width="80%"
            bgColor="#ededed"
            disabled={loading}
          />
          <Currency>원</Currency>
        </InputWrapper>
        <Button
          label={loading ? '결제 중...' : '결제하기'}
          bgColor={Common.colors.primary}
          radius="20px"
          padding="12px 24px"
          onClick={handlePaymentSubmit}
          disabled={loading}
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
