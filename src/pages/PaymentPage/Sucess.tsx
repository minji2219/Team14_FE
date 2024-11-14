import { useEffect, useRef } from 'react';
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
    const confirmPayment = async () => {
      if (!orderId) {
        navigate(-1);
        return;
      }

      if (!hasExecuted.current) {
        try {
          await mutate({ orderId, amount, paymentKey });

          navigate(-1);
        } catch (error) {
          alert('결제 확인에 실패했습니다. 다시 시도해주세요.');
        }
        hasExecuted.current = true;
      }
    };

    confirmPayment();
  }, [mutate, navigate, orderId, amount, paymentKey]);

  return null;
};

export default SuccessPage;
