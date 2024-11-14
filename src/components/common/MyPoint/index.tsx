import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@components/common/Button';
import { Common } from '@styles/globalStyle';
import PaymentModal from '@components/common/PaymentModal';
import Cookies from 'js-cookie';
import { setOrderId } from '@provider/OrderIdLocation';

interface MyPointProps {
  // eslint-disable-next-line react/require-default-props
  showRechargeButton?: boolean;
}

const MyPoint: React.FC<MyPointProps> = ({ showRechargeButton = false }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isPaymentWidgetVisible, setIsPaymentWidgetVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
  };

  const handlePaymentRequest = async () => {
    if (!selectedAmount) {
      alert('충전 금액을 선택해주세요.');
      return;
    }

    const accessToken = Cookies.get('access_token');
    if (!accessToken) {
      alert('로그인이 필요합니다.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'https://order-together.duckdns.org/api/v1/payments',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            idempotencySeed: Math.random().toString(36).substr(2, 10),
            productIds: [3],
          }),
        },
      );

      if (!response.ok) {
        throw new Error('결제 정보 저장 실패');
      }

      const data = await response.json();
      const orderId = data.data?.orderId;

      if (orderId) {
        setOrderId(orderId);
      }
      setIsPaymentWidgetVisible(true);
    } catch (error) {
      alert('결제 요청에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsPaymentWidgetVisible(false);
  };

  return (
    <Container>
      <Title>My Point</Title>
      <PointBalance>
        {selectedAmount ? `${selectedAmount.toLocaleString()} P` : '0 P'}
      </PointBalance>
      <AmountOptions>
        {[5_000, 10_000, 20_000, 30_000].map((amount) => (
          <AmountOption key={amount}>
            <input
              type="radio"
              id={`amount-${amount}`}
              name="amount"
              value={amount}
              checked={selectedAmount === amount}
              onChange={() => handleAmountClick(amount)}
            />
            <label htmlFor={`amount-${amount}`}>
              {amount.toLocaleString()}P
            </label>
          </AmountOption>
        ))}
        {showRechargeButton && (
          <Button
            label="충전"
            bgColor={Common.colors.primary}
            radius="30px"
            padding="10px 20px"
            onClick={handlePaymentRequest}
            disabled={loading} // Disable button when loading
          />
        )}
      </AmountOptions>
      {isPaymentWidgetVisible && (
        <PaymentModal
          onClose={handleCloseModal}
          selectedAmount={selectedAmount ?? 0}
        />
      )}
    </Container>
  );
};

export default MyPoint;

// Styled components
const Container = styled.div`
  padding: 20px;
  border-radius: 10px;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  font-family: 'PaperlogyBold';
  text-align: left;
`;

const PointBalance = styled.div`
  background-color: ${Common.colors.primary};
  color: white;
  font-size: 1.5rem;
  font-family: 'PaperlogyBold';
  padding: 25px;
  border-radius: 10px;
  text-align: left;
`;

const AmountOptions = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 15px;
`;

const AmountOption = styled.div`
  display: flex;
  align-items: center;

  input[type='radio'] {
    margin-right: 5px;
  }

  label {
    font-size: 1rem;
    color: #888;
    cursor: pointer;
  }

  input[type='radio']:checked + label {
    color: #6a0dad;
    font-family: 'PaperlogyBold';
  }
`;
