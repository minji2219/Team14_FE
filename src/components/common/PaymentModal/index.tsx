import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Common } from '@styles/globalStyle';
import Button from '@components/common/Button';
import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk';
import { getOrderId } from '@provider/OrderIdLocation';

interface PaymentModalProps {
  onClose: () => void;
  selectedAmount: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  onClose,
  selectedAmount,
}) => {
  const orderId = getOrderId();
  const [paymentWidget, setPaymentWidget] = useState<any>(null);
  const widgetClientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
  const customerKey = 'ojVQ0eu2Lvl0e-ym_d6YN';

  useEffect(() => {
    const initializePaymentWidget = async () => {
      try {
        const widget = await loadPaymentWidget(widgetClientKey, customerKey);
        setPaymentWidget(widget);
        widget.renderPaymentMethods(
          '#payment-widget',
          { value: selectedAmount },
          { variantKey: 'DEFAULT' },
        );
        widget.renderAgreement('#agreement', { variantKey: 'AGREEMENT' });
      } catch (error) {
        console.error('Error loading payment widget:', error);
      }
    };

    initializePaymentWidget();
  }, [selectedAmount]);

  const handlePaymentRequest = async () => {
    if (paymentWidget) {
      try {
        await paymentWidget.requestPayment({
          orderId,
          orderName: '포인트 충전',
          customerName: '김토스',
          amount: selectedAmount,
          successUrl: `${window.location.origin}/success`,
          failUrl: `${window.location.origin}/fail`,
        });
      } catch (error) {
        console.error('Error requesting payment:', error);
        alert('결제 과정에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <WidgetContainer>
          <div id="payment-widget" />
          <div id="agreement" />
        </WidgetContainer>
        <Button
          label="결제하기"
          bgColor={Common.colors.primary}
          radius="30px"
          padding="10px 20px"
          onClick={handlePaymentRequest}
        />
      </ModalContent>
    </ModalOverlay>
  );
};

export default PaymentModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  width: 400px;
  max-width: 90%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${Common.colors.primary};
`;

const WidgetContainer = styled.div`
  margin-top: 20px;
`;
