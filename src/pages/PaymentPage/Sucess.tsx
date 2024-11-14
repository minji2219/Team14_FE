import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getOrderId } from '@provider/OrderIdLocation';
import useConfirmPayment from '@api/hooks/useConfirmPayment';

const SuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const orderId = getOrderId();
  const amount = Number(searchParams.get('amount'));
  const paymentKey = searchParams.get('paymentKey');

  const { mutate } = useConfirmPayment();

  const hasExecuted = useRef(false);

  useEffect(() => {
    if (!orderId) {
      console.error('Order ID is missing.');
      alert('Order ID is missing. Returning to the previous page.');
      navigate(-1);
      return;
    }

    if (!hasExecuted.current) {
      console.log('Executing payment confirmation request');
      mutate({ orderId, amount, paymentKey });
      hasExecuted.current = true;
    }
  }, [mutate, navigate, orderId, amount, paymentKey]);

  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2>결제 성공</h2>
        <p>{`주문번호: ${orderId}`}</p>
        <p>{`결제 금액: ${amount.toLocaleString()}원`}</p>
        <p>{`paymentKey: ${paymentKey}`}</p>
      </div>
    </div>
  );
};

export default SuccessPage;
