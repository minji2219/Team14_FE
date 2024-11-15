import { fetchAuthInstance } from '@api/instance';
import { useMutation } from '@tanstack/react-query';

const getPath = () => {
  return `/orders/complete`;
};

const postIsPayed = async (spotId: number) => {
  return await fetchAuthInstance.post(getPath(), spotId);
};

export const usePostIsPayed = () => {
  return useMutation({
    mutationFn: (spotId: number) => postIsPayed(spotId),
  });
};
