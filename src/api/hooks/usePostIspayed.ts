import { fetchAuthInstance } from '@api/instance';
import { useMutation } from '@tanstack/react-query';

const getPath = () => {
  return `/orders/complete`;
};

const postIsPayed = async (orderId: { orderId: number }) => {
  return await fetchAuthInstance.post(getPath(), orderId);
};

export const usePostIsPayed = () => {
  return useMutation({
    mutationFn: (orderId: { orderId: number }) => postIsPayed(orderId),
  });
};
